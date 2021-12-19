const createInput = (labelText, dataId, password = false, callback = () => {}) => {
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
  
  if (password) {
    input.type = "password"
    input.value = atob(localStorage.getItem(dataId)) || ""
    input.oninput = () => {
      localStorage.setItem(dataId, btoa(input.value))
      callback()
    };
  } else {
    input.type = "text";
    input.value = localStorage.getItem(dataId) || ""
    input.oninput = () => {
      localStorage.setItem(dataId, input.value)
      callback()
    };
  }

  wrapper.appendChild(label);
  wrapper.appendChild(input);

  return wrapper;
};

module.exports = createInput;
