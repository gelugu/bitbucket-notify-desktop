const Client = require("bitbucket-server-nodejs").Client;

const log = require("../../logger/Logger");
const ls = require("../../storage/LocalStorage");

const API_URI = "rest/api/1.0";

const getNewClient = () => {
  const url = ls.getBitbucketUrl();
  const user = ls.getUsername();
  const pass = ls.getPassword();

  const auth = {
    type: "basic",
    username: user,
    password: pass,
  };

  try {
    return new Client(`${url}/${API_URI}`, auth);
  } catch (e) {
    log.warn("Can't autorize", e);
    return new Client(`${url}/${API_URI}`);
  }
};

module.exports = getNewClient;
