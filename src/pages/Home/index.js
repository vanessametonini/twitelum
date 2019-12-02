import React , {Fragment, useState, useEffect} from 'react';
import Cabecalho from '../../components/Cabecalho';
import Dashboard from '../../components/Dashboard';
import Widget from '../../components/Widget';
import TrendsArea from '../../components/TrendsArea';
import Tweet from '../../components/Tweet';
import NavMenu from '../../components/NavMenu';

function Home() {

  const [tweet, setTweet] = useState('');
  const [tweetList, setTweetList] = useState([]);

  const urlAPI = `https://twitelum-api.herokuapp.com/tweets?X-AUTH-TOKEN=${localStorage.getItem('token')}`;

  useEffect(() => {
    listarTweets()    
  })

  const listarTweets = () => {
    if(!tweetList.length) {
      fetch(urlAPI)
        .then(response => response.json())
        .then(tweetsAPI => {
          console.log(tweetsAPI);
          setTweetList(tweetsAPI)
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
          console.log(tweetDaAPI);
          setTweetList([tweetDaAPI, ...tweetList]);
          setTweet('');
        }
      )
    }
  }

  const removerTweet = (tweetId) => {
    console.log(urlAPI.replace('tweets?', `tweets/${tweetId}?`));
    fetch(urlAPI.replace('tweets?', `tweets/${tweetId}?`), {method: 'DELETE'})
    .then(d => d.json())
    .then( r => {
      console.log(r);
      setTweetList(tweetList.filter( (tweet) => tweet._id != tweetId ))
    })
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
              tweetList.length <= 0 ? 
                <p>Oops! Você ainda não tuitou!</p>
              :
                tweetList.map((tweet) => {
                  return <Tweet 
                            key={tweet._id} 
                            texto={tweet.conteudo} 
                            tweetInfo={tweet} 
                            removeHandler={(event) => removerTweet(tweet._id)} 
                          />
                })
            }
            </div>
          </Widget>
        </Dashboard>
      </div>
    </Fragment>
  );
}

export default Home;
