const header = document.createElement("h2")

header.className = "header"

const createHeader = (text) => {
  header.innerText = text

  return header
}

module.exports = createHeader
