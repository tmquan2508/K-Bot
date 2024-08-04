ipcRenderer.on('add-bot', (event, botdata) => {
    createbotwithproxy(botdata.host, botdata.port, botdata.username, botdata.version)
})

let useproxy = document.getElementById('use-proxy').checked


let sendmessagebutton = document.getElementById('send-message-button')
let spambutton = document.getElementById('spam-button-start')
let respawnbutton = document.getElementById('respawn-button')

async function createbotwithproxy(host, port, username, version) {
    try {
        const socket = await connection(
            '4', // Use the appropriate proxy type here
            '82.165.198.169',
            '48285',
            host,
            port
        );
        createbot(host, port, username, version, socket); // Pass the socket to createbot
    } catch (error) {
        console.log('Proxy connection error:', error); // Log proxy connection errors
    }
}

function connection(proxyType, proxyHost, proxyPort, dHost, dPort) {
    console.log(`Attempting connection with proxy type: ${proxyType}`);
    return new Promise((resolve, reject) => {
        if (proxyType === '5' || proxyType === '4') {
            SocksClient.createConnection(
                {
                    proxy: {
                        host: proxyHost,
                        port: parseInt(proxyPort),
                        type: proxyType === 'socks5' ? 5 : 4
                    },
                    command: 'connect',
                    destination: {
                        host: dHost,
                        port: parseInt(dPort)
                    }
                },
                (err, info) => {
                    if (err) {
                        console.log('SOCKS proxy connection error:', err); // Log SOCKS proxy connection errors
                        return reject(err.message);
                    }
                    resolve(info.socket);
                }
            );
        } else {
            const socket = new Socket().connect({
                host: dHost,
                port: parseInt(dPort)
            });
            socket.on('connect', () => {
                resolve(socket);
            });
            socket.on('error', (err) => {
                console.log('Socket connection error:', err); // Log socket connection errors
                return reject(err.message);
            });
        }
    });
}

function createbot(host, port, username, version, socket) {
    const bot = mineflayer.createBot({
        host: host,
        port: port,
        username: username,
        version: version,
        respawn: false,
        connect: (client) => {
            client.setSocket(socket);
            client.connect();
        }
    })

    bot.on('login', () => {
        addbottolist(bot._client.username, host, port)
    })

    bot.on('end', () => {
        removebotfromlist(bot._client.username, host, port)
    })
    

    sendmessagebutton.addEventListener('click', () => {
        let message = document.getElementById('message-input').value
        executed(bot, 'message', message)
    })
    
    spambutton.addEventListener('click', () => {
        let spam = document.getElementById('spam-input').value
        let spamdelay = document.getElementById('spam-delay-input').value
        let useantispam = document.getElementById('use-anti-spam').checked
        let antispamchars = document.getElementById('anti-spam-chars').value
        let antispamlenght = document.getElementById('anti-spam-lenght').value
        let spamtime = document.getElementById('spam-time').value

        executed(bot, 'spam', {spam, spamdelay, useantispam, antispamchars, antispamlenght, spamtime})
    })

    bot.on('death', () => {
        let autorespawn = document.getElementById('auto-respawn').checked
        if (autorespawn) {
            bot.respawn()
        } else {
            respawnbutton.addEventListener('click', () => {
                executed(bot, 'respawn')
            })
        }
    })

    

}

function executed(bot, action, data) {
    let selectedbots = updateselectedbots()
    selectedbots.forEach(bots => {
        if (bot._client.username === bots.username && bot._client.socket._host === bots.host) {

            switch (action) {
                case 'message': {
                    bot.chat(data)
                }

                case 'spam': {
                    if (data.useantispam) {
                        function bypass() {
                            let spam_message = ''
                            let bypass = ''
                            for (let i = 0; i < data.antispamlenght; i++) {
                                bypass += data.antispamchars[Math.floor(Math.random() * antispamchars.length)]
                            }
                            return bypass
                        }
                        
                        let spamaction = setInterval(() => {
                            let spam_message = data.spam + bypass()
                            bot.chat(spam_message);
                        }, data.spamdelay);
                    
                        setTimeout(() => {
                            clearInterval(spamaction);
                        }, data.spamtime);
                    } else {
                        spam_message = data.spam
                        let spamaction = setInterval(() => {
                            bot.chat(spam_message);
                        }, data.spamdelay);
                    
                        setTimeout(() => {
                            clearInterval(spamaction);
                        }, data.spamtime);
                    }
                }

                case 'respawn': {
                    bot.respawn()
                }

            }
        }
    });
}