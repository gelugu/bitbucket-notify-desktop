const input = require("../components/Input")

const createAuth = () => {
  const content = document.getElementById("content")
  content.innerHTML = ""

  content.appendChild(input("Server URL:", "serverUrl"))
  content.appendChild(input("Username:", "username"))
  content.appendChild(input("Password:", "password", true))
}

module.exports = createAuth
