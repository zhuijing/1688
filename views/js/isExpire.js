 // 加载 electron的模块
 const { remote, ipcRenderer } = require('electron');
 if(Date.now() > 1560911923022) {
   alert('软件已过期')
   setTimeout(() => {
     ipcRenderer.send('close')
   }, 6000);
 }