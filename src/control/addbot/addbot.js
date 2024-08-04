const join = document.getElementById('join')

    // let server = "147.185.221.20:44657"
    // let server = "192.168.1.7:54073"

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

function docreatebot(host, port, username, version) {
    ipcRenderer.send('add-bot', { host, port, username, version })
}

function createbots(host, port, username, version, count, delay, namegen, authtype) {
    if (authtype === 'cracked') {
        for (let i = 1; i <= count; i++ ) {
            setTimeout(() => {
                let name = getusername(username, namegen, i);
                docreatebot(host, port, name, version);
            }, i * delay);
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
            return getnamefromfile(i);
            break;
    }
}

function genlegitname() {
    const firstnames = [
        'James', 'John', 'Robert', 'Michael', 'William', 'David', 'Richard', 'Joseph', 'Charles', 'Thomas',
        'Christopher', 'Daniel', 'Matthew', 'Anthony', 'Donald', 'Mark', 'Paul', 'Steven', 'Andrew', 'Kenneth',
        'Joshua', 'Kevin', 'Brian', 'George', 'Edward', 'Ronald', 'Timothy', 'Jason', 'Jeffrey', 'Ryan',
        'Jacob', 'Gary', 'Nicholas', 'Eric', 'Stephen', 'Jonathan', 'Larry', 'Justin', 'Scott', 'Brandon',
        'Frank', 'Benjamin', 'Gregory', 'Raymond', 'Samuel', 'Patrick', 'Alexander', 'Jack', 'Dennis', 'Jerry',
        'Tyler', 'Aaron', 'Jose', 'Henry', 'Adam', 'Douglas', 'Nathan', 'Peter', 'Zachary', 'Kyle',
        'Walter', 'Harold', 'Jeremy', 'Ethan', 'Carl', 'Keith', 'Roger', 'Gerald', 'Christian', 'Terry',
        'Sean', 'Arthur', 'Austin', 'Noah', 'Lawrence', 'Jesse', 'Joe', 'Bryan', 'Billy', 'Jordan',
        'Albert', 'Dylan', 'Bruce', 'Willie', 'Gabriel', 'Alan', 'Juan', 'Logan', 'Wayne', 'Ralph',
        'Roy', 'Eugene', 'Randy', 'Vincent', 'Russell', 'Louis', 'Philip', 'Bobby', 'Johnny', 'Bradley',
        'Martin', 'Phillip', 'Clarence', 'Stanley', 'Shawn', 'Travis', 'Leonard', 'Howard', 'Harry', 'Francis',
        'Raymond', 'Frederick', 'Joel', 'Victor', 'Tony', 'Glenn', 'Curtis', 'Theodore', 'Darrell', 'Marvin',
        'Danny', 'Edwin', 'Norman', 'Sam', 'Craig', 'Allen', 'Melvin', 'Gordon', 'Vernon', 'Jeffery',
        'Charlie', 'Earl', 'Jimmy', 'Antonio', 'Eddie', 'Micheal', 'Barry', 'Calvin', 'Leroy', 'Oscar',
        'Jay', 'Marcus', 'Lee', 'Dale', 'Rodney', 'Dean', 'Troy', 'Steve', 'Derrick', 'Clifford',
        'Lloyd', 'Alfred', 'Leon', 'Glen', 'Wesley', 'Warren', 'Blake', 'Shane', 'Duane', 'Gilbert',
        'Harvey', 'Gene', 'Ronnie', 'Dustin', 'Ian', 'Dave', 'Bernard', 'Elmer', 'Herbert', 'Lewis',
        'Floyd', 'Isaac', 'Cecil', 'Ray', 'Jim', 'Tommy', 'Milton', 'Leo', 'Don', 'Darryl',
        'Jon', 'Lonnie', 'Alvin', 'Lester', 'Everett', 'Edgar', 'Claude', 'Horace', 'Leslie', 'Franklin',
        'Lance', 'Lyle', 'Gregg', 'Hugh', 'Jimmie', 'Jessie', 'Brent', 'Gerard', 'Freddie', 'Daryl',
        'Cory', 'Toby', 'Van', 'Abel', 'Dominic', 'Bert', 'Dean', 'Kirk', 'Forrest', 'Wilbur',
        'Emmett', 'Mathew', 'Ira', 'Otis', 'Simon', 'Willard', 'Wendell', 'Max', 'Randall', 'Garry',
        'Pete', 'Roderick', 'Colin', 'Arnold', 'Bennie', 'Lucas', 'Leroy', 'Oliver', 'Homer', 'Gerard',
        'Carroll', 'Elbert', 'Archie', 'Alonzo', 'Wilbert', 'Earnest', 'Dwayne', 'Dwight', 'Armando', 'Felix',
        'Johnnie', 'Cody', 'Salvatore', 'Cedric', 'Lowell', 'Elliot', 'Malcolm', 'Sylvester', 'Terrence', 'Irving',
        'Merle', 'Delbert', 'Leland', 'Wilfred', 'Orville', 'Ervin', 'Dewey', 'Al', 'Wilmer', 'Gus',
        'Garrett', 'Devin', 'Emil', 'Damon', 'Jerald', 'Miles', 'Jared', 'Evan', 'Bradford', 'Erick',
        'Wilson', 'Randal', 'Loren', 'Jody', 'Elias', 'Marlin', 'Taylor', 'Reginald', 'Rudy', 'Rex',
        'Darin', 'Clifton', 'Raphael', 'Bryce', 'Sterling', 'Denis', 'Tyrone', 'Noel', 'Waylon', 'Damien',
        'Rico', 'Donnell', 'Ned', 'Sammy', 'Reid', 'Ed', 'Kermit', 'Cruz', 'Rogelio', 'Bernardo'
    ];
    
    const lastnames = [
        'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez',
        'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin',
        'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson',
        'Walker', 'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores',
        'Green', 'Adams', 'Nelson', 'Baker', 'Hall', 'Rivera', 'Campbell', 'Mitchell', 'Carter', 'Roberts',
        'Gomez', 'Phillips', 'Evans', 'Turner', 'Diaz', 'Parker', 'Cruz', 'Edwards', 'Collins', 'Reyes',
        'Stewart', 'Morris', 'Morales', 'Murphy', 'Cook', 'Rogers', 'Gutierrez', 'Ortiz', 'Morgan', 'Cooper',
        'Peterson', 'Bailey', 'Reed', 'Kelly', 'Howard', 'Ramos', 'Kim', 'Cox', 'Ward', 'Richardson',
        'Watson', 'Brooks', 'Chavez', 'Wood', 'James', 'Bennett', 'Gray', 'Mendoza', 'Ruiz', 'Hughes',
        'Price', 'Alvarez', 'Castillo', 'Sanders', 'Patel', 'Myers', 'Long', 'Ross', 'Foster', 'Jimenez',
        'Powell', 'Jenkins', 'Perry', 'Russell', 'Sullivan', 'Bell', 'Coleman', 'Butler', 'Henderson', 'Barnes',
        'Gonzales', 'Fisher', 'Vasquez', 'Simmons', 'Romero', 'Jordan', 'Patterson', 'Alexander', 'Hamilton', 'Graham',
        'Reynolds', 'Griffin', 'Wallace', 'Moreno', 'West', 'Cole', 'Hayes', 'Bryant', 'Herrera', 'Gibson',
        'Ellis', 'Tran', 'Medina', 'Aguilar', 'Stevens', 'Murray', 'Ford', 'Castro', 'Marshall', 'Owens',
        'Harrison', 'Fernandez', 'Mcdonald', 'Woods', 'Washington', 'Kennedy', 'Wells', 'Vargas', 'Henry', 'Chen',
        'Freeman', 'Webb', 'Tucker', 'Guzman', 'Burns', 'Crawford', 'Olson', 'Simpson', 'Porter', 'Hunter',
        'Gordon', 'Mendez', 'Silva', 'Shaw', 'Snyder', 'Mason', 'Dixon', 'Munoz', 'Hunt', 'Hicks',
        'Holmes', 'Palmer', 'Wagner', 'Black', 'Robertson', 'Boyd', 'Rose', 'Stone', 'Salazar', 'Fox',
        'Warren', 'Mills', 'Meyer', 'Rice', 'Schmidt', 'Garza', 'Daniels', 'Ferguson', 'Nichols', 'Stephens',
        'Soto', 'Weaver', 'Ryan', 'Gardner', 'Payne', 'Grant', 'Dunn', 'Kelley', 'Spencer', 'Hawkins',
        'Arnold', 'Pierce', 'Vazquez', 'Hansen', 'Peters', 'Santos', 'Hart', 'Bradley', 'Knight', 'Elliott',
        'Cunningham', 'Duncan', 'Armstrong', 'Hudson', 'Carroll', 'Lane', 'Riley', 'Andrews', 'Alvarado', 'Ray',
        'Deleon', 'Perkins', 'Mckenzie', 'Obrien', 'Lawson', 'Walters', 'Fields', 'Williamson', 'Rios', 'Payne',
        'Parsons', 'Frank', 'Waters', 'Moran', 'Conner', 'Padilla', 'Burgess', 'Walsh', 'Mccarthy', 'Blair',
        'Haynes', 'Paul', 'Sandoval', 'Pearson', 'Bates', 'Bush', 'Chan', 'Brady', 'Horton', 'Pennington',
        'Graves', 'Sutton', 'Welch', 'Clayton', 'Caldwell', 'Jennings', 'Flynn', 'Atkins', 'Wilkins', 'Mckinney',
        'Mann', 'Benson', 'Hale', 'Brock', 'Pittman', 'Meyers', 'Sherman', 'Mcguire', 'Kane', 'Wall',
        'Boone', 'Kirby', 'Wilcox', 'Bernard', 'Miranda', 'Cline', 'Delacruz', 'Kaufman', 'Petersen', 'Wyatt',
        'Lowe', 'Gallegos', 'Barron', 'Roach', 'Downs', 'Ballard', 'Friedman', 'Mullen', 'Morrow', 'Cantu',
        'Riddle', 'Russo', 'Short', 'Hendrix', 'Olsen', 'Combs', 'Mosley', 'Beard', 'Small', 'Finley'
    ];

    const randomfirstname = firstnames[Math.floor(Math.random() * firstnames.length)];
    const randomlastname = lastnames[Math.floor(Math.random() * lastnames.length)];

    return randomfirstname + randomlastname;
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

let names = [];
document.getElementById('name-file').addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const content = e.target.result;
            names = parsefilecontent(content);
        };
        reader.readAsText(file);
    }
});

function getnamefromfile(index) {
    if (index - 1 < names.length) {
        return names[index - 1];
    } else {
        return `bot${index}`;
    }
}

function parsefilecontent(content) {
    return content.split('\n').map(line => line.trim()).filter(line => line.length > 0);
}