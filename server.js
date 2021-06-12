const express=require('express');
const app=express();
const http= require('http')
const server=http.createServer(app);
const {v4:uuidv4}=require('uuid');

const { Server } = require("socket.io");
const io = new Server(server);

// const {ExpressPeerServer} = require('peer');

// const peerServer=ExpressPeerServer(server,{
//   debug:true,
// });
let userList=[];



app.set('view engine','ejs');
app.use(express.static('public'));
// app.use('/peerjs', peerServer);

app.get('/',(req,res)=>{
    res.redirect(`/${uuidv4()}`);
})

app.get('/:room',(req,res)=>{
    res.render('room',{roomId:req.params.room});
})

io.on('connection',(socket)=>{
    console.log(socket.id);
    socket.on('join-room',(roomId,userId)=>{
       userList.push(socket.id);
        socket.join(roomId);
        socket.to(roomId).emit('user-connected',userId);
        // socket.broadcast.emit('user-connected',userId)
    });

    socket.on('chat',function(chat){
        console.log("inside chat");
        socket.broadcast.emit('message',chat);
    });

    socket.on('share-screen',function(stream){
        console.log("Inside Server file broadcast screen")
        socket.broadcast.emit('someone-sharingScreen',stream);
    })

    


});


server.listen(4000 , function(){
    console.log("server started")
});


































