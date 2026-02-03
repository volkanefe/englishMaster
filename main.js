const { app, BrowserWindow, ipcMain } = require("electron");
const { exec } = require("child_process");
const path = require("path");

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 635,
    resizable: true,
    maximizable: true,
    fullscreenable: false,
    title: "English Master",
    webPreferences: {
      preload: path.join(__dirname, "preload.js")
    }
  });

  win.loadFile("index.html");
}

ipcMain.handle("speak-native", (_, text) => {
  if (!text) return;

  if (process.platform === "darwin") {
    // Alex = macOS American English voice
    exec(`say -v Alex "${text.replace(/"/g, "")}"`);
  }
});

app.whenReady().then(createWindow);