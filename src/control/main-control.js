const { ipcRenderer } = require("electron");

function control(bot, host, port, version) {
    let username = bot._client.username
    bot.on('login', () => {
        ipcRenderer.send('bot-join', { username, host, port });
        console.log(username)
    })

    bot.on('end', () => {
        ipcRenderer.send('bot-left', { username, host, port })
        console.log(username + 'end')
    })

    bot.on('chat', (username, message) => {
        if (username !== bot._client.username) {
            console.log(`[${username}] ${message}`);
        }
    });
    
}

module.exports = { control };
