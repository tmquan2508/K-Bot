const mineflayer = require('mineflayer')

const join = document.getElementById('join')

    // let server = "147.185.221.20:44657"
    // let server = "192.168.1.7:54073"

console.log('12')

join.addEventListener('click', function() {
    let server = document.getElementById('server').value;
    let username = document.getElementById('username').value;
    let version = document.getElementById('version').value;
    let count = document.getElementById('count').value
    let delay = document.getElementById('delay').value
    let namegen = document.getElementById('name-generator').value
    let authtype = document.getElementById('auth-type').value

    let host = server.split(':')[0]
    let port = server.split(':')[1]

    createbots(host, port, username, version, count, delay, namegen, authtype)
});

function createbot(host, port, username, version) {
    const bot = mineflayer.createBot({
        host: host,
        port: port,
        username: username,
        version: version,
    })
    console.log(`${username} connect to ${host}:${port} in version ${version}`)

    bot.on('')

}

function createbots(host, port, username, version, count, delay, namegen, authtype) {
    if (authtype === 'cracked') {
        for (let i = 1; i <= count; i++ ) {
            let name = getusername(username, namegen, i)
            const bot = mineflayer.createBot({
                host: host,
                port: port,

            })
        }

    } else if (authtype ==='microsoft') {

    }
}

function getusername(username, namegen, i) {
    switch (namegen) {
        case 'default':
            return `${username}${i}`
            break;

        case 'legit':
            return genlegitname()
            break;

        case 'random':
            return randomchar(10)
            break;

        case 'file':

            break;
    }
}

function genlegitname() {
    const firstnames = [
        'James', 'John', 'Robert', 'Michael', 'William', 'David', 'Richard', 'Joseph', 'Charles', 'Thomas',
        'Christopher', 'Daniel', 'Matthew', 'Anthony', 'Donald', 'Mark', 'Paul', 'Steven', 'Andrew', 'Kenneth',
        'Joshua', 'Kevin', 'Brian', 'George', 'Edward', 'Ronald', 'Timothy', 'Jason', 'Jeffrey', 'Ryan',
        'Jacob', 'Gary', 'Nicholas', 'Eric', 'Stephen', 'Jonathan', 'Larry', 'Justin', 'Scott', 'Brandon',
        'Frank', 'Benjamin', 'Gregory', 'Raymond', 'Samuel', 'Patrick', 'Alexander', 'Jack', 'Dennis', 'Jerry'
    ];

    const lastnames = [
        'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez',
        'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin',
        'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson',
        'Walker', 'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores',
        'Green', 'Adams', 'Nelson', 'Baker', 'Hall', 'Rivera', 'Campbell', 'Mitchell', 'Carter', 'Roberts'
    ];

    const randomfirstname = firstnames[Math.floor(Math.random() * firstnames.length)];
    const randomlastname = lastnames[Math.floor(Math.random() * lastnames.length)];

    return `${randomfirstname} ${randomlastname}`;
}


function randomchar(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const characterslength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characterslength));
    }
    return result;
}


 // document.getElementById('sendData').addEventListener('click', () => {
 //     const data = document.getElementById('dataInput').value;
 //     ipcRenderer.send('data-from-addbot', data);
 // });