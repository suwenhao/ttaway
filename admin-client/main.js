const { app, BrowserWindow } = require('electron')
// let path = require('path')
const pkg = require('./package.json') 
// let url = require('url').format({
//   protocol: 'file',
//   slashes: true,
//   pathname: require('path').join(__dirname, './build/index.html')
// })

let mainWindow;

function createWindow() {
  
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 768,
    // webPreferences: {
    //   preload: path.join(__dirname, 'preload.js')
    // }
  })

  if (pkg.DEV) {
    mainWindow.loadURL('http://localhost:8089/')
  } else {
    // console.log(`file://${__dirname}\\build\\index.html`)
    mainWindow.loadURL(`file://${__dirname}\\build\\index.html`)
  }
  mainWindow.on('closed', function () {
    
    mainWindow = null
  })
}


app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  if (mainWindow === null) createWindow()
})
