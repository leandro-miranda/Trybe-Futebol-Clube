const { URL } = require('../utils/urls');
const { initBrowser, termBrowser } = require('../config/puppeteer');
const { header } = require('../utils/dataTestIds');
const { allMatches, onlyInProgress, onlyFinished } = require('../entities/matches');
const { validateMatches } = require('../utils/validateMatches');
const { initSequelize, termSequelize } = require('../config/sequelize');
const { puppeteerDefs, containerPorts } = require('../config/constants');
const { getRequirement } = require('../utils/util');
const axios = require('axios').default;

const IN_PROGRESS = 'Em andamento';
const FINISH = 'Finalizado';
const ALL_MATCHES = 'Todos os Jogos';

let database, browser, page;

beforeAll(async () => {
  database = await initSequelize();
});

afterAll(async () => termSequelize(database));

beforeEach(async () => {
  [browser, page] = await initBrowser();
  await page.goto(URL(containerPorts.frontend).BASE_URL);
});

afterEach(async () => {
  await termBrowser(browser);
});



describe(getRequirement(19), () => {
  it('Será validado que a página apresentará todos os dados de partidas sem nenhum filtro', async () => {
    await page.waitForTimeout(puppeteerDefs.pause.brief);

    const headerButtonShowMatches = await page.$(header.showMatchesButton);
    await headerButtonShowMatches.click();

    await page.waitForTimeout(puppeteerDefs.pause.brief);

    await validateMatches(page, ALL_MATCHES, allMatches, false);
  });
});

describe(getRequirement(20), () => {
  it('Será validado que ao escolher a opção de partidas em andamento será filtrado todas as partidas em andamento', async () => {
    await page.waitForTimeout(puppeteerDefs.pause.brief);

    const headerButtonShowMatches = await page.$(header.showMatchesButton);
    await headerButtonShowMatches.click();

    await page.waitForTimeout(puppeteerDefs.pause.brief);

    await validateMatches(page, IN_PROGRESS, onlyInProgress, false);
  });
});

describe(getRequirement(21), () => {
  it('Será validado que ao escolher a opção de partidas finalizadas será filtrado todas as partidas finalizadas', async () => {
    await page.waitForTimeout(puppeteerDefs.pause.brief);

    const headerButtonShowMatches = await page.$(header.showMatchesButton);
    await headerButtonShowMatches.click();

    await page.waitForTimeout(puppeteerDefs.pause.brief);

    await validateMatches(page, FINISH, onlyFinished, false);
  });
});
