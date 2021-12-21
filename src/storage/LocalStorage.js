const LS = require("node-localstorage").LocalStorage;

const log = require("../logger/Logger");

class LocalStorage {
  constructor() {
    this.localStorage = new LS("lsfile");
    this.defaultFrequency = 120;
  }
  KEYS = Object.freeze({
    BITBUCKET_URL: "bitbucketurl",
    USERNAME: "username",
    PASSWORD: "password",
    FREQUENCY: "frequency",
    LAST_NOTIFICATION: "lastnotification",
    CURRENT_TIMER_ID: "currenttimerid",
  });

  getBitbucketUrl() {
    return this.getFromLocalStorage(this.KEYS.BITBUCKET_URL);
  }
  setBitbucketUrl(value) {
    return this.setToLocalStorage(this.KEYS.BITBUCKET_URL, value);
  }

  getUsername() {
    return this.getFromLocalStorage(this.KEYS.USERNAME);
  }
  setUsername(value) {
    return this.setToLocalStorage(this.KEYS.USERNAME, value);
  }

  getPassword() {
    return atob(this.getFromLocalStorage(this.KEYS.PASSWORD));
  }
  setPassword(value) {
    return this.setToLocalStorage(this.KEYS.PASSWORD, btoa(value));
  }

  getNotificationsFrequency() {
    const frequency = parseInt(this.getFromLocalStorage(this.KEYS.FREQUENCY));

    if (isNaN(frequency)) {
      log.error("Can't find notification freqquency");
      return this.defaultFrequency;
    }

    return frequency;
  }
  setNotificationsFrequency(value) {
    return this.setToLocalStorage(this.KEYS.FREQUENCY, value);
  }

  getLastNotification() {
    try {
      return JSON.parse(this.getFromLocalStorage(this.KEYS.LAST_NOTIFICATION));
    } catch (e) {
      log.warn("Can't find last notification", e);
      return [];
    }
  }
  setLastNotification(value) {
    return this.setToLocalStorage(
      this.KEYS.LAST_NOTIFICATION,
      JSON.stringify(value)
    );
  }

  getCurrentTimerId() {
    return parseInt(this.getFromLocalStorage(this.KEYS.CURRENT_TIMER_ID));
  }
  setCurrentTimerId(value) {
    return this.setToLocalStorage(this.KEYS.CURRENT_TIMER_ID, value);
  }

  getFromLocalStorage(key) {
    try {
      return this.localStorage.getItem(key);
    } catch (e) {
      log.info("Can't find", key, e);
      return "";
    }
  }
  setToLocalStorage(key, value) {
    try {
      this.localStorage.setItem(key, value);
    } catch (e) {
      log.info("Can't write", key, value, e);
      return "";
    }
  }
}

const ls = new LocalStorage()

module.exports = ls;
