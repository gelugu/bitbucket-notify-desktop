const Client = require('bitbucket-server-nodejs').Client;

const getNewClient = () => {
  const url = localStorage.getItem("serverUrl")
  const user = localStorage.getItem("username")
  const pass = atob(localStorage.getItem("password"))

  const auth = {
    "type": "basic",
    "username": user,
    "password": pass
  };

  return new Client(`${url}/rest/api/1.0`, auth);
}

module.exports = getNewClient;
