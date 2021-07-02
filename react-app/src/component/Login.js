import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import io from 'socket.io-client';
import axios from 'axios';

import {Chat} from '../template';

import "./css/Login.css";


export default function Login(props){
  const [user, setUser] = props.userState;
  const [data, setData] = useState({
    id : "",
    pw : "",
  });

  const history = useHistory();
  const urlMain = props.url;

  const url = {
    login : `${urlMain}user/login`,
  }

  const changeId = (e) => {
    setData({
      ...data,
      id : e.target.value
    });
  }
  const changePw = (e) => {
    setData({
      ...data,
      pw : e.target.value
    });
  }

  const login = () => {
    axios.post(url.login, data)
    .then(req => {
      if(req.data){
        setUser(req.data);
      }else{
        console.log("fail");
      }
    });
  }
  const singIn_move = () => {
    history.push('/signIn');
  }

  const onPress_Enter = (e) => {
    if(e.key === "Enter"){
      login();
    }
  }

  return (
    <div className="Login_Main">
      <table style={{width:"70%", margin:"0 auto", paddingTop:"50px"}}>
        <thead>
          <tr style={{height:"150px"}}>
            <td colSpan="2" style={{textAlign:"center", fontSize:"50px"}}> Login </td>
          </tr>
        </thead>
        <tbody>
          <tr className="Loigin_input_table_body">
            <td className="Login_input_tag"> ID : </td>
            <td className="Login_input_value" > <input type="text" onKeyPress={onPress_Enter} onChange={changeId} style={{width:"80%", height:"30px"}}/> </td>
          </tr>
          <tr className="Loigin_input_table_body">
            <td className="Login_input_tag"> PW : </td>
            <td className="Login_input_value" > <input type="password" onKeyPress={onPress_Enter} onChange={changePw} style={{width:"80%", height:"30px"}}/> </td>
          </tr>
          <tr className="Loigin_input_table_body">
            <td className="Login_input_btn" colSpan="2"> <button onClick={login}> Login </button> <button onClick={singIn_move}> Sign In </button> </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
