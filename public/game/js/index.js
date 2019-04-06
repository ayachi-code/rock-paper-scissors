let socket = io();
let naam = localStorage.getItem('naam');

let start_knop = document.getElementById('start');

start_knop.addEventListener('click',() => {
    console.log("Je bent ready kijken als andere speler ready is...")
    socket.emit('klaar',naam);

    socket.on('niet',() => {
        console.log('Er zijn geen genoeg spelers even geduld');
    });

    socket.on('genoeg',() => {
        console.log("Er zijn genoeg spelers... ");
    })

})