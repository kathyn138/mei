const { app, BrowserWindow, globalShortcut } = require('electron');
const path = require('path')

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600, 
    // transparent: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  win.loadFile('index.html');
}

// when app is ready,
// open your window
app.whenReady().then(() => {
  createWindow();

  // for macs
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

  const regCopy = globalShortcut.register('CommandOrControl+C', () => {
    console.log('CommandOrControl+C is pressed');
  });

  const regPaste = globalShortcut.register('CommandOrControl+V', () => {
    console.log('CommandOrControl+V is pressed');
  });

  if (!regCopy || !regPaste) {
    console.log('registration failed')
  }

  // Check whether a shortcut is registered.
  // console.log(globalShortcut.isRegistered('CommandOrControl+X'))
})

// quit app when all windows are closed
// for windows and linux
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
})
