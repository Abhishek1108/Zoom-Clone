

let chatWindow=document.querySelector('.message-area');
let chatInput=document.querySelector('.chat-input');


chatInput.addEventListener('keypress',function(e){
    if(e.key=='Enter'){
        let chatDiv=document.createElement('div');
        chatDiv.classList.add('chat');
        chatDiv.classList.add('right');
        chatDiv.textContent=chatInput.value;
        chatWindow.append(chatDiv);
        console.log(socket);
        let chat=chatInput.value;
        socket.emit('chat',chat);
        chatInput.value="";
    }
})

socket.on('message',function(chat){
    let chatDiv=document.createElement('div');
        chatDiv.classList.add('chat');
        chatDiv.classList.add('left');
        chatDiv.textContent=chat;
        chatWindow.append(chatDiv);
})