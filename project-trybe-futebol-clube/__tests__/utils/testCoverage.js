const { condExec } = require('./util');
const { docker } = require('../utils/commands');

const testCoverage = async (app) => {
  const testCommand = 'npm run test:coverage:json &> /dev/null';
  const validateCommand = 'cat ./coverage/coverage-summary.json';

  const { stdout } = await condExec({
    command: docker.exec(app, testCommand),
    validate: docker.exec(app, validateCommand),
    include: '{"total": {"lines":{"total"',
  });

  console
    .warn(`Rodando o comando '${testCommand}' na aplicação backend para gerar e colher a cobertura de testes com '${validateCommand}':\n\n`, JSON.parse(stdout || {}));

  const { total: { lines: { skipped, pct, covered } } } = JSON.parse(stdout);

  return {
    path: app,
    skipped,
    pct,
    covered,
  };
};

module.exports = testCoverage;
