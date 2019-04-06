let socket = io();
let naam = localStorage.getItem('naam');

let start_knop = document.getElementById('start');
let ready = false;

start_knop.addEventListener('click',() => {
    console.log("Je bent ready kijken als andere speler ready is...")
    ready = true;
    socket.emit('klaar',naam);
})