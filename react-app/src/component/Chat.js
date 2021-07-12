import {useRouteMatch} from 'react-router-dom';

import {WebRTC} from '../template/index';

const Chat = (props) => {
  const routeMatch = useRouteMatch('/chat/:room').params;
  return (
    <div>
      <WebRTC room={routeMatch.room} name={props.name} socketUrl={props.socketUrl}/>
    </div>
  )
}
export default Chat;
