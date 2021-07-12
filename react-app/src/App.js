import {useState} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import {Main, Chat, Test, Login, Sign } from './component/index';

import './App.css';

function App() {
  const [name, setName] = useState(null);
  const socketUrl = "localhost:3002";

  return (
    <div className="App">
    <Router>
      <Switch>
        <Route path="/" exact>
          <Main setName={setName}/>
        </Route>
        <Route path="/chat/:room" exact>
          <Chat socketUrl={socketUrl} name={name}/>
        </Route>
        <Route path="/test/:id" exact>
          <Test />
        </Route>
        <Route path="/sign">
          <Sign />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
      </Switch>
    </Router>
    </div>
  );
}

export default App;
