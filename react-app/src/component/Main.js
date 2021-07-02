import React, {useState, useEffect} from 'react'
import axios from 'axios';
import './css/Main.css';

export default function Main(props){
  const [roomList, setRoomList] = useState(null);
  const [user, setUser] = props.userState;
  const [data, setData] = props.dataState;
  const setCenterView   = props.setCenterView;
  const urlMain = props.url;

  useEffect(async ()=>{
    await getRoomList();
  }, [])

  const getRoomList = async () => {
    await axios.post(url.getRoomList)
    .then(req => {
      console.log(req);
    });
  }

  const url = {
    getRoomList : `${urlMain}room/getroomlist`,
    makeRoom : `${urlMain}room/makeroom`,
  }
  const logout = () => {
    localStorage.clear();
    setUser(null);
  }

  const makeRoom = async () => {
    let text = "";
    const handleInput = (e) =>{
      text = e.target.value;
    }
    const insertRoom = () => {
      
      setCenterView(null);
    }
    setCenterView(
      <div className="Main_makeRoom_Option">
        <input type="text" onChange={handleInput}/> <br/><br/>
        <button onClick={insertRoom}> 방생성 </button>
      </div>
    )
  }
  const innerRoom = () => {
  }

  return (
    <div className="Main_Main">
      <div className="Main_top">
        <button onClick={logout}> Logout </button>
        <button > 방참가 </button>
        <button onClick={makeRoom}> 방생성 </button>
      </div>
      <div className="Main_Content">
        <div className="Main_Content_Left">

        </div>
        <div className="Main_Content_Right">

        </div>
      </div>
      <div className="Main_bottom">

      </div>
    </div>
  )
}
