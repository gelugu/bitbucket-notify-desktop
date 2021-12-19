const input = require("../components/Input");
const ls = require("../storage/LocalStorage");

const createAuth = () => {
  const content = document.getElementById("content");
  content.innerHTML = "";

  content.appendChild(input("Server URL:", ls.KEYS.BITBUCKET_URL));
  content.appendChild(input("Username:", ls.KEYS.USERNAME));
  content.appendChild(input("Password:", ls.KEYS.PASSWORD, "password"));
};

module.exports = createAuth;
