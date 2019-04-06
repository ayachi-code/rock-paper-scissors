let socket2 = io();

class Game {
    constructor(naam) {
        this.naam = naam;
    }
    display_naam() {
        socket.emit('display_name');
        socket.on('display_name',() => {
            document.getElementById('naam').innerHTML = this.naam;
        });
    }
    display_enemy_namen() {
        socket2.emit('player_names');
        socket2.on('player_names',(data) => {
            console.log(data)
        });
    }
}