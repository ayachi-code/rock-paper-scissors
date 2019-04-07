let socket2 = io();

class Game {
    constructor(naam,counter) {
        this.naam = naam;
        this.counter = counter;
        this.counter = 4;
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
    spel_beginnen(callback) {
        let count_beneden = setInterval(() => {
            document.getElementById('steen').addEventListener('click',() => {
                console.log('steen is geklikt ');
                document.getElementById('je_keuze').innerHTML = "Je keuze is: steen ";
            })
            document.getElementById('papier').addEventListener('click',() => {
                console.log('papier is geklikt ');
                document.getElementById('je_keuze').innerHTML = "Je keuze is: papier ";
            })
            document.getElementById('schaar').addEventListener('click',() => {
                console.log('schaar is geklikt ');
                document.getElementById('je_keuze').innerHTML = "Je keuze is: schaar ";
            })
            this.counter -= 1;
            document.getElementById('teller').innerHTML = this.counter;
            if (this.counter <= 0) {
                clearInterval(count_beneden)
                document.getElementById('teller').innerHTML = 'klaar';
                callback('klaar')
            }
        },1200);
    }
}