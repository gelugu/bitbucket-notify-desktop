class User {
  constructor(res) {
    this.active = res["active"]
    this.displayName = res["displayName"]
    this.emailAddress = res["emailAddress"]
    this.id = res["id"]
    this.links = res["links"]
    this.name = res["name"]
    this.slug = res["slug"]
    this.type = res["type"]
  }
}

module.exports = User
