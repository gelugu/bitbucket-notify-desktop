const setupMenu = require("../components/Menu");
const checkPullRequests = require("../notifications/notifications");
const ls = require("../storage/LocalStorage");

window.addEventListener("DOMContentLoaded", async () => {
  setupMenu();
});
