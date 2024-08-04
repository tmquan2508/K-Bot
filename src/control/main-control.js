ipcRenderer.on('add-bot', (event, botdata) => {
  createbot(botdata.host, botdata.port, botdata.username, botdata.version)
})

let sendmessagebutton = document.getElementById('send-message-button')
let spambutton = document.getElementById('spam-button-start')
let respawnbutton = document.getElementById('respawn-button')

function connection( proxytype, proxyhost, proxyport, host, port) {
  return new Promise((resolve, reject) => {
    if (proxytype === 'socks5' || proxytype === 'socks4') {
      SocksClient.createConnection(
        {
          proxy: {
            host: proxyhost,
            port: proxyport,
            type: proxytype === 'socks5' ? 5 : 4
          },
          command: 'connect',
          destination: {
            host: host,
            port: port
          }
        },
        (err, info) => {
          if (err) {
            return reject(err.message)
          }
          resolve(info.socket)
        }
      )
    } else if (proxytype === 'http') {
      const { hostname: proxyhost, port: proxyport } = parse(proxyUrl);
      const options = {
        host: proxyhost,
        port: proxyport || 80,
        method: 'CONNECT',
        path: `${host}:${port}`,
      };

      const req = require('http').request(options);
      req.on('connect', (res, socket) => {
        if (res.statusCode === 200) {
          resolve(socket);
        } else {
          reject(new Error(`Failed to establish a tunnel, status code: ${res.statusCode}`));
        }
      });

      req.on('error', (err) => {
        reject(err);
      });

      req.end();
    } else {
      const socket = new Socket().connect({
        host: host,
        port: port
      })
      
      socket.on('connect', () => {
        resolve(socket)
      })
      socket.on('error', (err) => {
        return reject(err.message)
      })
    }
  })
}
  

function createbot(host, port, username, version) {
  let options = {
    host: host,
    port: port,
    username: username,
    version: version,
    respawn: false,
  }

  let useproxy = document.getElementById('use-proxy').checked
  let proxytype = document.getElementById('proxy-type').value

  if (useproxy) {
    const randomproxy = getrandomproxy();
    options.connect = async (client) => {
      try {
        const socket = await connection( proxytype, randomproxy.ip, randomproxy.port, host, port)
        client.setSocket(socket)
        client.emit('connect')
      } catch (error) {
          console.log(error)
      }
    }
  }

  const bot = mineflayer.createBot({options})

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
  })
}