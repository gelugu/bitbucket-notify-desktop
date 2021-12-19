const setupMenu = require("../components/Menu");
const checkPullRequests = require("../notifications/notifications");
const ls = require("../storage/LocalStorage");

window.addEventListener("DOMContentLoaded", async () => {
  process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

  setupMenu();

  ls.setLastNotification("");

  checkPullRequests();
});
