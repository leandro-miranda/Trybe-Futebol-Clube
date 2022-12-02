import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import MatchModel from '../database/models/match.model';
import TeamModel from '../database/models/team.model';
// import leaderboardController from '../controllers/leaderboardController';
// import leaderboardHome from '../utils/leaderboardHome';

import { app } from '../app';

// import MatchesService from '../services/MatchesService';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando a rota leaderboard', () => {
  afterEach(sinon.restore);

  const mockedLeaderboard = [
    {
      "name": "São Paulo",
      "totalPoints": 4,
      "totalGames": 2,
      "totalVictories": 1,
      "totalDraws": 1,
      "totalLosses": 0,
      "goalsFavor": 4,
      "goalsOwn": 1,
      "goalsBalance": 3,
      "efficiency": "66.67"
    },
    {
      "name": "Flamengo",
      "totalPoints": 4,
      "totalGames": 3,
      "totalVictories": 1,
      "totalDraws": 1,
      "totalLosses": 1,
      "goalsFavor": 4,
      "goalsOwn": 2,
      "goalsBalance": 2,
      "efficiency": "44.44"
    },
    {
      "name": "Internacional",
      "totalPoints": 4,
      "totalGames": 3,
      "totalVictories": 1,
      "totalDraws": 1,
      "totalLosses": 1,
      "goalsFavor": 4,
      "goalsOwn": 6,
      "goalsBalance": -2,
      "efficiency": "44.44"
    }
  ];
  
  const mockedLeaderboardHome = [
    {
      "name": "São Paulo",
      "totalPoints": 4,
      "totalGames": 2,
      "totalVictories": 1,
      "totalDraws": 1,
      "totalLosses": 0,
      "goalsFavor": 4,
      "goalsOwn": 1,
      "goalsBalance": 3,
      "efficiency": "66.67"
    }
  ];

  const mockedLeaderboardAway = [
    {
      "name": "Grêmio",
      "totalPoints": 1,
      "totalGames": 1,
      "totalVictories": 0,
      "totalDraws": 1,
      "totalLosses": 0,
      "goalsFavor": 1,
      "goalsOwn": 1,
      "goalsBalance": 0,
      "efficiency": "33.33"
    },
    {
      "name": "Internacional",
      "totalPoints": 0,
      "totalGames": 1,
      "totalVictories": 0,
      "totalDraws": 0,
      "totalLosses": 1,
      "goalsFavor": 0,
      "goalsOwn": 2,
      "goalsBalance": -2,
      "efficiency": "0"
    },
  ];

  const mockedTeams = [
    {
      "id": 16,
      "teamName": "São Paulo"
    },
    {
      "id": 8,
      "teamName": "Grêmio"
    },
    {
      "id": 9,
      "teamName": "Internacional"
    },
  ]

    const mockedHomeTeams = [
      {
        "id": 16,
        "teamName": "São Paulo"
      }
    ]

    const mockedAwayTeams = [
      {
        "id": 8,
        "teamName": "Grêmio"
      },
      {
        "id": 9,
        "teamName": "Internacional"
      }
    ]

    const mockedMatches = [
      {
        "id": 1,
        "homeTeam": 16,
        "homeTeamGoals": 1,
        "awayTeam": 8,
        "awayTeamGoals": 1,
        "inProgress": false,
        "teamHome": {
          "teamName": "São Paulo"
        },
        "teamAway": {
          "teamName": "Grêmio"
        }
      },
      {
        "id": 41,
        "homeTeam": 16,
        "homeTeamGoals": 2,
        "awayTeam": 9,
        "awayTeamGoals": 0,
        "inProgress": false,
        "teamHome": {
          "teamName": "São Paulo"
        },
        "teamAway": {
          "teamName": "Internacional"
        }
      }
    ];

  it('GET - /leaderboard - Deve retornar o ranking de todos os times', async () => {
    sinon.stub(MatchModel, 'findAll').resolves(mockedMatches as unknown as MatchModel[]);
    sinon.stub(TeamModel, 'findAll').resolves(mockedTeams as unknown as TeamModel[]);
    
    const httpResponse = await chai.request(app).get('/leaderboard/home');
    expect(httpResponse.status).to.be.equal(200);
    expect(httpResponse.body).to.be.deep.equal(mockedLeaderboardHome);
  });
});