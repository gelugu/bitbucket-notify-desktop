const createInput = require("../components/InputNumber")
const checkPullRequests = require("../notifications/notifications")

const createNotifications = () => {
  const content = document.getElementById("content")
  content.innerHTML = ""

  const input = createInput("Notifications freqency (minuts):", "notificationsFreqency", checkPullRequests)
  content.appendChild(input)
}

module.exports = createNotifications
