const { puppeteerDefs } = require('../config/constants');
const { pageMatches } = require('./dataTestIds');

const validateMatches = async (page, optionShowFinishMatch, expectedResult, isAdmin) => {
  await page.waitForTimeout(puppeteerDefs.pause.brief);

  await page.select(pageMatches.optionShowFinishMatch, optionShowFinishMatch);
  const searchMatchesBtn = await page.$(pageMatches.searchMatchesBtn);
  await searchMatchesBtn.click();

  await page.waitForTimeout(puppeteerDefs.pause.brief);

  const homeTeams = await page.$$('[data-testid^=matches__home_team_goals]');
  expect(homeTeams.length).toEqual(expectedResult.length);

  for (const matches of expectedResult) {
    await page.waitForTimeout(puppeteerDefs.pause.brief);

    const homeTeam = await page.$eval(pageMatches.homeTeam(matches.id), (el) => el.innerText);
    const homeTeamGoals = await page.$eval(pageMatches.homeTeamGoals(matches.id), (el) => el.innerText);
    const awayTeam = await page.$eval(pageMatches.awayTeam(matches.id), (el) => el.innerText);
    const awayTeamGoals = await page.$eval(pageMatches.awayTeamGoals(matches.id), (el) => el.innerText);
    const matchStatus = await page.$eval(pageMatches.matchStatus(matches.id), (el) => el.innerText);

    expect(homeTeam).toEqual(matches.home_team);
    expect(homeTeamGoals).toEqual(matches.home_team_goals);
    expect(awayTeam).toEqual(matches.away_team);
    expect(awayTeamGoals).toEqual(matches.away_team_goals);

    if (matches.in_progress) {
      expect(matchStatus).toEqual('Em andamento');
    } else {
      expect(matchStatus).toEqual('Finalizado');
    }

    if (isAdmin) {
      const matchStatusBtn = await page.$eval(pageMatches.matchStatusBtn(matches.id), (el) => el.disabled);

      if (matches.in_progress) {
        expect(matchStatusBtn).toEqual(false);
      } else {
        expect(matchStatusBtn).toEqual(true);
      }
    }
  }
};

module.exports = {
  validateMatches,
};