let socket = io();

let start_knop = document.getElementById('start');
let ready = false;

start_knop.addEventListener('click',() => {
    console.log("Je bent ready kijken als andere speler ready is...")
    ready = true;
})