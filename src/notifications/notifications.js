const { shell } = require("electron");
const _ = require("lodash");

const PullRequest = require("../api/bitbucket/PullRequest");

const checkNotifications = async () => {
  const pullRequests = await PullRequest.getUnreviewed();

  const pullRequestsIds = pullRequests.map((pr) => `${pr.repository}/${pr.id}`);
  let lastNotification = [];
  try {
    lastNotification = JSON.parse(localStorage.getItem("lastNotifications"));
  } catch {}
  const isEquals = _.isEqual(pullRequestsIds, lastNotification);

  if (pullRequests.length && !isEquals) {
    triggerNotifications(pullRequests);
  }

  localStorage.setItem("lastNotifications", JSON.stringify(pullRequestsIds));

  clearTimeout(parseInt(localStorage.getItem("currenttimoutId")));

  const frequency =
    parseInt(localStorage.getItem("notificationsFreqency")) * 600;
  const timeoutId = setTimeout(checkNotifications, frequency);

  localStorage.setItem("currenttimoutId", timeoutId);
};

const triggerNotifications = (pullRequests) => {
  const repositories = pullRequests
    .map((pr) => pr.repository)
    .filter((value, index, self) => {
      return self.indexOf(value) === index;
    });

  repositories.forEach((repo) => {
    const currents = pullRequests.filter((pr) => pr.repository == repo);
    notify(currents);
  });
};

const notify = async (pullRequests) => {
  if (Notification.permission === "granted") {
    const notification = new Notification(
      `You have ${pullRequests.length} unreviewed pull-requests`,
      { body: "Click to open in broweser" }
    );

    notification.onclick = () => {
      const url = localStorage.getItem("serverUrl");
      const username = localStorage.getItem("username");
      const location = pullRequests[0].repository.replace("/", "/repos/");
      shell.openExternal(
        `${url}/projects/${location}/pull-requests?state=OPEN&reviewer=${username}`
      );
    };
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission();
  }
};

module.exports = checkNotifications;
