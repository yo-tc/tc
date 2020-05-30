// Modules to control application life and create native browser window
const { app, BrowserWindow, BrowserView, globalShortcut } = require('electron')
const path = require('path')

let wrapper;
let terminal;
let tab;

const launch = () => {
  let bw = new BrowserWindow({
    titleBarStyle: 'hiddenInset',
    width: 800,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true
    }
  })

  const view = new BrowserView()
  bw.setBrowserView(view)
  view.setBounds({ x: 0, y: 100, width: 300, height: 300 })
  view.webContents.loadFile('terminal.html')

  // and load the index.html of the app.
  bw.loadFile('index.html')

  return bw
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
// app.on('enter', function() {
//   /*
//   read command -> parse command -> do command -> newline div
//   */
// })
// app.on('fn', function() {
//   /*
//     if window.view is null switch to tab
//     if window.view is tab switch to null
//   */
// })
