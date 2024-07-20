document.addEventListener("DOMContentLoaded", function () {
  showsection("botting");
});

const { ipcRenderer } = require('electron');

document.getElementById('open-add-bot').addEventListener('click', () => {
  ipcRenderer.send('open-add-bot');
});

document.getElementById('close-button').addEventListener('click', () => {
  ipcRenderer.send('close-app');
});

document.getElementById('minimal-button').addEventListener('click', () => {
  ipcRenderer.send('minimal-app')
})

const boticon = document.getElementById('bot-icon');
const botcountelement = document.getElementById('bot-count');
let botcount = parseInt(botcountelement.textContent, 10);
function updatebotcount() {
  botcountelement.textContent = botcount;

  if (botcount >= 2) {
      boticon.src = './assets/icon/multiple.svg';
  } else {
      boticon.src = './assets/icon/single.svg';
  }
}

ipcRenderer.on('add-bot-to-list', (event, botdata) => {
  const botlist = document.getElementById('bot-list');

  let serverdiv = Array.from(botlist.children).find(div => 
    div.querySelector('.server-div') && 
    div.querySelector('.server-div').dataset.host === `${botdata.host}:${botdata.port}`
  );

  if (!serverdiv) {
    serverdiv = document.createElement('div');
    serverdiv.innerHTML = `
      <label class="server-label">
        <span class="server-info">${botdata.host}:${botdata.port}</span>
        <img src="./assets/icon/arrowdownexpand.svg" class="server-more" data-status="show">
      </label>
      <div class='server-div' data-host="${botdata.host}:${botdata.port}"></div>
    `;
    botlist.appendChild(serverdiv);

    const servermore = serverdiv.querySelector('.server-more');
    servermore.addEventListener('click', (event) => {
      const clickedmore = event.currentTarget;
      const serverclickmore = clickedmore.closest('div').querySelector('.server-div');
      
      if (clickedmore.dataset.status === 'show') {
        clickedmore.dataset.status = 'hide';
        console.log('hide');
        serverclickmore.style.display = 'none';
      } else {
        clickedmore.dataset.status = 'show';
        console.log('show');
        serverclickmore.style.display = 'block';
      }
    });
  }

  const botdiv = document.createElement('div');
  botdiv.innerHTML = `<div class='bot-div'>${botdata.username}</div>`;

  if (document.getElementById('auto-select').checked) {
    botdiv.classList.add('active-bot');
    botdiv.dataset.status = 'active-bot';
  } else {
    botdiv.classList.add('inactive-bot');
    botdiv.dataset.status = 'inactive-bot';
  }

  botdiv.addEventListener('click', botclick);

  serverdiv.querySelector('.server-div').appendChild(botdiv);

  botcount += 1
  updatebotcount();
});

ipcRenderer.on('remove-bot-from-list', (event, botdata) => {
  const botlist = document.getElementById('bot-list');

  const serverdiv = Array.from(botlist.children).find(div => {
    const serverdivs = div.querySelector('.server-div');
    if (serverdivs) {
      const datahost = serverdivs.getAttribute('data-host');
      return datahost === `${botdata.host}:${botdata.port}`;
    }
    return false;
  });

  if (serverdiv) {
    const botdiv = Array.from(serverdiv.querySelectorAll('.bot-div')).find(div => 
      div.textContent === botdata.username
    );

    if (botdiv) {
      botdiv.remove();

      if (serverdiv.querySelectorAll('.bot-div').length === 0) {
        serverdiv.remove()
      }
    }
  }

  botcount -= 1
  updatebotcount();
});

document.getElementById('select-button').addEventListener('click', () => {
  const allbots = document.querySelectorAll('.bot-div');
  const activebots = document.querySelectorAll('.bot-div.active-bot');
  const selectall = activebots.length < allbots.length;

  allbots.forEach(bot => {
    bot.removeEventListener('click', botclick);
    if (selectall) {
      bot.classList.remove('inactive-bot');
      bot.classList.add('active-bot');
      bot.dataset.status = 'active-bot';
    } else {
      bot.classList.remove('active-bot');
      bot.classList.add('inactive-bot');
      bot.dataset.status = 'inactive-bot';
    }
    bot.addEventListener('click', botclick);
  });
});

document.querySelectorAll('.bot-div').forEach(bot => {
  bot.addEventListener('click', botclick);
});

function botclick() {
  if (this.dataset.status === 'inactive-bot') {
    this.classList.remove('inactive-bot');
    this.classList.add('active-bot');
    this.dataset.status = 'active-bot';
  } else {
    this.classList.remove('active-bot');
    this.classList.add('inactive-bot');
    this.dataset.status = 'inactive-bot';
  }
}

showcontrol('message-control')
function showsection(sectionid) {

  const allsections = document.querySelectorAll(".page-section");
  for (const section of allsections) {
    section.style.display = "none";
  }

  const selectedSection = document.getElementById(sectionid);
  selectedSection.style.display = "block";
  git remote add origin
  const buttons = document.getElementsByClassName("nav-button");
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove("active-button");
  }

  const selectedButton = document.querySelector(`button[onclick="showSection('${sectionid}')"]`);
  selectedButton.classList.add("active-button");
}

function showcontrol(controlid) {
  const allcontrolpage = document.querySelectorAll(".control-page section");
  const controlbuttons = document.querySelectorAll(".control-button");

  controlbuttons.forEach(button => {
    button.classList.remove("control-button-selected");
  });

  const selectcontrolbutton = document.querySelector(`button[onclick="showcontrol('${controlid}')"]`);
  selectcontrolbutton.classList.add("control-button-selected");

  allcontrolpage.forEach((section) => {
    section.style.display = "none";
    section.classList.remove("open-control");
  });

  if (controlid) {
    const selectcontrol = document.getElementById(controlid);
    selectcontrol.style.display = "block";
    selectcontrol.classList.add("open-control");
  }
}