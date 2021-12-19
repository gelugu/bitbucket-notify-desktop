const createInput = require("../components/InputNumber")


const createNotifications = () => {
  const content = document.getElementById("content")
  content.innerHTML = ""

  const input = createInput("Notifications freqency (minuts):", "notificationsFreqency")
  content.appendChild(input)
}

module.exports = createNotifications
