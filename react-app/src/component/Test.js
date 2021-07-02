import {useState, useEffect, useRef} from 'react';
import {useRouteMatch} from 'react-router-dom';
import io from 'socket.io-client';


const webRTC = async (props) => {
  const socket = io.connect('localhost:3000/video');

  const configuration = {
    'iceServers': [
      {
        'urls': 'stun:stun.l.google.com:19302'
      },
      {
        'urls': 'turn:192.158.29.39:3478?transport=udp',
        'credential': 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
        'username': '28224511:1379330808'
      },
      {
        'urls': 'turn:192.158.29.39:3478?transport=tcp',
        'credential': 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
        'username': '28224511:1379330808'
      }
    ]}
  const peerConnection = new RTCPeerConnection(configuration);
  peerConnection.onicecandidate = (e) => {
    console.log('on ice ');
    console.log(e);
  }
  peerConnection.onicegatheringstatechange = (e) => {
    console.log('icegatheringstatechange');
    console.log(e);
  }

  peerConnection.addEventListener('icecandidate', event => {
    console.log(event);
    if (event.candidate) {
      console.log(event.candidate);
      socket.emit('new-ice-candidate', event.candidate);
        // signalingChannel.send({'new-ice-candidate': event.candidate});
    }
  });
  peerConnection.addEventListener('icegatheringstatechange', e => {
    console.log('icegatheringstatechange');
    console.log(e);
  })

  peerConnection.addEventListener('connectionstatechange', event => {
    if (peerConnection.connectionState === 'connected') {
        // Peers connected!
        console.log('connect');
    }
  });

  console.log(peerConnection);

  const init = {
    room : props.room,
    name : props.name,
  }
  socket.emit('init', init)

  socket.on('offer', async msg => {
    console.log('offer');
    peerConnection.setRemoteDescription(new RTCSessionDescription(msg));
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);
    peerConnection.addIceCandidate(msg);
    console.log(msg);
    console.log(peerConnection);
    socket.emit('answer', answer);
  });
  socket.on('answer', async msg => {
    console.log('asnwer');
    console.log(msg);
    console.log(peerConnection);
    peerConnection.addIceCandidate(msg);
    const remoteDesc = new RTCSessionDescription(msg);
    await peerConnection.setRemoteDescription(remoteDesc);
  })

  const offer = await peerConnection.createOffer();
  // setOffer(offer);
  await peerConnection.setLocalDescription(offer);
  socket.emit('offer', offer);
}

const Test = () => {
  const [socket, setSocket] = useState(null);
  const [offer, setOffer] = useState(null);
  const videoClient = useRef(null);
  const videoHost   = useRef(null);

  const routeMatch = useRouteMatch('/test/:id').params;

  useEffect(()=>{
    // setSocket(io.connect('localhost:3002/video'));
    const data = {
      room : routeMatch.id,
      name : `Hwang Yong Ju ${Math.floor(Math.random() * 10)}`,
    }
    webRTC(data);
  }, []);

  useEffect(() => {

  }, [offer]);

  const getVideo = () => {
    console.log('getVideo');
  }
  const test = () => {
    console.log('test');
  }
  return (
    <div>
      <video ref={videoHost} autoPlay width="500px" height="500px"/>
      <video ref={videoClient} autoPlay width="500px" height="500px"/>

      <button onClick={test}> sendVideo </button>
      <button onClick={getVideo}> getVideo </button>
    </div>
  )
}

export default Test;
