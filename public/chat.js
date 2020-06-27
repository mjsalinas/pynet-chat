const socket = io();

let message = document.getElementById('message');
let username = document.getElementById('username');
let btn = document.getElementById('send');
let output = document.getElementById('output');
let actions = document.getElementById('actions');
let clear = document.getElementById('chatbox-clear');
let agente = document.getElementById('agents-name');

btn.addEventListener('click', function() {
    socket.emit('chat:message',{
        username: username.value, 
        message: message.value
    });
    // Borrar el mensaje del input
message.value='';
});
message.addEventListener('keypress', function(){
    socket.emit('chat:typing', username.value)
})
clear.addEventListener('click', function(){
    socket.emit('chat:clear', output )
})

socket.on('mensaje del servidor', function (data){
actions.innerHTML = "";
var newBubble = document.createElement("div");
newBubble.setAttribute("class", "msg");
newBubble.innerHTML = `<div class="msg">
<span class="user"> ${data.username}: </span>  <span class="usersmsg"> ${data.message} </span>
</div>`;
output.append(newBubble);
})

socket.on('chat:typing', function(data){
    actions.innerHTML = `<p> <em>${data} está escribiendo...</em></p>`;
})
socket.on('chat:clear', function(data){
    output.innerHTML = "";
    username.value ="";
})