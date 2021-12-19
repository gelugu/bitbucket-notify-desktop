const { shell } = require("electron");
const _ = require("lodash");

const ls = require("../storage/LocalStorage");
const PullRequest = require("../api/bitbucket/PullRequest");

const checkNotifications = async () => {
  const pullRequests = await PullRequest.getUnreviewed();

  const pullRequestsIds = pullRequests.map((pr) => `${pr.repository}/${pr.id}`);
  const isEquals = _.isEqual(pullRequestsIds, ls.getLastNotification());

  if (pullRequests.length && !isEquals) {
    triggerNotifications(pullRequests);
  }

  ls.setLastNotification(pullRequestsIds);

  clearTimeout(ls.getCurrentTimerId());

  const timeoutId = setTimeout(
    checkNotifications,
    ls.getNotificationsFrequency()
  );

  ls.setCurrentTimerId(timeoutId);
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
      const url = ls.getBitbucketUrl();
      const username = ls.getUsername();
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
