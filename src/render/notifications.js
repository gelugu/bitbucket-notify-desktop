const createInput = require("../components/Input");
const ls = require("../storage/LocalStorage");

const createNotifications = () => {
  const content = document.getElementById("content");
  content.innerHTML = "";

  const input = createInput(
    "Notifications freqency (minuts):",
    ls.KEYS.FREQUENCY,
    "number"
  );
  content.appendChild(input);
};

module.exports = createNotifications;
