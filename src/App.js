import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import { AdminView, HomeScreen, MatchView, Dashboard } from "./component/index";

function App() {
  return (
    <>
    <main>
      <Switch>
        <Route path="/" exact>
        <HomeScreen />
        </Route>
        <Route exact path="/match">
          <MatchView />
        </Route>
        <Route exact path="/admin">
          <AdminView />
        </Route>
        <Route exact path="/dashboard">
          <Dashboard />
        </Route>
      </Switch>
    </main>
   
    </>
  );
}

export default App;
