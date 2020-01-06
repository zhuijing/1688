const { app, BrowserWindow, ipcMain, Notification } = require('electron');
const loadimg1688 = require('./task/loadimg1688');
const loadimgAmazon = require('./task/loadimgAmazon');

// 在主进程中
global.sharedObject = {
  someProperty: '曹泽鹏'
}
let win = null;
ipcMain.on('download1688',function(event, args) {
  loadimg1688(args)
})
ipcMain.on('loadimgAmazon',function(event, args) {
  loadimgAmazon(args)
})

ipcMain.on('close',function(){
  win.close()
})

function createWindow () {   
  // 创建浏览器窗口
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // 加载index.html文件
  win.loadFile('index.html')
  // 打开开发者工具
  win.webContents.openDevTools()
  // 当 window 被关闭，这个事件会被触发。
  win.on('closed', () => {
    // 取消引用 window 对象，如果你的应用支持多窗口的话，
    // 通常会把多个 window 对象存放在一个数组里面，
    // 与此同时，你应该删除相应的元素。
    win = null
  })
}

app.on('ready', createWindow)
