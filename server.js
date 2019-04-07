const express = require('express')
const app = express();
const port = 8080;
const server = app.listen(port, (error) => {
   if (error) {
       console.log("Hmm er is iets fout gegeaan fout melding " + error)
   }else if(!error) {
        console.log("Server word gehost op port: " + port);
   }
});
app.use(express.static('public'));

//Sockets ....
const socket = require("socket.io");
const io = socket(server);


let players = {naam: [],socketid: [],keuze: []};

function naam_socketid_toevoegen(naam,socketid) {
    players.naam.push(naam)
    players.socketid.push(socketid)
    return [players.naam.length,players.socketid.length]
}

io.sockets.on('connection', (socket) => {

    let naam;

    socket.on('klaar',(data) => {
        naam = data;
        let lengte = naam_socketid_toevoegen(data,socket.id)
        console.log(players)
        if (lengte[0] == 2) {
            console.log("Genoeg spelers en room is vol ");
            io.emit('genoeg')
        } else if(lengte[0] < 2) {
            console.log("Hmm er zijn geen genoeg spelers");
            socket.emit('niet')
        } else if (lengte[0] > 2) {
            console.log("He er zijn al 2 spelers je word nu gekickt... ")
            socket.emit('weg')
        }
    })


    socket.on('player_names', () => {
        io.emit('player_names',players);
    });

    socket.on('display_name',() => {
        io.emit("display_name");
    });

    socket.on('keuzen',(data) => {
        players.keuze.push(data);
        if (players.keuze[0] == "steen" && players.keuze[1] == "schaar") {
            console.log(players.naam[0] + " heeft gewonnen");
        } else if(players.keuze[0] == "steen" && players.keuze[1] == "papier") {
            console.log(players.naam[1] + " heeft gewonnen");
        }  else if(players.keuze[0] == "steen" && players.keuze[1] == "steen") {
            console.log("gelijk spel");
        } else if (players.keuze[1] == "steen" && players.keuze[0] == "schaar") {
            console.log(players.naam[1] + " heeft gewonnen");
        } else if (players.keuze[1] == "steen" && players.keuze[0] == "papier") {
            console.log(players.naam[0] + " heeft gewonnen");
        } else if (players.keuze[0] == "papier" && players.keuze[1] == "schaar") {
            console.log(players.naam[1] + " heeft gewonnen");
        } else if (players.keuze[0] == "papier" && players.keuze[1] == "steen") {
            console.log(players.naam[0] + " heeft gewonnen");
        } else if (players.keuze[0] == "papier" && players.keuze[1] == "papier") {
            console.log("Gelijk spel ");
        } else if (players.keuze[1] == "papier" && players.keuze[0] == "schaar") {
            console.log(players.naam[0] + " heeft gewonnen");
        } else if (players.keuze[1] == "papier" && players.keuze[0] == "steen") {
            console.log(players.naam[1] + " heeft gewonnen");
        } else if (players.keuze[0] == "schaar" && players.keuze[1] == "schaar") {
            console.log('gelijk spel')
        } else if (players.keuze[0] == "schaar" && players.keuze[1] == "papier") {
            console.log(players.naam[0] + " heeft gewonnen");
        } else if (players.keuze[0] == "schaar" && players.keuze[1] == "steen") {
            console.log(players.naam[1] + " heeft gewonnen");
        } else if (players.keuze[1] == "schaar" && players.keuze[0] == "papier") {
            console.log(players.naam[1] + " heeft gewonnen");
        } else if (players.keuze[0] == "schaar" && players.keuze[1] == "steen") {
            console.log(players.naam[1] + " heeft gewonnen");
        }
    });

    socket.on('disconnect', () => {
        console.log(socket.id + "is weg gegaan ");
        players.naam = players.naam.filter(e => e !== naam);
        players.socketid = players.socketid.filter(e => e !== socket.id);
        console.log(players)
    })

});

