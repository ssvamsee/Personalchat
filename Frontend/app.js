const socket=io('http://127.0.0.1:8000/');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInput');
const messageContainer = document.querySelector(".container");

const append=(message,position)=>{
    const messageElement=document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
}

const name = prompt("Please Enter your Name to Enter the Chat room");
socket.emit('new-user-joined', name);

socket.on('user-joined',name=>{
    append(`${name} Joined the Chat`,'right')
})

socket.on('receive', data=>{
    append(`${data.name}:${data.message}`,'left')
})

socket.on('left',name=>{
    append(`${name} left the chat`, 'right')
})

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message=messageInput.value;
    append(`You:${message}`, 'right');
    socket.emit('send',message);
    messageInput.value=''
})



