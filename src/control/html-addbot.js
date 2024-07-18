const { ipcRenderer } = require('electron');

document.getElementById('close-button').addEventListener('click', () => {
  ipcRenderer.send('close-addbot');
});

document.getElementById('minimal-button').addEventListener('click', () => {
  ipcRenderer.send('minimal-addbot')
})

let namegentype = document.getElementById('name-generator');
let inputnamefile = document.getElementById('form-name-file');

let authtype = document.getElementById('auth-type')

namegentype.addEventListener('change', () => {
  if (namegentype.value === 'file') {
      inputnamefile.style.display = '';
  } else {
      inputnamefile.style.display = 'none';
  }
});

authtype.addEventListener('change', () => {
  if (authtype.value === 'microsoft') {
    document.getElementById('name-generator').setAttribute('disabled', true)
  } else {
    document.getElementById('name-generator').removeAttribute('disabled')
  }
})