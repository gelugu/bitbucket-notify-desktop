const setupMenu = require("../components/Menu")
const checkPullRequests = require("../notifications/notifications")

window.addEventListener("DOMContentLoaded", async () => {
  process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

  setupMenu()

  localStorage.setItem("lastNotifications", "")

  checkPullRequests();
});
