const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const { expect } = chai;
const { MongoClient } = require('mongodb');
const server = require('../index');

const { getConnection } = require('./connectionMock');

describe('GET /healthproblems', () => {
  let connectionMock;

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(() => {
    MongoClient.connect.restore();
  });

  describe('When the request is a success', () => {
    let response;
    before(async () => {
      response = await chai.request(server)
        .get('/healthproblems/');
    });

    it('Return status 200', () => {
      expect(response).to.have.status(200);
    });

    it('Return an array', () => {
      expect(response.body).to.be.an('array');
    });
  });
});
