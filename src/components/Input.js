const checkPullRequests = require("../notifications/notifications");
const ls = require("../storage/LocalStorage");

const createInput = (labelText, dataId, type = "text") => {
  const input = document.createElement("input");
  const label = document.createElement("label");
  const wrapper = document.createElement("div");

  input.className = "input";
  label.className = "input-label";
  wrapper.className = "input-wrapper";

  const id = (Math.random() + 1).toString(36).substring(7);

  label.innerText = labelText;
  label.htmlFor = id;

  input.id = id;
  input.type = type;
  input.value = ls.getFromLocalStorage(dataId);

  input.oninput = () => {
    if (type === "password") {
      ls.setToLocalStorage(dataId, btoa(input.value));
    } else {
      ls.setToLocalStorage(dataId, input.value);
    }
    checkPullRequests();
  };

  wrapper.appendChild(label);
  wrapper.appendChild(input);

  return wrapper;
};

module.exports = createInput;
