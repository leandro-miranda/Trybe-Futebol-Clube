// import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import teams from './mocksTeams';

chai.use(chaiHttp);
const { expect } = chai;

describe('GET /teams', () => {
  it('A rota get /teams retorna um array de times e com status 200', async () => {
    const response = await chai.request(app).get('/teams');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.an('array');
    expect(response.body).to.be.deep.equal(teams);
  });

  it('A rota get /teams/id retorna um time e com status 200', async () => {
    const response = await chai.request(app).get('/teams/8');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.an('object');
    expect(response.body).to.be.deep.equal(teams[7]);
  });
  
  it('A rota get /teams/id retorna null quando um id não é passado', async () => {
    const response = await chai.request(app).get('/teams/25');

    expect(response.body).to.be.null;
  });
});