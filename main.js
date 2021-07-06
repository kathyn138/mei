const { app, BrowserWindow } = require('electron');
const path = require('path')

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600, 
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

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// quit app when all windows are closed
// for windows and linux
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
})
