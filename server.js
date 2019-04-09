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
    let gewonnen;
    let keuze;

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
            //window.location.href = "/"
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
        keuze = data;
        players.keuze.push(data);
        console.log(players)
        if (players.keuze[0] == "steen" && players.keuze[1] == "schaar") {
            console.log(players.naam[0] + " heeft gewonnen");
            gewonnen = players.naam[0]
        } else if(players.keuze[0] == "steen" && players.keuze[1] == "papier") {
            console.log(players.naam[1] + " heeft gewonnen");
            gewonnen = players.naam[1]
        }  else if(players.keuze[0] == "steen" && players.keuze[1] == "steen") {
            console.log("gelijk spel");
        } else if (players.keuze[1] == "steen" && players.keuze[0] == "schaar") {
            console.log(players.naam[1] + " heeft gewonnen");
            gewonnen = players.naam[1]
        } else if (players.keuze[1] == "steen" && players.keuze[0] == "papier") {
            console.log(players.naam[0] + " heeft gewonnen");
            gewonnen = players.naam[0]
        } else if (players.keuze[0] == "papier" && players.keuze[1] == "schaar") {
            console.log(players.naam[1] + " heeft gewonnen");
            gewonnen = players.naam[1]
        } else if (players.keuze[0] == "papier" && players.keuze[1] == "steen") {
            console.log(players.naam[0] + " heeft gewonnen");
            gewonnen = players.naam[0]
        } else if (players.keuze[0] == "papier" && players.keuze[1] == "papier") {
            console.log("Gelijk spel ");
        } else if (players.keuze[1] == "papier" && players.keuze[0] == "schaar") {
            console.log(players.naam[0] + " heeft gewonnen");
            gewonnen = players.naam[0]
        } else if (players.keuze[1] == "papier" && players.keuze[0] == "steen") {
            console.log(players.naam[1] + " heeft gewonnen");
            gewonnen = players.naam[1]
        } else if (players.keuze[0] == "schaar" && players.keuze[1] == "schaar") {
            console.log('gelijk spel')
        } else if (players.keuze[0] == "schaar" && players.keuze[1] == "papier") {
            console.log(players.naam[0] + " heeft gewonnen");
            gewonnen = players.naam[0]
        } else if (players.keuze[0] == "schaar" && players.keuze[1] == "steen") {
            console.log(players.naam[1] + " heeft gewonnen");
            gewonnen = players.naam[1]
        } else if (players.keuze[1] == "schaar" && players.keuze[0] == "papier") {
            console.log(players.naam[1] + " heeft gewonnen");
            gewonnen = players.naam[1]
        } else if (players.keuze[0] == "schaar" && players.keuze[1] == "steen") {
            console.log(players.naam[1] + " heeft gewonnen");
            gewonnen = players.naam[1]
        }
        console.log(gewonnen + "test");
        io.emit('gewonnen',gewonnen)
    });

    socket.on('disconnect', () => {
        console.log(socket.id + "is weg gegaan ");
        players.naam = players.naam.filter(e => e !== naam);
        players.socketid = players.socketid.filter(e => e !== socket.id);
        players.keuze = players.keuze.filter(e => e !== keuze);
        console.log(players)
    })

});

