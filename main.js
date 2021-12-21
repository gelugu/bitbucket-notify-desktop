const { app, BrowserWindow, Tray, Menu } = require("electron");
const path = require("path");
const checkPullRequests = require("./src/notifications/notifications");
const ls = require("./src/storage/LocalStorage");

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
  process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

  createWindow();

  ls.setLastNotification("");
  checkPullRequests();

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });

  const trayIcon = path.join(__dirname, "public/icons/bb_blue_16.png");
  tray = new Tray(trayIcon);
  const contextMenu = Menu.buildFromTemplate([
    {
      label: "settings",
      click() {
        createWindow();
      },
    },
    {
      label: "exit",
      click() {
        app.quit();
      },
    },
  ]);
  tray.setContextMenu(contextMenu);
});

app.on("window-all-closed", function () {});
