const util = require("minecraft-server-util");

async function getStatus(server) {
  const address = util.parseAddress(server);
  try {
    const result = await util.status(address.host, address.port, {
      enableSRV: true,
    });

    console.log(result);

    // console.log(`Server: ${server}`);
    // console.log(`Host: ${address.host}`);
    // console.log(`Port: ${address.port}`);
    // console.log(`Online: ${result.players.online}`);
    // console.log(`Motd: ${result.motd.clean}`);
    // console.log(`Players: ${result.players.online}/${result.players.max}`);
    // console.log(`Version: ${result.version.name}`);

    // if (result.players.sample) {
    //   console.log(`Online Players: ${result.players.sample.map(player => player.name).join(', ')}`);
    // } else {
    //   console.log('Player names not available');
    // }

    // return result;
    console.log(result.srvRecord.host + result.srvRecord.port);
  } catch (error) {
    console.error(`Error fetching server status: ${error.message}`);
    throw error;
  }
}

getStatus('keep-lo.gl.joinmc.link');