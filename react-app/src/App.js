import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import {Main, Chat, Test } from './component/index';

import './App.css';

function App() {

  const socketUrl = "localhost:3002";

  return (
    <div className="App">
    <Router>
      <Switch>
        <Route path="/" exact>
          <Main/>
        </Route>
        <Route path="/chat/:room" exact>
          <Chat socketUrl={socketUrl}/>
        </Route>
        <Route path="/test/:id" exact>
          <Test />
        </Route>
      </Switch>
    </Router>
    </div>
  );
}

export default App;
