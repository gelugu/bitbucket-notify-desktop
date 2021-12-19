const shell = require('electron').shell

const getClient = require("./BitbucketClient")
const Reviewer = require("./Reviewer")
const Repo = require("./Repo")

class PullRequest {
  constructor(res) {
    this.author = res["author"]
    this.closed = res["closed"]
    this.createdDate = res["createdDate"]
    this.fromRef = res["fromRef"]
    this.id = res["id"]
    this.links = res["links"]
    this.link = this.links["self"][0]["href"]
    this.locked = res["locked"]
    this.open = res["open"]
    this.participants = res["participants"]
    this.properties = res["properties"]
    this.reviewers = res["reviewers"].map(value => new Reviewer(value))
    this.state = res["state"]
    this.title = res["title"]
    this.toRef = res["toRef"]
    this.repository = `${this.toRef["repository"]["project"]["key"]}/${this.toRef["repository"]["slug"]}`
    this.updatedDate = res["updatedDate"]
    this.version = res["version"]
  }

  getPullRequestCard() {
    const div = document.createElement("div")
    div.className = "pull-request-card"
    div.onclick = () => {
      shell.openExternal(this.link)
    }

    const header = document.createElement("span")
    header.className = "pull-request-card-header"
    header.innerText = this.title

    const p = document.createElement("p")
    p.innerText = this.reviewers.join(", ")

    div.appendChild(header)
    div.appendChild(p)

    return div
  }

  static async getUnreviewed() {
    const prs = await this.getAll()

    return prs.filter(pr => {
      const username = localStorage.getItem("username")

      return pr.reviewers.find(reviewer => reviewer.user.name == username && !reviewer.approved)
    })
  }

  static async getAll() {
    const client = getClient()
    const res = await client.prs.getCombined()
  
    try {
      return res["values"].map(value => new PullRequest(value))
    } catch {
      return []
    }
  }
}

module.exports = PullRequest
