import {useState, useEffect, useRef} from 'react';
import {useRouteMatch} from 'react-router-dom';
import io from 'socket.io-client';


const drag = (element) => {
  let pos1, pos2, pos3, pos4 = 0;
  element.onmousedown = (e) => {
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = (e) => {

    }

    document.onmousemove = (e) => {
      e.preventDefault();
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;

    }
  }
}



const WebRTC = (props) => {
  const [socket, setSocket]                 = useState(null);
  const [peerConnection, setPeerConnection] = useState(null);
  const videoHost   = useRef(null);
  const videoClient = useRef(null);

  const room = props.room;
  const name = props.name || 'no Name';
  const socketUrl = props.socketUrl;
  const config = { 'iceServers' : [{
    'urls' : 'stun:stun.l.google.com:19302'
  }]};

  const routeMatch = useRouteMatch('/chat/:room').params;

  useEffect(()=>{
    setPeerConnection(new RTCPeerConnection(config));
    setSocket(io.connect(`${socketUrl}/video`));
    drag(videoHost.current);
    drag(videoClient.current);
  }, []);

  useEffect(async ()=>{
    if(socket !== null && peerConnection !== null){
      const option = {
        video : true,
        audio : true
      }
      const stream = await navigator.mediaDevices.getUserMedia(option);
      videoHost.current.srcObject = stream;
      stream.getTracks().forEach(track => {
        peerConnection.addTrack(track, stream);
      });
      peerConnection.onicecandidate = (e) => {
        if(e.candidate){
          socket.emit('candidate', e.candidate);
        }
      }
      peerConnection.ontrack = (e) => {
        // video client srcObjec add
        videoClient.current.srcObject = e.streams[0];
        videoClient.current.play();
      }

      socket.on('init', async msg => {
        console.log(msg);
        if(msg.userCount === 2){
          const offer = await peerConnection.createOffer({offerToReceiveAudio : true, offerToReceiveVideo : true});
          peerConnection.setLocalDescription(new RTCSessionDescription(offer));
          socket.emit('offer', offer);
        }
      });
      socket.on('offer', async msg => {
        console.log('offer');
        await peerConnection.setRemoteDescription(new RTCSessionDescription(msg));
        const answer = await peerConnection.createAnswer({offerToReceiveAudio : true, offerToReceiveVideo : true});
        peerConnection.setLocalDescription(new RTCSessionDescription(answer));
        socket.emit('answer', answer);
      });
      socket.on('answer', async msg => {
        console.log('answer');
        console.log(msg);
        await peerConnection.setRemoteDescription(new RTCSessionDescription(msg));
      });
      socket.on('candidate', async msg => {
        console.log('candidate');
        await peerConnection.addIceCandidate(new RTCIceCandidate(msg));
      });
      socket.on('fullUser', msg => {
        console.log(msg);
      });

      const data = {
        room : routeMatch.room,
        name : name
      }
      socket.emit('init', data);
    }
  }, [socket, peerConnection]);

  return (
    <div className="video">
      <video ref={videoHost} className="videoHost" autoPlay width="100%" height="100%"/>
      <video ref={videoClient} className="videoClient" autoPlay width="100%" height="100%" controls/>
    </div>
  )
}

export default WebRTC;
