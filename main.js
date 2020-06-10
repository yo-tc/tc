// Modules to control application life and create native browser window
const { app, BrowserWindow, BrowserView } = require('electron')
const path = require('path')

let main;
let terminal;
let tab;
let tabs = {};

const newview = (url = 'https://google.com') => {
  let view = new BrowserView()
  main.addBrowserView(view)
  view.setBounds({ x: 0, y: 100, width: 800, height: 700 })
  view.setAutoResize({ width: true })
  view.webContents.loadURL(url)
  tabs[url] = view

  return view
}

const launch = () => {
  let bw = new BrowserWindow({
    titleBarStyle: 'hiddenInset',
    width: 800,
    height: 800,
    webPreferences: {
      webviewTag: true,
      nativeWindowOpen: true
    }
  })

  bw.loadFile('main.html')

  // NOTE:
  // browse mode:
  // - terminal has .x = 0, .y = 40, .width = 800, .height = 60
  // - tab has .x = 0, .y = 100, .width = 800, .height = 700
  // terminal mode:
  // - terminal has .x = 0, .y = 40, .width = 800, .height = 760
  // - tab is undefined
  terminal = new BrowserView()
  bw.addBrowserView(terminal)
  terminal.setBounds({ x: 0, y: 40, width: 800, height: 760 })
  terminal.setAutoResize({ width: true, height: true })
  terminal.webContents.loadFile('terminal.html')

  terminal.webContents.on('new-window', (event, url, frameName, disposition, options, additionalFeatures) => {
    event.preventDefault()
    if (frameName == 'open') {
      terminal.setBounds({ x: 0, y: 40, width: 800, height: 60 })
      tab = newview(url)
    } else if (frameName == 'goto') {
      tab.webContents.loadURL(url)
    } else if (frameName == 'close') {
      terminal.setBounds({ x: 0, y: 40, width: 800, height: 760 })
      tab.destroy()
    } else if (frameName == 'switch') {
      tab = tabs[url]
    } else if (frameName == 'back') {
      tab.webContents.goBack()
    } else if (frameName == 'forward') {
      tab.webContents.goForward()
    }
  })

  return bw

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  main = launch()

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
