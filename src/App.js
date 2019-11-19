import React , {Fragment} from 'react';
import Cabecalho from './components/Cabecalho';
import Dashboard from './components/Dashboard';
import Widget from './components/Widget';
import TrendsArea from './components/TrendsArea';
import Tweet from './components/Tweet';
import NavMenu from './components/NavMenu';

function App() {
  return (
    <Fragment>
      <Cabecalho>
        <NavMenu usuario="@vanessametonini"/>
      </Cabecalho>
      <div className="container">
        <Dashboard>
          <Widget>
            <form className="novoTweet">
              <div className="novoTweet__editorArea">
                <span className="novoTweet__status">0/140</span>
                <textarea className="novoTweet__editor" placeholder="O que está acontecendo?"></textarea>
              </div>
              <button type="submit" className="novoTweet__envia">Tweetar</button>
            </form>
          </Widget>
          <Widget>
            <TrendsArea />
          </Widget>
        </Dashboard>
        <Dashboard posicao="centro">
          <Widget>
            <div className="tweetsArea">
              <Tweet />
            </div>
          </Widget>
        </Dashboard>
      </div>
    </Fragment>
  );
}

export default App;