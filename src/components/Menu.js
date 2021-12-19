const settingsElements = require("../render/settings");

const createList = (elements, className) => {
  const list = document.createElement("ul");
  list.className = className;

  elements.forEach((element) => {
    const li = document.createElement("li");
    li.className = `${className}-element`;

    li.appendChild(element);
    list.appendChild(li);
  });

  return list;
};

const setupMenu = () => {
  const menu = document.querySelector("#menu");
  const menuElements = [];
  for (let i = 0; i < Object.keys(settingsElements).length; i++) {
    const button = document.createElement("button");
    button.className = "menu-element";

    button.textContent = Object.keys(settingsElements)[i];
    button.onclick = Object.values(settingsElements)[i];

    menuElements.push(button);
  }
  menu.appendChild(createList(menuElements, "menu-list"));
  settingsElements.Auth();
};

module.exports = setupMenu;
