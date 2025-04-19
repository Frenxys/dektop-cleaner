// preload.js
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  cleanDesktop: () => ipcRenderer.invoke('clean-desktop')
});
