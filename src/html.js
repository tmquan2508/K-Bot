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

function addbottolist(username, host, port) {
  const botlist = document.getElementById('bot-list');

  let serverdiv = Array.from(botlist.children).find(div => 
    div.querySelector('.server-div') && 
    div.querySelector('.server-div').dataset.host === `${host}:${port}`
  );

  if (!serverdiv) {
    serverdiv = document.createElement('div');
    serverdiv.innerHTML = `
      <label class="server-label">
        <span class="server-info">${host}:${port}</span>
        <img src="./assets/icon/arrowdownexpand.svg" class="server-more" data-status="show">
      </label>
      <div class='server-div' data-host="${host}:${port}"></div>
    `;
    botlist.appendChild(serverdiv);

    const servermore = serverdiv.querySelector('.server-more');
    servermore.addEventListener('click', (event) => {
      const clickedmore = event.currentTarget;
      const serverclickmore = clickedmore.closest('div').querySelector('.server-div');
      
      if (clickedmore.dataset.status === 'show') {
        clickedmore.dataset.status = 'hide';
        serverclickmore.style.display = 'none';
      } else {
        clickedmore.dataset.status = 'show';
        serverclickmore.style.display = 'block';
      }
    });
  }

  const botdiv = document.createElement('div');
  botdiv.className = 'bot-div';
  botdiv.textContent = username;
  botdiv.dataset.username = username;
  botdiv.dataset.host = host;
  botdiv.dataset.port = port;

  if (document.getElementById('auto-select').checked) {
    botdiv.dataset.status = 'active';
  } else {
    botdiv.dataset.status = 'inactive';
  }

  botdiv.addEventListener('click', () => {
    botdiv.dataset.status = botdiv.dataset.status === 'inactive' ? 'active' : 'inactive';
    updateselectedbots();
  });

  serverdiv.querySelector('.server-div').appendChild(botdiv);

  botcount++;
  updatebotcount();
  updateselectedbots();
}

function removebotfromlist(username, host, port) {
  const botlist = document.getElementById('bot-list');

  const serverdiv = Array.from(botlist.children).find(div => {
    const serverdivs = div.querySelector('.server-div');
    return serverdivs && serverdivs.dataset.host === `${host}:${port}`;
  });

  if (serverdiv) {
    const botdiv = Array.from(serverdiv.querySelectorAll('.bot-div')).find(div => 
      div.dataset.username === username &&
      div.dataset.host === host &&
      div.dataset.port === port
    );

    if (botdiv) {
      botdiv.remove();

      if (serverdiv.querySelectorAll('.bot-div').length === 0) {
        serverdiv.remove();
      }

      botcount--;
      updatebotcount();
      updateselectedbots();
    }
  }
}

document.getElementById('select-button').addEventListener('click', () => {
  const allbots = document.querySelectorAll('.bot-div');
  const activebots = document.querySelectorAll('.bot-div[data-status="active"]');
  const selectall = activebots.length < allbots.length;

  allbots.forEach(bot => {
    bot.dataset.status = selectall ? 'active' : 'inactive';
  });

  updateselectedbots();
});

function updateselectedbots() {
  const selectedbots = Array.from(document.querySelectorAll('.bot-div[data-status="active"]'))
    .map(bot => ({
      username: bot.dataset.username,
      host: bot.dataset.host,
      port: bot.dataset.port
    }));
    return selectedbots
}

function showsection(sectionid) {

  const allsections = document.querySelectorAll(".page-section");
  for (const section of allsections) {
    section.style.display = "none";
  }

  const selectedSection = document.getElementById(sectionid);
  selectedSection.style.display = "block";
  const buttons = document.getElementsByClassName("nav-button");
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove("active-button");
  }

  const selectedButton = document.querySelector(`button[onclick="showsection('${sectionid}')"]`);
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

const antispamtype = document.getElementById('anti-spam-type')
const antispamchars = document.getElementById('anti-spam-chars')

antispamtype.addEventListener('change', function() {
  switch (antispamtype.value) {
      case 'as-all':
          antispamchars.readOnly = true
          antispamchars.value = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
          break
      case 'as-number':
          antispamchars.readOnly = true
          antispamchars.value = "0123456789";
          break
      case 'as-letter':
          antispamchars.readOnly = true
          antispamchars.value = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
          break
      case 'as-uppercase':
          antispamchars.readOnly = true
          antispamchars.value = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
          break
      case 'as-lowercase':
          antispamchars.readOnly = true
          antispamchars.value = "abcdefghijklmnopqrstuvwxyz";
          break
      case 'as-custom':
          antispamchars.readOnly = false
          antispamchars.value = ''
          break
      default:
          antispamchars.readOnly = true
          antispamchars.value = "";
  }       
})

function showextentions(extensionsid) {
  const allextensionpage = document.querySelectorAll(".extension-page");
  const extensionbuttons = document.querySelectorAll(".extension-button");

  extensionbuttons.forEach(button => {
    button.classList.remove("extension-button-selected");
  });

  const selectextensionbutton = document.querySelector(`button[onclick="showextentions('${extensionsid}')"]`);
  if (selectextensionbutton) {
    selectextensionbutton.classList.add("extension-button-selected");
  }

  allextensionpage.forEach((section) => {
    section.style.display = "none";
    section.classList.remove("open-extension");
  });

  if (extensionsid) {
    const selectextension = document.getElementById(extensionsid);
    if (selectextension) {
      selectextension.style.display = "block";
      selectextension.classList.add("open-extension");
    }
  }
}

const proxyfile = document.getElementById('proxy-file');
const proxyfilepath = document.getElementById('proxy-file-path');
proxyfile.addEventListener("change", function() {
    if (proxyfile.files.length > 0) {
        proxyfilepath.textContent = proxyfile.files[0].path;
    } else {
      proxyfilepath.textContent = `No file choose`
    }
});

