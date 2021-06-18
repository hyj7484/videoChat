import React from 'react';


export default function WebRTC(){
  const constraints = {
    'video' : true,
    'audio' : true
  }
  navigator.mediaDevices.getUserMedia(constraints)
  .then(stream => {
    console.log('Get MediaStream', stream);
  })
  .catch(error => {
    console.error('Error accessing media devices', error);
  })

  return (
    <div>
          
    </div>
  )
}
