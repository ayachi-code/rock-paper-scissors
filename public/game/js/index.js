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
        //Genoeg spelers en game gaat beginnen
        console.log("genoeg spelers");
        let spel = new Game(naam,3);
        spel.display_naam();
        spel.display_enemy_namen();
        spel.Initialiseer_de_game();
        spel.spel_beginnen((data) => {
            if (data) {
                console.log("klaar !")
            }
        });
    })

    socket.on('weg',() => {
        console.log('Er zijn al 2 spelers je word nu gekickt ');
        //window.location.href = "/"
    })

})


//testen
/*
function git(limit, callback) {
    var i = limit;
    var git = setInterval(function () {
        console.log(i);
        if (i <= 0) {
            clearInterval(git);
            callback(true);
        }
        i--;
    }, 800);
}

git(5, function (x) {
    console.log(x)
});

*/