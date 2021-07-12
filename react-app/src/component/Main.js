import React, {useState} from 'react'
import {Link} from 'react-router-dom';

const Main = (props) => {
  const [room, setRoom] = useState(null);
  const setName = props.setName;

  const changeRoom = (e) => {
    setRoom(e.target.value);
  }
  const changeName = (e) => {
    setName(e.target.value);
  }

  return (
    <>
      <div className="Main">
        <input type="number" onChange={changeRoom} placeholder="방번호를 입력해주세요." className="input_room"/> <br/>
        <input type="text" onChange={changeName} placeholder="이름을 입력해주세요." className="input_name"/> <br/>
        <Link to={`chat/${room}`} className="btn"> 방입장 </Link>
      </div>
    </>
  )
}


export default Main;
