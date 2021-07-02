import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import {Main, Login, Sign, Test} from './component/index';

import './App.css';

function App() {
  const [user, setUser]             = useState(null);
  const [centerView, setCenterView] = useState(null);
  const [data, setData]             = useState(null);

  const dbUrl = 'http://localhost:3002/api/';
  const socketUrl = 'localhost:3002/chat';

  useEffect(()=>{
    // console.log(localStorage.getItem('user'));
    // if(localStorage.getItem('user')){
    //   setUser(JSON.parse(localStorage.getItem('user')));
    // }
  }, [])

  useEffect(()=>{
    // console.log(user);
    // if(user != null){
    //   localStorage.setItem('user', JSON.stringify(user));
    // }
  }, [user])

  return (
    <Router>
      {centerView != null &&
        <div className="centerView">
          {centerView}
        </div>
      }
      <div className="Content">
      <Switch>
      <Route path="/test/:id" exact>
        <Test />
      </Route>
        <Route path="/" exact>
        {user == null ?
          <Login userState={[user, setUser]} url={dbUrl}/>
          :
          <Main url={dbUrl} userState={[user, setUser]} dataState={[data, setData]} setCenterView={setCenterView}/>
        }
        </Route>
        <Route path="/signIn" exact>
          <Sign url={dbUrl}/>
        </Route>
        <Route path="*">
        <div style={{width:"1000px", height:"1000px", backgroundColor:"red"}}></div>
        </Route>
      </Switch>
      </div>
    </Router>
  );
}

export default App;
