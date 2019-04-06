let socket2 = io();

class Game {
    constructor(naam) {
        this.naam = naam;
    }
    welkom() {
        socket2.emit('player_names');
        socket2.on('player_names',(data) => {
            console.log(data)
        });
    }
}