import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";

const Roteamento = () => {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/" component={Home} exact />
    </Switch>
  )
}

export default Roteamento;