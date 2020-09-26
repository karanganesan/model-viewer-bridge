import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Drop from "./Pages/Drop";
import View from "./Pages/View";
import Error from "./Pages/Error";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/drop" component={Drop}></Route>
        <Route exact path="/view/:id" component={View}></Route>
        <Route path="*" component={Error}></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
