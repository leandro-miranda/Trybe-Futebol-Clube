module.exports = {
  select: {
    all: {
      users: 'SELECT * FROM users;',
      matches: 'SELECT * FROM matches;',
      teams: 'SELECT * FROM teams;',
    },
    where: {
      matches: (where) => `SELECT * FROM matches WHERE ${where};`,
    },
  },
  insert: {
    leaderboard: (homeTeam, homeTeamGoals, awayTeam, awayTeamGoals, inProgress) => (
      `INSERT INTO TRYBE_FUTEBOL_CLUBE.matches (home_team, home_team_goals, away_team, away_team_goals, in_progress) VALUES (${homeTeam}, ${homeTeamGoals}, ${awayTeam}, ${awayTeamGoals}, ${inProgress});`
    ),
  },
};
