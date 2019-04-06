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


let players = {naam: [],socketid: []}

function naam_socketid_toevoegen(naam,socketid) {
    players.naam.push(naam)
    players.socketid.push(socketid)
    return [players.naam.length,players.socketid.length]
}

io.sockets.on('connection', (socket) => {

    socket.on('klaar',(data) => {
        let lengte = naam_socketid_toevoegen(data,socket.id)
        console.log(players)
        if (lengte[0] == 2) {
            console.log("Genoeg spelers en room is vol ");
        } else if(lengte[0] < 2) {
            console.log("Hmm er zijn geen genoeg spelers");
        } else if (lengte[0] > 2) {
            console.log("He er zijn al 2 spelers je word nu gekickt... ")
        }
    })

    socket.on('disconnect', () => {
        console.log(socket.id + "is weg gegaan ");
        //players = players.filter(e => e !== socket.id);
        console.log(players)
    })

});
