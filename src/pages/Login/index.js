import React, { Fragment, useState } from "react";
import Cabecalho from '../../components/Cabecalho';
import Widget from '../../components/Widget';
import './login.css';

function Login(props) {

  const [msgErro, setMsgErro] = useState('');

  let $inputLogin;
  let $inputSenha;

  const fazerLogin = (event) => {
    event.preventDefault();

    const dadosLogin = {
      login: $inputLogin.value,
      senha: $inputSenha.value
    }

    fetch('http://twitelum-api.herokuapp.com/login', {
      method: 'POST',
      body: JSON.stringify(dadosLogin)
    })
    .then(
      response => {
        if(!response.ok)
          throw response;
        return response.json();
      }
    )
    .then(
      responseEmJSON => {
        console.log(responseEmJSON);
        localStorage.setItem('token', responseEmJSON.token);
        props.history.push('/');
      }
    )
    .catch(
      responseError => {
        responseError.json().then(erro => setMsgErro(erro.message))
      }
    )
    
  }

  return (
    <Fragment>
      <Cabecalho />
      <div className="loginPage">
        <div className="container">
          <Widget>
            <h2 className="loginPage__title">Seja bem vindo!</h2>
            <form className="loginPage__form" action="/" onSubmit={fazerLogin}>
              <div className="loginPage__inputWrap">
                <label className="loginPage__label" htmlFor="login">
                  Login
                </label>
                <input
                  ref={inputEl => ($inputLogin = inputEl)}
                  className="loginPage__input"
                  type="text"
                  id="login"
                  name="login"
                />
              </div>
              <div className="loginPage__inputWrap">
                <label className="loginPage__label" htmlFor="senha">
                  Senha
                </label>
                <input
                  ref={inputEl => ($inputSenha = inputEl)}
                  className="loginPage__input"
                  type="password"
                  id="senha"
                  name="senha"
                />
              </div>
              { msgErro &&
                <div className="loginPage__errorBox">
                  {msgErro}
                </div> 
              }
              <div className="loginPage__inputWrap">
                <button className="loginPage__btnLogin" type="submit">
                  Logar
                </button>
              </div>
            </form>
          </Widget>
        </div>
      </div>
    </Fragment>
  );
}

export default Login;