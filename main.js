const { app, BrowserWindow, ipcMain } = require('electron')

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 1200,
        height: 600,
        resizable: false,
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: false,
        }
    })

    mainWindow.loadFile('./src/index.html')
    // mainWindow.webContents.openDevTools()

    ipcMain.on('add-bot', (event, botdata) => {
        mainWindow.webContents.send('add-bot', botdata);
    });
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

ipcMain.on('close-app', () => {
    app.quit();
});

ipcMain.on('minimal-app', () => {
    app.hide()
})

let addbottab;

ipcMain.on('open-add-bot', () => {
    if (addbottab) {
        addbottab.show();
    } else {
        addbottab = new BrowserWindow({
            width: 800,
            height: 400,
            frame: false,
            webPreferences: {
                contextIsolation: false,
                enableRemoteModule: true,
                nodeIntegration: true
            }
        });
    }

    addbottab.loadFile('./src/assets/addbot.html');

    // addbottab.webContents.openDevTools()

    addbottab.on('closed', () => {
        addbottab = null;
    });

    addbottab.on('close', (event) => {
        event.preventDefault();
        addbottab.hide();
    });
});

ipcMain.on('close-addbot', () => {
    addbottab.close();
});

ipcMain.on('minimal-addbot', () => {
    addbottab.hide();
});