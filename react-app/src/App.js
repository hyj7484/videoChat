import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import {Main, Login, Sign} from './component/index';

import './App.css';

function App() {
  const [user, setUser] = useState(null);

  const dbUrl = 'http://localhost:3002/api/';
  const socketUrl = 'localhost:3002/chat';

  useEffect(()=>{

  }, [user])

  return (
    <Router>
      <Switch>
        <Route path="/" exact>
        {user == null ?
          <Login userState={[user, setUser]} url={dbUrl}/>
          :
          <Main url={dbUrl}/>
        }
        </Route>
        <Route path="/signIn" exact>
          <Sign url={dbUrl}/>
        </Route>
        <Route path="*">
        <div style={{width:"1000px", height:"1000px", backgroundColor:"red"}}></div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
