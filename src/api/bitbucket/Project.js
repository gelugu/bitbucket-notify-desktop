const getClient = require("./BitbucketClient")
const Repo = require("./Repo")

class Project {
  constructor(res) {
    this.description = res["description"]
    this.id = res["id"]
    this.key = res["key"]
    this.links = res["links"]
    this.name = res["name"]
    this.public = res["public"]
    this.type = res["type"]

    this.peros = []
  }

  async getRepos() {
    const repos = await Repo.getRepos(this.key)
    this.repos = repos

    return repos
  }

  static async getProjects() {
    const client = getClient()
    const res = await client.projects.get()
  
    try {
      return res["values"].map(value => new Project(value))
    } catch {
      return []
    }
  }
}

module.exports = Project
