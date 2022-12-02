import * as sinon from 'sinon';
import * as chai from 'chai';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');
import { Response } from 'superagent';

import { app } from '../app';

import UserModel from '../database/models/user.model';

const { expect } = chai;
chai.use(chaiHttp);

const SECRET = process.env.JWT_SECRET as string;

const user = {
  email: 'admin@admin.com',
  password: bcrypt.hashSync('secret_admin'),
  role: 'user',
}

const token = jwt.sign(
  { userEmail: user.email }, SECRET,
  { algorithm : 'HS256', expiresIn: '10d' }
);

describe('POST / login', () => {
  it('POST - Retorna status 400 quando o campo email não é informado ', async () => {
    const httpResponse = await chai.request(app).post('/login')
      .send({ password: 'password' })

    expect(httpResponse.status).to.equal(400);
    expect(httpResponse.body).to.deep.equal({ message: 'All fields must be filled' })
  });

  it('POST - Retorna status 400 quando o campo password não é informado', async () => {
    const httpResponse = await chai.request(app).post('/login')
      .send({ email: 'admin@admin.com' })

    expect(httpResponse.status).to.equal(400);
    expect(httpResponse.body).to.deep.equal({ message: 'All fields must be filled' })
  });

  it('POST - Retorna status 401 quando um password é incorreto', async () => {
    const httpResponse = await chai.request(app).post('/login')
      .send({ email: 'admin@admin.com', password: 'secret' })

    expect(httpResponse.status).to.equal(401);
    expect(httpResponse.body).to.deep.equal({ message: 'Incorrect email or password' })
  });

  it('POST - Retorna status 200 quando um token é válido', async () => {
    const httpResponseLogin = await chai.request(app).post('/login')
      .send({ email: 'admin@admin.com', password: 'secret_admin' })

    expect(httpResponseLogin.body).to.have.property('token');
    expect(httpResponseLogin.status).to.equal(200);
  }); 
});

describe('Testando rota /login/validate', () => {
  let httpResponse: Response;

  beforeEach(async () => {
    return sinon
      .stub(UserModel, "findOne")
      .resolves({
        ...user,
      } as UserModel);
  });

  afterEach(()=>{
    (UserModel.findOne as sinon.SinonStub).restore();
  })

  it('GET - Retorna mensagem de erro, quando token é invalido', async () => {
    httpResponse = await chai.request(app).get('/login/validate').set('authorization', 'invalid_token');
    expect(httpResponse.status).to.be.equal(401);
    expect(httpResponse.body).to.have.property('message');
  });
  
  it('GET - Retorna mensagem de erro, quando não há token', async () => {
    httpResponse = await chai.request(app).get('/login/validate');
    expect(httpResponse.status).to.be.equal(401);
    expect(httpResponse.body).to.have.property('message');
  });
});
