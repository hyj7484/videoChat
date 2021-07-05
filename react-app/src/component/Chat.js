import {useState, useRef, useEffect} from 'react';
import {useRouteMatch} from 'react-router-dom';
import io from 'socket.io-client';

import {WebRTC} from '../template/index';

const Chat = (props) => {
  const routeMatch = useRouteMatch('/chat/:room').params;
  const socketUrl = props.socketUrl;
  useEffect(()=>{
    console.log('123');
  }, []);
  return (
    <div>
      <WebRTC room={routeMatch.room} name={"hwang"} socketUrl={socketUrl}/>
    </div>
  )
}


export default Chat;
