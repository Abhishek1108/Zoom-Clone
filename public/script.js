
let muteUnmuteButton = document.querySelector(".mute-unmute");
let videoButton = document.querySelector(".video-button");
let zoomContent = document.querySelector(".zoom-content");
let chatButton = document.querySelector('.chat-button');
const myVideoEle = document.createElement('video');

myVideoEle.muted = true;

const peer = new Peer(undefined, {
    host: '/',
    port: '3001',
})
peer.on('open',id=>{
        console.log("inside perr.on");
    socket.emit('join-room',Room_id,id);
 })
 

let constraints = { video: true };

let myVideoStream;
let currentPeer=[];
let peers = {};
let userStreamObjects = [ ];

let mediaStream = navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
    myVideoStream = stream;
    myStreamObject={stream};
    
    userStreamObjects.push(myStreamObject);
    addVideoonVideoGrid(myVideoEle, stream, 'me');
    

    peer.on('call', (call) => {
        console.log("inside call");
        call.answer(stream);
        const video = document.createElement('video');

         call.on('stream', (newUserVideoStream) => {
            addVideoonVideoGrid(video, newUserVideoStream);
          
          
            
         });
         currentPeer.push(call.peerConnection);
        //  currentPeer=call.peerConnection;
    });

    socket.on('user-connected', (userId) => {
        console.log("inside user connected")
        connectNewUserToRoom(userId, stream);
    });
    socket.on('user-disconnected', userId =>{   //userdisconnected so we now ready to stopshare 
        if(peers[userId]) peers[userId].close();
        console.log('user ID fetch Disconnect: '+ userId); 
                //by this fuction which call user to stop share
  }); 

});

function addVideoonVideoGrid(videoele, mediaStream, userId) {
    videoele.srcObject = mediaStream;
    videoele.id = userId;
    videoele.classList.add("video");
    videoele.addEventListener('loadedmetadata', () => {
        videoele.play();
    })
    if (document.querySelector(".video-grid")) {

        let videoGrid = document.querySelector(".video-grid");
        videoGrid.append(videoele);
        videoele.autoplay = true;
    } else {
        let videoGrid = document.createElement("div");
        videoGrid.classList.add("video-grid");
        let videoArea=document.querySelector('.video-area');
        videoGrid.append(videoele);
        zoomContent.append(videoGrid);

    }

    let totalUserInroom = document.getElementsByTagName("video").length;

    if (totalUserInroom > 1) {
        for (let i = 0; i < totalUserInroom; i++) {
            document.getElementsByTagName('video')[i].style.width = 100 / totalUserInroom + "%";
        }
    }

}
function connectNewUserToRoom(userId, stream) {
    var call = peer.call(userId, stream);
    var video = document.createElement('video');

     call.on('stream', (newUserVideoStream) => {
         console.log(newUserVideoStream);
        addVideoonVideoGrid(video, newUserVideoStream, userId);
       
     });
     currentPeer.push(call.peerConnection);

    call.on('close', () => {
        video.remove();
    })
    peers[userId] = call;

}









// videoButton.addEventListener("click",showVideoOngrid);



//     // peer.on('call', call=>{

//     //     call.answer(mediaStream);
//     // })


// socket.on('user-connected',userId=>{
//  navigator.mediaDevices.getUserMedia(constraints).then(mediaStream=>{
//     console.log("new user landed"+userId);
//     connectNewPerson(userId,mediaStream);
//  })

//  })
//  async function connectNewPerson(userId,mediaStream){

// //apni video stream uske pass ja rahi hai
//  const call=peer.call(userId,mediaStream);
//  //uski video stream apne pass stream m aa rahihai
//  call.on('stream',newUserMediaStream=>{
//      console.log(newUserMediaStream);
//      addVideoOntheGrid(newUserMediaStream);
//  })

// }


//  async function showVideoOngrid(){


//     if(document.querySelector(".video-grid")){

//         let videoGrid=document.querySelector(".video-grid");
//        let videoEle=document.createElement("video");
//        videoEle.muted=true;
//        videoEle.classList.add("video");
//        videoEle.srcObject=mediaStream;
//        videoGrid.append(videoEle);
//        videoEle.autoplay=true; 
//     }else{
//         let videoGrid=document.createElement("div");
//         videoGrid.classList.add("video-grid");
//         let videoEle=document.createElement("video");
//         videoEle.muted=true;
//         videoEle.classList.add("video");
//         videoEle.srcObject=mediaStream;
//          videoGrid.append(videoEle);
//         zoomContent.append(videoGrid);
//         videoEle.autoplay=true;
//     }

// }

// peer.on("open",id=>{
//      console.log(id);   
// })
// function connectNewPerson(userId,mediaStream){
//  let call=peer.call(userId,mediaStream);
//  call.on('stream',newUserMediaStream=>{
//      addVideoOntheGrid(newUserMediaStream,isGridPresent);
//  })
//  call.on('close',()=>{

//  })
// }



chatButton.addEventListener('click', showChatBox);
function showChatBox() {
    if (document.querySelector('.chat-area').classList.contains('hide')) {
        document.querySelector('.chat-area').classList.remove('hide')
    } else {
        document.querySelector('.chat-area').classList.add('hide')
    }
    //  let InputBox=document.createElement('div');
    //  InputBox.classList.add('input-box');
    //  let chatArea=document.querySelector('.chat-area');
    //  chatArea.append(InputBox);

}
