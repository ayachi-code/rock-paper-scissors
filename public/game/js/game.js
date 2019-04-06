let socket2 = io();

class Game {
    constructor(naam) {
        this.naam = naam;
        this
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
            document.getElementById('vs').innerHTML = data.naam[0] + " VS " + data.naam[1]
        });
    }
    Initialiseer_de_game() {
        document.getElementById('start').remove();
    }
}