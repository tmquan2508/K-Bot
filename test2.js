const { SocksClient } = require('socks');
const mineflayer = require('mineflayer');

const minecraft = { host: "147.185.221.20", port: 44657 };
const proxy = { host: '24.249.199.12', port: 4145 };

async function createBotWithProxy() {
  try {
    // Create the SOCKS connection
    console.log('Attempting to create SOCKS connection...');
    const { socket } = await SocksClient.createConnection({
      proxy: {
        host: proxy.host,
        port: proxy.port,
        type: 5 // Use 4 for SOCKS4, 5 for SOCKS5
      },
      command: 'connect',
      destination: {
        host: minecraft.host,
        port: minecraft.port
      }
    });

    console.log('SOCKS connection established.');
    
    // Create the bot with the proxy socket
    const bot = mineflayer.createBot({
      socket: socket,
      username: "proxy",
      version: '1.20.4'
    });

    bot.on('spawn', () => {
      console.log('Bot has spawned.');
    });

    bot.on('error', (err) => {
      console.log('Bot encountered an error:', err);
    });

    bot.on('end', () => {
      console.log('Bot has ended.');
    });
  } catch (error) {
    console.log('Proxy connection error:', error); // Log proxy connection errors
  }
}

createBotWithProxy();
