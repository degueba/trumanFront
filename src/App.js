import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";


// Routes
import Auth from './Auth';
import Survey from './Survey';


class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      auth: false
    }
  } 

  componentDidMount(){
    let user = window.localStorage.getItem('user');
    if(user){
      this.setState({auth: true})
    }
  }

  render(){
    return (
      <Router>
       <div className="truman">
        <header className="truman__header">
          <h1>Truman Health</h1>
        </header>
        <div className="truman__body">
          <Switch>
            <Route exact path="/">
              <Auth />
            </Route>
            <Route path="/survey">
              <Survey /> 
            </Route>
          </Switch>
        </div>
        <footer className="truman__footer">
          
        </footer>
      </div>

        
    </Router>
    )
  }
}

export default App;
