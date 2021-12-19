const getClient = require("./BitbucketClient")

class Repo {
  constructor(res) {
    this.description = res["description"]
    this.forkable = res["forkable"]
    this.hierarchyId = res["hierarchyId"]
    this.id = res["id"]
    this.links = res["links"]
    this.name = res["name"]
    this.projectdescription = res["projectdescription"]
    this.public = res["public"]
    this.scmId = res["scmId"]
    this.slug = res["slug"]
    this.state = res["state"]
    this.statusMessage = res["statusMessage"]
  }

  static async getRepos(projectKey) {
    const client = getClient()
    const res = await client.repos.get(projectKey)

    try {
      const values = res["values"]

      return values.map(value => new Repo(value))
    } catch {
      return []
    }
  }
}

module.exports = Repo
