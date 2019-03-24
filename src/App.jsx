import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.scss';

import Home from './components/Home.jsx'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact={true} path="/" component={Home} />

          <Switch>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
