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
  botdiv.classList.add('inactive-bot');
  botdiv.dataset.status = 'inactive-bot';

  botdiv.addEventListener('click', () => {
    if (botdiv.dataset.status === 'inactive-bot') {
      botdiv.classList.remove('inactive-bot');
      botdiv.classList.add('active-bot');
      botdiv.dataset.status = 'active-bot';
    } else {
      botdiv.classList.remove('active-bot');
      botdiv.classList.add('inactive-bot');
      botdiv.dataset.status = 'inactive-bot';
    }
  });

  serverdiv.querySelector('.server-div').appendChild(botdiv);
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
});