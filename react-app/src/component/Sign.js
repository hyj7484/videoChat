import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';

import './css/Sign.css';

export default function Sign(props){
  const [data, setData] = useState({
    id : "",
    pw : "",
    name : "",
  });
  const urlMain = props.url;
  const history = useHistory();

  const url = {
    sign : `${urlMain}user/addUser`,
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
  const changeName = (e) => {
    setData({
      ...data,
      name : e.target.value
    });
  }

  const sign_data = () => {
    axios.post(url.sign, data)
    .then(req => {
      if(req.data.chk){
        history.push('/');
      }else{
        console.log(req.data.msg);
      }
    })
  }
  const exit = () => {
    history.push('/');
  }

  return (
    <div className="Sign_Main">
      <table className="Sign_table">
        <thead>
          <tr className="Sign_thead">
            <td colSpan="2"> Sign In </td>
          </tr>
        </thead>
        <tbody>
          <tr className="Sign_tbody">
            <td className="Sign_input_tag"> id </td>
            <td className="Sign_input_value"> <input type="text" onChange={changeId}/> </td>
          </tr>
          <tr className="Sign_tbody">
            <td className="Sign_input_tag"> pw </td>
            <td className="Sign_input_value"> <input type="password" onChange={changePw}/> </td>
          </tr>
          <tr className="Sign_tbody">
            <td className="Sign_input_tag"> name </td>
            <td className="Sign_input_value"> <input type="text" onChange={changeName}/> </td>
          </tr>
          <tr className="Sign_tbody">
            <td className="Sign_input_btn" colSpan="2"> <button onClick={sign_data}> 등록 </button> <button onClick={exit}> 취소 </button>  </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
