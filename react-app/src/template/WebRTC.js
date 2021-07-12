import {useState, useEffect, useRef} from 'react';
import io from 'socket.io-client';

const WebRTC = (props) => {
  const [socket, setSocket]                 = useState(null);
  const [peerConnection, setPeerConnection] = useState(null);
  const videoHost   = useRef(null);
  const videoClient = useRef(null);

  const room = props.room;
  const name = props.name || 'no Name';

  useEffect(()=>{
    const config = { 'iceServers' : [{
      'urls' : 'stun:stun.l.google.com:19302'
    }]};
    const socketUrl = props.socketUrl;
    setPeerConnection(new RTCPeerConnection(config));
    setSocket(io.connect(`${socketUrl}/video`));
  }, []);

  useEffect(()=>{
    if(socket !== null && peerConnection !== null){
      const option = {
        video : true,
        audio : true
      }
      navigator.mediaDevices.getUserMedia(option)
      .then(stream => {
        videoHost.current.srcObject = stream;
        stream.getTracks().forEach(track => {
          peerConnection.addTrack(track, stream);
        });
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
        room : room,
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
