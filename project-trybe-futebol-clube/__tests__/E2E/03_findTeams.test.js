const { URL } = require('../utils/urls');
const { initBrowser, termBrowser } = require('../config/puppeteer');
const { initSequelize, termSequelize } = require('../config/sequelize');
const { containerPorts } = require('../config/constants');
const { getRequirement } = require('../utils/util');
const axios = require('axios').default;

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


describe(getRequirement(15), () => {
  it('O avaliador verificará se tentar fazer a requisição correta na sua API, os dados corretos são retornados', async () => {
    const expectedResult = [
      {
        "id": 1,
        "teamName": "Avaí/Kindermann"
      },
      {
        "id": 2,
        "teamName": "Bahia"
      },
      {
        "id": 3,
        "teamName": "Botafogo"
      },
      {
        "id": 4,
        "teamName": "Corinthians"
      },
      {
        "id": 5,
        "teamName": "Cruzeiro"
      },
      {
        "id": 6,
        "teamName": "Ferroviária"
      },
      {
        "id": 7,
        "teamName": "Flamengo"
      },
      {
        "id": 8,
        "teamName": "Grêmio"
      },
      {
        "id": 9,
        "teamName": "Internacional"
      },
      {
        "id": 10,
        "teamName": "Minas Brasília"
      },
      {
        "id": 11,
        "teamName": "Napoli-SC"
      },
      {
        "id": 12,
        "teamName": "Palmeiras"
      },
      {
        "id": 13,
        "teamName": "Real Brasília"
      },
      {
        "id": 14,
        "teamName": "Santos"
      },
      {
        "id": 15,
        "teamName": "São José-SP"
      },
      {
        "id": 16,
        "teamName": "São Paulo"
      }
    ];

    const result = await axios
      .get(
        `${URL(containerPorts.backend).BASE_URL}/teams`,
      )
      .then(({ status, data }) => ({ status, data }))
      .catch(({ response: { status, data } }) => ({ status, data }));

    expect(result).toHaveProperty("status");
    expect(result).toHaveProperty("data");
    expect(result.status).toBe(200);
    expect(result.data).toMatchObject(expectedResult);
  });
});

describe(getRequirement(16), () => {
  it('O avaliador verificará se tentar fazer a requisição correta na sua API, os dados corretos são retornados', async () => {
    const expectedResult = {
      "id": 5,
      "teamName": "Cruzeiro"
    };

    const result = await axios
      .get(
        `${URL(containerPorts.backend).BASE_URL}/teams/5`,
      )
      .then(({ status, data }) => ({ status, data }))
      .catch(({ response: { status, data } }) => ({ status, data }));

    expect(result).toHaveProperty("status");
    expect(result).toHaveProperty("data");
    expect(result.status).toBe(200);
    expect(result.data).toMatchObject(expectedResult);
  });
});