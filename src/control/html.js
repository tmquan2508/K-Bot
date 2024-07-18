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

