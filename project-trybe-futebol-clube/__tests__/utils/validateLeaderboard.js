const { URL } = require('./urls');
const { puppeteerDefs} = require('../config/constants');
const { normalizeString } = require('./util');
const waitForResponse = require('./waitForResponse');

const validateLeaderboardHeader = async (leaderboardTestsIds, page) => {
  const { table: { header } } = leaderboardTestsIds;

  await page.waitForSelector('[data-testid="score_boarding__classification"]');

  const scoreBoardTableHeaderMock = ['Classificação', 'Time', 'P', 'J', 'V', 'E', 'D', 'GP', 'GC', 'SG', '%'];

  const classification = await page.$eval(header.classification, (el) => el.innerText);
  const teamName = await page.$eval(header.teamName, (el) => el.innerText);
  const totalPoints = await page.$eval(header.totalPoints, (el) => el.innerText);
  const totalGames = await page.$eval(header.totalGames, (el) => el.innerText);
  const totalVictories = await page.$eval(header.totalVictories, (el) => el.innerText);
  const totalDraws = await page.$eval(header.totalDraws, (el) => el.innerText);
  const totalLosses = await page.$eval(header.totalLosses, (el) => el.innerText);
  const goalsFavor = await page.$eval(header.goalsFavor, (el) => el.innerText);
  const goalsOwn = await page.$eval(header.goalsOwn, (el) => el.innerText);
  const goalsBalance = await page.$eval(header.goalsBalance, (el) => el.innerText);
  const efficiency = await page.$eval(header.efficiency, (el) => el.innerText);

  expect(classification).toEqual(scoreBoardTableHeaderMock[0]);
  expect(teamName).toEqual(scoreBoardTableHeaderMock[1]);
  expect(totalPoints).toEqual(scoreBoardTableHeaderMock[2]);
  expect(totalGames).toEqual(scoreBoardTableHeaderMock[3]);
  expect(totalVictories).toEqual(scoreBoardTableHeaderMock[4]);
  expect(totalDraws).toEqual(scoreBoardTableHeaderMock[5]);
  expect(totalLosses).toEqual(scoreBoardTableHeaderMock[6]);
  expect(goalsFavor).toEqual(scoreBoardTableHeaderMock[7]);
  expect(goalsOwn).toEqual(scoreBoardTableHeaderMock[8]);
  expect(goalsBalance).toEqual(scoreBoardTableHeaderMock[9]);
  expect(+efficiency).toBeCloseTo(+scoreBoardTableHeaderMock[10], 1);
};

const validateLeaderboardBody = async (scoreBoardTableBodyMock, leaderboardTestsIds, page, apiPort, endpoint, actionTrigger) => {
  await page.waitForTimeout(puppeteerDefs.pause.brief);


  const { body: scoreBoardTableResponse } = await waitForResponse({
    page,
    trigger: () => actionTrigger(),
    expectedRequestType: 'script',
    expectedRequestMethod: 'GET',
    expectedResponseStatus: 200,
    expectedResponseUrl: `${URL(apiPort).BASE_URL}${endpoint}`
  });
  const newScoreBoardTableResponse = normalizeString(scoreBoardTableResponse)

  expect(newScoreBoardTableResponse.length).toEqual(scoreBoardTableBodyMock.length);

  const teams = scoreBoardTableBodyMock.map((el, index) => ({ id: `${index + 1}`, ...el }));

  const { table: { body } } = leaderboardTestsIds;

  for (const team of teams) {
    await page.waitForTimeout(puppeteerDefs.pause.brief);

    const teamId = await page.$eval(body.classification(team.id), (el) => el.innerText);
    const teamName = await page.$eval(body.teamName(team.id), (el) => el.innerText);
    const teamPoints = await page.$eval(body.totalPoints(team.id), (el) => el.innerText);
    const teamGames = await page.$eval(body.totalGames(team.id), (el) => el.innerText);
    const teamVictories = await page.$eval(body.totalVictories(team.id), (el) => el.innerText);
    const teamDraws = await page.$eval(body.totalDraws(team.id), (el) => el.innerText);
    const teamLooses = await page.$eval(body.totalLosses(team.id), (el) => el.innerText);
    const teamGoalsFavor = await page.$eval(body.goalsFavor(team.id), (el) => el.innerText);
    const teamGoalsOwn = await page.$eval(body.goalsOwn(team.id), (el) => el.innerText);
    const teamGoalsBalance = await page.$eval(body.goalsBalance(team.id), (el) => el.innerText);
    const teamEfficiency = await page.$eval(body.efficiency(team.id), (el) => el.innerText);

    expect(teamId).toEqual(team.id);
    expect(teamName).toEqual(team.name);
    expect(teamPoints).toEqual(team.totalPoints);
    expect(teamGames).toEqual(team.totalGames);
    expect(teamVictories).toEqual(team.totalVictories);
    expect(teamDraws).toEqual(team.totalDraws);
    expect(teamLooses).toEqual(team.totalLosses);
    expect(teamGoalsFavor).toEqual(team.goalsFavor);
    expect(teamGoalsOwn).toEqual(team.goalsOwn);
    expect(teamGoalsBalance).toEqual(team.goalsBalance);
    expect(+teamEfficiency).toBeCloseTo(+team.efficiency, 1);
  }
};

module.exports = {
  validateLeaderboardHeader,
  validateLeaderboardBody,
};
