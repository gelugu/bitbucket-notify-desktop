const User = require("./User")

class Reviewer {
  constructor(res) {
    this.approved = res["approved"]
    this.role = res["role"]
    this.status = res["status"]
    this.user = new User(res["user"])
  }
}

module.exports = Reviewer
