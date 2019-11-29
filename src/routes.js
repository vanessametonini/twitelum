import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";


function estaAutenticado() {
  if(localStorage.getItem('token')){
    return true;
  }
  else {
    return false;
  }
}

function PrivateRoute(props) {
  const Component = props.component;

  return (
    estaAutenticado() ?
      <Route render={() => <Component {...props} />} />
    : 
      <Redirect to="/login" />
  )
  
}

const Roteamento = () => {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <PrivateRoute path="/" component={Home} exact />
    </Switch>
  )
}

export default Roteamento;