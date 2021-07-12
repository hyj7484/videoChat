import React, {useState, useEffect} from 'react';
import io from 'socket.io-client';

export default function Chat(props){
  const [socket, setSocket] = useState(null);
  const [chatData, setChatData] = useState([]);
  const [chat, setChat] = useState([]);
  const [input, setInput] = useState("");

  const socketUrl = props.socketUrl;
  const room = props.room;
  const name = props.name;

  const changeInput = (e) => {
    setInput(e.target.value);
  }

  useEffect(()=>{
    setSocket(io.connect(socketUrl));
  }, [])
  useEffect(()=>{
    if(socket != null){
      socket.on('join', msg => {
        const data = {
          name : msg.name,
          msg : msg.msg,
          num : 0
        }
        setChat(data);
      });
      socket.emit('join', {room : room, name : name})
      socket.on('chat', msg => {
        const data = {
          name : msg.name,
          msg : msg.msg,
          num : 1
        }
        setChat(data);
      });
    }
  }, [socket]);

  useEffect(()=>{
    setChatData([
      ...chatData,
      chat
    ])
  }, [chat]);

  const chat_Enter = () => {
    if(input !== ""){
      socket.emit('chat', input);
      setInput("");
    }
  }

  const view = () => {
    console.log(chatData);
    return chatData[0] !== null && chatData.map((value, index) => {
      return value !== null && value.num === 1 ? (
        <div key={index}>
          {`${value.name}님 : ${value.msg}`}
        </div>
      ) : (
        <div key={index}>
          {value.msg}
        </div>
      )
    });
  }
  const keyPress_Enter = (e) => {
    if(e.key === "Enter")
      chat_Enter();
    console.log(e);
  }
  const height = props.height || 600;
  return (
    <div style={{width:"100%", height:height+"px"}}>
      <div className="chat_content" style={{width:"100%", height: (height-50)+"px"}}>
        {view()}
      </div>
      <div className="chat_input" stlye={{height:'50px'}}>
        <input type="text" value={input} onChange={changeInput} onKeyPress={keyPress_Enter}/>
        <button onClick={chat_Enter} > 확인 </button>
      </div>
    </div>
  )
}
