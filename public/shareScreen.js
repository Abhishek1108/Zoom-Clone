

let shareScreenButton=document.querySelector('.share-screen');

let userScreenVideo;

shareScreenButton.addEventListener('click',startScreenSharing);

function startScreenSharing(e){


     if(shareScreenButton.classList.contains('active')){
         shareScreenButton.classList.remove('active');
     }else{
        shareScreenButton.classList.add('active');
     }
     navigator.mediaDevices.getDisplayMedia({video:{cursor:'always'}
    
    
    }).then((stream)=>{
        console.log(stream);
        userScreenVideo=stream;
        //  let StreamObj={strm:stream};
   
        // let videoTracks=stream.getVideoTracks()[0];
        // console.log(videoTracks);
        // console.log(track.kind==videoTracks.kind);

        // socket.emit('share-screen',stream);
       
         let videoTracks=stream.getVideoTracks()[0];
         for (let x=0;x<currentPeer.length;x++){
     
            let sender = currentPeer[x].getSenders().find(function(s){
               return s.track.kind == videoTracks.kind;
             })
             console.log(sender);
             sender.replaceTrack(videoTracks);
            
         }
        
    })

}
// socket.on('someone-sharingScreen', function(stream){
//     console.log("@@@@@@@@@@@@");
//     // let newStream =new MediaStream(stream);
//     let shareScreenVideoElement=document.createElement('video');
//         shareScreenVideoElement.classList.add('shareScreen-video');
//         shareScreenVideoElement.setAttribute('autoplay','true');
//         shareScreenVideoElement.srcObject= stream;
       
//         zoomContent.append(shareScreenVideoElement);

// });





