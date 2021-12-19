const { app, BrowserWindow, Tray, Menu } = require("electron");
const path = require("path");

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "src/render/preload.js"),
    },
  });

  mainWindow.loadFile("index.html");

  const menu = Menu.buildFromTemplate([
    {
      label: "file",
      submenu: [
        { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
        {
          label: "exit",
          accelerator: "CmdOrCtrl+Q",
          click() {
            app.quit();
          },
        },
      ],
    },
  ]);
  Menu.setApplicationMenu(menu);

  // mainWindow.webContents.openDevTools();
}

let tray = null;
app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });

  tray = new Tray(__dirname + "/public/icons/bb_blue_16.png");
  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Exit",
      click() {
        app.quit();
      },
    },
  ]);
  tray.setContextMenu(contextMenu);
});

// remove to quit from tray only
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});
