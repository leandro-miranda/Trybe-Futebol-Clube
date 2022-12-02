const { initSequelize, termSequelize, dbReset } = require('../config/sequelize');
const { users, teams, matches } = require('../expected_results/trybe_football_club');
const { select } = require('../utils/query');
const { normalize, getRequirement } = require('../utils/util');

let database;

beforeAll(async () => {
  database = await initSequelize();
});

afterAll(async () => termSequelize(database));

describe(getRequirement(1), () => {
  it('O avaliador consultará os dados da tabela users, verificando se ela contém os dados iniciais corretos', async () => {
    const resultQuery = await database.query(select.all.users, { type: 'SELECT' });
    const resultQueryNormalize = normalize(resultQuery);
    expect(resultQueryNormalize).toEqual(users);
  });
});

describe(getRequirement(14), () => {
  it('O avaliador consultará os dados da tabela teams, verificando se ela contém os dados iniciais corretos', async () => {
    const resultQuery = await database.query(select.all.teams, { type: 'SELECT' });
    const resultQueryNormalize = normalize(resultQuery);
    expect(resultQueryNormalize).toEqual(teams);
  });
});

describe(getRequirement(18), () => {
  it('O avaliador consultará os dados da tabela matches, verificando se ela contém os dados iniciais corretos', async () => {
    const resultQuery = await database.query(select.all.matches, { type: 'SELECT' });
    const resultQueryNormalize = normalize(resultQuery);
    expect(resultQueryNormalize).toEqual(matches);
  });
});
