import React , {useState, useEffect } from 'react';
import Cabecalho from '../../components/Cabecalho';
import Dashboard from '../../components/Dashboard';
import Widget from '../../components/Widget';
import TrendsArea from '../../components/TrendsArea';
import Tweet from '../../components/Tweet';
import NavMenu from '../../components/NavMenu';
import Modal from '../../components/Modal';
import { useSelector, useDispatch } from "react-redux";
import { TweetsThunksActions } from "../../store/ducks/tweets";

export default function Home() {

  const dispatch = useDispatch();
  const { data: tweetsStore, loading } = useSelector(state => state.tweets);  

  const [tweet, setTweet] = useState('');
  const [tweetAtivo, setTweetAtivo] = useState({});  

  useEffect(() => {
    listarTweets();
  }, [])

  const listarTweets = () => {
    if(!tweetsStore.length) {
      dispatch(TweetsThunksActions.carrega())
    }
  }

  const adicionaTweet = (event) => {
    event.preventDefault();

    if(tweet){
      dispatch(TweetsThunksActions.adiciona(tweet)).then(() => setTweet(''))
    }
  }

  const removerTweet = (tweetId) => {
    dispatch(TweetsThunksActions.deleta(tweetId)).then(() => setTweetAtivo({}))
  }

  const abreModalParaTweet = (event, tweetId) => {
    //para nao abrir modal quando clica no like
    const isTweetFooter = event.target.closest('.tweet__footer');

    if (isTweetFooter) return false;
    //encontra o tweet clicado e grava no state
    //const tweetSelecionado = tweetList.find(tweet => tweet._id === tweetId);
    
    //busca no STORE
    const tweetSelecionado = tweetsStore.find(tweet => tweet._id === tweetId);
    setTweetAtivo(tweetSelecionado);
  }

  const fechaModal = () => {
      setTweetAtivo({})
  }
 
  return (
    <>
      <Cabecalho>
        <NavMenu usuario="@caelum"/>
      </Cabecalho>
      <div className="container">
        <Dashboard>
          <Widget>
            <form className="novoTweet" onSubmit={adicionaTweet}>
              <div className="novoTweet__editorArea">
                <span className={`novoTweet__status ${tweet.length > 140 ? 'novoTweet__status--invalido' : '' }`}>
                  {tweet.length}/140
                </span>
                <textarea 
                  autoFocus
                 value={tweet}
                 onChange={ event => setTweet(event.target.value) }
                 className="novoTweet__editor" placeholder="O que está acontecendo?">
                </textarea>
              </div>
              <button 
                disabled={tweet.length > 140 || tweet.length < 1 ? true : false}
              type="submit" className="novoTweet__envia">Tweetar</button>
            </form>
          </Widget>
          <Widget>
            <TrendsArea />
          </Widget>
        </Dashboard>
        <Dashboard posicao="centro">
            <Widget>
              <div className="tweetsArea">
                  {
                    tweetsStore.length <= 0 || loading ? 
                      <p>Oops! Você ainda não tuitou!</p>
                    :
                    tweetsStore.map((tweet) => {
                        return <Tweet 
                                  key={tweet._id} 
                                  texto={tweet.conteudo} 
                                  tweetInfo={tweet} 
                                  removeHandler={() => removerTweet(tweet._id)} 
                                  handleAbreModalParaTweet={(event)=>abreModalParaTweet(event,tweet._id)}
                                />
                      })
                  }
              </div>
            </Widget>
        </Dashboard>
      </div>

      <Modal fechaModal={fechaModal} isAberto={Boolean(tweetAtivo._id)}>
        {
          tweetAtivo.conteudo &&
            <Tweet
              texto={tweetAtivo.conteudo}
              tweetInfo={tweetAtivo}
              removeHandler={() => removerTweet(tweetAtivo._id)}
              tweetInModal={Boolean(tweetAtivo._id)}
            />
        }
      </Modal>
    </>
  );
}
