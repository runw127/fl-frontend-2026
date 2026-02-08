const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
    // Platform information
    platform: process.platform,

    // Add any IPC methods you need here
    // Example:
    // sendMessage: (channel, data) => ipcRenderer.send(channel, data),
    // onMessage: (channel, callback) => ipcRenderer.on(channel, callback),
});

// Log when preload script runs
console.log('Electron preload script loaded');
