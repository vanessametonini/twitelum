import React , {Fragment} from 'react';
import Cabecalho from "./components/Cabecalho";
import NavMenu from "./components/NavMenu";
import './App.css';

function App() {
  return (
    <Fragment>
      <Cabecalho>
        <NavMenu usuario="@vanessametonini" />
      </Cabecalho>
    </Fragment>
  );
}

export default App;
