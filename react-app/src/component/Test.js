import {useState, useEffect, useRef} from 'react';
import {useRouteMatch} from 'react-router-dom';
import io from 'socket.io-client';

const Test = () => {
  const videoHost   = useRef(null);
  const videoClient = useRef(null);
  const [socket, setSocket] = useState(null);
  const [peerConnection, setPeerConnection] = useState(null);
  const routeMatch = useRouteMatch('/test/:id').params;
  useEffect(()=>{
    const config = { 'iceServers' : [{
      'urls' : 'stun:stun.l.google.com:19302'
    }]};
    setPeerConnection(new RTCPeerConnection(config));
    setSocket(io.connect('localhost:3002/video'));
  }, []);
  useEffect(()=>{
    if(peerConnection !== null){
      const option = {
        video : true,
        audio : true
      }
      navigator.mediaDevices.getUserMedia(option)
      .then(stream => {
        stream.getTracks().forEach(track => {
          peerConnection.addTrack(track, stream);
        });
        videoHost.current.srcObject = stream;
      });

      peerConnection.onicecandidate = (e) => {
        if(e.candidate){
          console.log('on ice candidate');
        socket.emit('candidate', e.candidate);
        }
      }
      peerConnection.onconnectionstatechange = (e) => {
        console.log(e);
      }
      peerConnection.oniceconnectionstatechange = (e) => {
        console.log(e);
      }
      peerConnection.ontrack = (ev) => {
        console.log(ev);
        videoClient.current.srcObject = ev.streams[0];
        videoClient.current.play();
      }
    }
  }, [socket, peerConnection])

  useEffect(()=>{
    if(socket !== null){
      socket.on('init', msg => {
        console.log(msg);
      });
      socket.on('fullUser', msg => {
        console.log(msg);
      });
      socket.on('offer', async msg => {
        console.log('offer');
        console.log(msg);
        await peerConnection.setRemoteDescription(new RTCSessionDescription(msg));
        const answer = await peerConnection.createAnswer({offerToReceiveAudio : true, offerToReceiveVideo : true});
        peerConnection.setLocalDescription(new RTCSessionDescription(answer));
        socket.emit('answer', answer);
      });
      socket.on('answer', async msg => {
        console.log('answer');
        console.log(msg);
        peerConnection.setRemoteDescription(new RTCSessionDescription(msg));
      });
      socket.on('candidate', async msg => {
        console.log("candidate");
        await peerConnection.addIceCandidate(new RTCIceCandidate(msg));
      });

      const data = {
        room : routeMatch.id,
        name : 'hwang yongJu' + Math.floor(Math.random() * 100),
      }
      socket.emit('init', data);
    }
  }, [peerConnection, socket, routeMatch])

  const createOffer = async () => {
    const offer = await peerConnection.createOffer({offerToReceiveAudio : true, offerToReceiveVideo : true})
    peerConnection.setLocalDescription(new RTCSessionDescription(offer));
    socket.emit('offer', offer);
  }


  const test = () => {
    createOffer();
  }
  const getVideo = () => {

  }
  return (
    <div>
      <video ref={videoHost} autoPlay width="500px" height="500px" controls/>
      <video ref={videoClient} autoPlay width="500px" height="500px" controls/>

      <button onClick={test}> sendVideo </button>
      <button onClick={getVideo}> getVideo </button>
    </div>
  )
}

export default Test;
