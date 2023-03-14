const io= require('socket.io')(8000)
const express=require('express')
const app=express();
const cors= require('cors');
app.use(cors({
    origin: "*",
    methods: ["GET", "POST"],
}))
app.get('/',(req,res)=>{
    res.setHeader('Access-Control-Allow-Origin','http://127.0.0.1:5500')
})

const users={};

io.on('connection',socket=>{
    socket.on('new-user-joined',name=>{
        console.log('new user',name)
        users[socket.id]=name;
        socket.broadcast.emit('user-joined',name);
    });
    socket.on('send',message=>{
        socket.broadcast.emit('receive',{message:message, name:users[socket.id]})
    });
    socket.on('disconnect',message=>{
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });
})
