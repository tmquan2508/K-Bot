const mineflayer = require('mineflayer')

const join = document.getElementById('join');

let server = "147.185.221.20:44657"

let shost = server.split(':')[0]
let sport = server.split(':')[1]

join.addEventListener('click', function() {

    const bot = mineflayer.createBot({
        host: shost,
        port: sport,
        username: 'Bot',
        version: '1.20.4',
    })

    bot.on('spawn', () => {
        bot.chat('hello')
    })

    console.log('1')
});

