// Modules to control application life and create native browser window
const { app, BrowserWindow, BrowserView, globalShortcut } = require('electron')
const path = require('path')

let terminal;
let tab;

const launch = () => {
  let bw = new BrowserWindow({
    titleBarStyle: 'hiddenInset',
    width: 800,
    height: 800
  })

  // and load the index.html of the app.
  bw.loadFile('main.html')

  terminal = new BrowserView({ modal: true })
  bw.setBrowserView(terminal)
  terminal.setBounds({ x: 0, y: 35, width: 800, height: 765 })
  terminal.setAutoResize({ width: true, height: true })
  terminal.webContents.loadFile('terminal.html')
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  launch()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      launch()
      // post welcome message
    }
  })
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
