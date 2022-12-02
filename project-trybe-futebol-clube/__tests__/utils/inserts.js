const { URL } = require('./urls');
const { pageMatchSettings, header, pageMatches } = require('../utils/dataTestIds');
const { logAdmin } = require('../utils/logInto');
const { teams } = require('../expected_results/trybe_football_club');
const { puppeteerDefs, containerPorts } = require('../config/constants');
const waitForResponse = require('../utils/waitForResponse');
const puppeteer = require('puppeteer');
const { delay } = require('./util');

/**
 * @param {puppeteer.page} page
 * @param {{homeTeam: String, awayTeam:string, homeGoals:Number, awayGoals:number}} DadosInsert
 * @param {expectedResponseStatus: Number} expectedResponseStatus
 * @returns {Promise<{ id: number, homeTeam: number, homeTeamGoals: number,  awayTeam: number, awayTeamGoals: number, inProgress: boolean } | {message: string}>}
 */
const insertInProgress = async (page, { homeTeam = 'Corinthians', awayTeam = 'internacional', homeGoals = 2 , awayGoals = 1 }, expectedResponseStatus = 201) => {
  await page.waitForTimeout(puppeteerDefs.pause.brief);

  const headerButtonLogin = await page.$(header.loginButton);
  await headerButtonLogin.click();

  await page.waitForTimeout(puppeteerDefs.pause.brief);

  await logAdmin(page, containerPorts.frontend);

  await page.waitForTimeout(puppeteerDefs.pause.brief);

  const addNewMatchButton = await page.$(pageMatches.addNewMatchButton);
  addNewMatchButton.click();

  await page.waitForTimeout(puppeteerDefs.pause.brief);

  await page.select(pageMatchSettings.selectHomeTeam, homeTeam);

  await page.select(pageMatchSettings.selectAwayTeam, awayTeam);

  const selectQuantityGoalsHomeTeam = await page.$(
    pageMatchSettings.selectQuantityGoalsHomeTeam,
  );
  await selectQuantityGoalsHomeTeam.type(homeGoals.toString());

  const selectQuantityGoalsAwayTeam = await page.$(
    pageMatchSettings.selectQuantityGoalsAwayTeam,
  );
  await selectQuantityGoalsAwayTeam.type(awayGoals.toString());
  await page.waitForTimeout(puppeteerDefs.pause.brief);

  const saveMatchButton = await page.$(pageMatchSettings.saveMatchButton);

  const { body } = await waitForResponse({
    page,
    trigger: () => saveMatchButton.click(),
    expectedRequestType: 'script',
    expectedRequestMethod: 'POST',
    expectedResponseStatus,
    expectedResponseUrl: `${URL(containerPorts.backend).BASE_URL}/matches`
  });

  await page.waitForTimeout(puppeteerDefs.pause.brief);

  return body
}

/**
 *
 * @param {puppeteer.page} page
 * @param {{homeTeam: String, awayTeam:string, homeGoals:Number, awayGoals:number}} DadosInsert
 * @returns {Promise<{ id: number, homeTeam: number, homeTeamGoals: number,  awayTeam: number, awayTeamGoals: number, inProgress: boolean } | {message: string}>}
 */
const insertFinished = async (page, { homeTeam = 'Corinthians', awayTeam = 'internacional', homeGoals = 2 , awayGoals = 1 }) => {

  const match = await insertInProgress(page, {homeTeam, awayTeam, homeGoals, awayGoals})
  const finishMatchButton = await page.$(pageMatchSettings.finishMatchButton);

  const { body } = await waitForResponse({
    page,
    trigger: () => finishMatchButton.click(),
    expectedRequestType: 'script',
    expectedRequestMethod: 'PATCH',
    expectedResponseStatus: 200,
    expectedResponseUrl: `${URL(containerPorts.backend).BASE_URL}/matches/${match.id}/finish`
  });
  await page.waitForTimeout(puppeteerDefs.pause.brief);
  return body
}

module.exports = {
  insertInProgress,
  insertFinished
}
