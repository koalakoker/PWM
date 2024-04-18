const { app, BrowserWindow } = require("electron");
const path = require("path");
const childProcess = require("child_process");

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1216,
    height: 660,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true, // Enable Node.js integration in renderer process
    },
  });

  mainWindow.loadFile("index.html");

  // Open DevTools (remove this in production)
  //mainWindow.webContents.openDevTools();
}

app.whenReady().then(createWindow);

// Quit when all windows are closed, except on macOS
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// Event handler for when the app is activated (macOS)
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// Start the Node.js server as a child process
const serverProcess = childProcess.fork(
  path.join(__dirname, "server", "server.js")
);
