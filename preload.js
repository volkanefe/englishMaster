const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  speakNative: (text) => ipcRenderer.invoke('speak-native', text)
});