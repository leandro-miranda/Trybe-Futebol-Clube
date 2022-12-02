const { puppeteerDefs } = require("../config/constants");

const URL = (PORT = 3000) => ({
  BASE_URL: `${puppeteerDefs.baseUrl}:${PORT}`,
  URL_PAGE_LOGIN: `${puppeteerDefs.baseUrl}:${PORT}/login`,
  URL_PAGE_MATCHES: `${puppeteerDefs.baseUrl}:${PORT}/matches`,
  URL_PAGE_MATCHES_SETTINGS: `${puppeteerDefs.baseUrl}:${PORT}/matches/settings`,
  URL_PAGE_LEADERBOARD: `${puppeteerDefs.baseUrl}:${PORT}/leaderboard`,
});

module.exports = {
  URL,
};
