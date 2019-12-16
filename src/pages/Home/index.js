import React , {Fragment, useState, useEffect} from 'react';
import Cabecalho from '../../components/Cabecalho';
import Dashboard from '../../components/Dashboard';
import Widget from '../../components/Widget';
import TrendsArea from '../../components/TrendsArea';
import Tweet from '../../components/Tweet';
import NavMenu from '../../components/NavMenu';
import Modal from '../../components/Modal';
import { useSelector, useDispatch } from "react-redux";

export default function Home() {

  const tweetsStore = useSelector(state => state);
  
  const dispatch = useDispatch();

  const [tweet, setTweet] = useState('');
  //const [tweetList, setTweetList] = useState([]);
  const [tweetAtivo, setTweetAtivo] = useState({});

  const urlAPI = `https://twitelum-api.herokuapp.com/tweets?X-AUTH-TOKEN=${localStorage.getItem('token')}`;

  useEffect(() => {
    listarTweets()    
  })

  const listarTweets = () => {
    if(!tweetsStore.length) {
      fetch(urlAPI)
        .then(response => response.json())
        .then(tweetsAPI => {
          //setTweetList(tweetsAPI)
          dispatch({type: 'CARREGA_TWEETS', tweets: tweetsAPI})
        })
    }
  }

  const adicionaTweet = (event) => {
    event.preventDefault();

    if(tweet){
      fetch(
        urlAPI,
        {
          method: 'POST',
          body: JSON.stringify({conteudo: tweet})
        }
      )
      .then(response => response.json())
      .then(
        tweetDaAPI => {
          //setTweetList([tweetDaAPI, ...tweetList]);
          dispatch({type: 'ADICIONA_TWEET', newTweet: tweetDaAPI })
          setTweet('');
        }
      )
    }
  }

  const removerTweet = (tweetId) => {
    //console.log(urlAPI.replace('tweets?', `tweets/${tweetId}?`));
  
    fetch(urlAPI.replace('tweets?', `tweets/${tweetId}?`), {method: 'DELETE'})
    .then(d => d.json())
    .then( r => {
      setTweetAtivo({});
      //setTweetList(tweetList.filter( (tweet) => tweet._id !== tweetId ))
      dispatch({type: 'REMOVE_TWEET', tweetId})
    })
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
    <Fragment>
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
                    tweetsStore.length <= 0 ? 
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
    </Fragment>
  );
}
