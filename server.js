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

io.sockets.on('connection', (socket) => {
    console.log(socket.id)


    socket.on('disconnect', () => {
        console.log(socket.id + "is weg gegaan ");
    })

});