import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import Match from '../database/models/match.model';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const allMatchesMock = [
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
    "inProgress": true,
    "teamHome": {
      "teamName": "São Paulo"
    },
    "teamAway": {
      "teamName": "Internacional"
    }
  }
];

const matchCreateMock = {
  "homeTeam": 16,
  "awayTeam": 8,
  "homeTeamGoals": 2,
  "awayTeamGoals": 2,
  "inProgress": true 
};

const userMock = {
  email: 'user@user.com',
  password: 'secret_user',
};

describe('Testando rota /matches', () => {
  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon
      .stub(Match, "findAll")
      .resolves([...allMatchesMock] as unknown as Match[]);
  });

  afterEach(()=>{
    sinon.restore();
  })

  it('GET - Retorna todas as partidas', async () => {
    chaiHttpResponse = await chai.request(app).get('/matches');
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.an('array');
    expect(chaiHttpResponse.body[0]).to.have.property('homeTeam');
    expect(chaiHttpResponse.body[1].homeTeam).to.equal(16);
  });

  it('GET - Retorna todas as partidas em andamento', async () => {
    chaiHttpResponse = await chai.request(app).get('/matches?inProgress=true');
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.an('array');
    expect(chaiHttpResponse.body[0]).to.have.property('homeTeam');
    expect(chaiHttpResponse.body[0].homeTeam).to.equal(16);
  });

  it('GET - Retorna todas as partidas finalizadas', async () => {
    chaiHttpResponse = await chai.request(app).get('/matches?inProgress=false');
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.an('array');
    expect(chaiHttpResponse.body[0]).to.have.property('awayTeam');
    expect(chaiHttpResponse.body[0].awayTeam).to.equal(8);
  });
});


describe('Testando rota POST /matches', () => {
  let chaiHttpResponseLogin: Response;
  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon
      .stub(Match, "create")
      .resolves({id: 1, ...matchCreateMock } as unknown as Match);
  });

  afterEach(()=>{
    sinon.restore();
  })

  it('POST - Cria uma nova partida', async () => {
    chaiHttpResponseLogin = await chai.request(app).post('/login').send({
      email: userMock.email,
      password: 'secret_user',
    });
    chaiHttpResponse = await chai.request(app)
      .post('/matches')
      .set('Authorization', chaiHttpResponseLogin.body.token)
      .send(matchCreateMock);
    expect(chaiHttpResponse.status).to.be.equal(201);
    expect(chaiHttpResponse.body).to.have.property('id');
    expect(chaiHttpResponse.body.id).to.equal(1);
  });
});

describe('Testando rota /matches/:id/finish', () => {
  let chaiHttpResponseLogin: Response;
  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon
      .stub(Match, "update")
      .resolves([1]) ;
  });

  afterEach(()=>{
    sinon.restore();
  })

  it('PATCH - Finaliza uma partida', async () => {
    chaiHttpResponseLogin = await chai.request(app).post('/login').send({
      email: userMock.email,
      password: 'secret_user',
    });
    chaiHttpResponse = await chai.request(app)
      .patch('/matches/1/finish').set('Authorization', chaiHttpResponseLogin.body.token)
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.have.property('message');
  });
});
