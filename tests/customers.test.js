const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const { expect } = chai;
const { MongoClient } = require('mongodb');
const server = require('../index');

const { getConnection } = require('./connectionMock');

// POST /CUSTOMERS
describe('POST /customers', () => {
  let connectionMock;

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(() => {
    MongoClient.connect.restore();
  });

  describe('When the field "name" is not filled', () => {
    let response;
    before(async () => {
      response = await chai.request(server)
        .post('/customers')
        .send({
          birthDate: '1990-05-04',
          sex: 'male',
          healthProblems: [
            {
              name: 'diabete',
              level: 2,
            },
          ],
        });
    });

    it('Return status 422', () => {
      expect(response).to.have.status(422);
    });

    it('Return an object in the body', () => {
      expect(response.body).to.be.an('object');
    });

    it('return a property "message" in the body', () => {
      expect(response.body).to.have.property('message');
    });

    it('Property "message" have the value: ""\"name\" is required""', () => {
      expect(response.body.message).to.be.equals('"name" is required');
    });
  });

  describe('When the field "name" is not a string type', () => {
    let response;
    before(async () => {
      response = await chai.request(server)
        .post('/customers')
        .send({
          name: 46565,
          birthDate: '1990-05-04',
          gender: 'male',
          healthProblems: [
            {
              name: 'diabete',
              level: 2,
            },
          ],
        });
    });

    it('Return status 422', () => {
      expect(response).to.have.status(422);
    });

    it('Return an object in the body', () => {
      expect(response.body).to.be.an('object');
    });

    it('return a property "message" in the body', () => {
      expect(response.body).to.have.property('message');
    });

    it('Property "message" have the value: "\"name\" must be a string"', () => {
      expect(response.body.message).to.be.equals('"name" must be a string');
    });
  });

  describe('When the field "birthDate" is not filled', () => {
    let response;
    before(async () => {
      response = await chai.request(server)
        .post('/customers')
        .send({
          name: 'Roberto Dias',
          gender: 'male',
          healthProblems: [
            {
              name: 'diabete',
              level: 2,
            },
          ],
        });
    });

    it('Return status 422', () => {
      expect(response).to.have.status(422);
    });

    it('Return an object in the body', () => {
      expect(response.body).to.be.an('object');
    });

    it('return a property "message" in the body', () => {
      expect(response.body).to.have.property('message');
    });

    it('Property "message" have the value: "\"birthDate\" is required"', () => {
      expect(response.body.message).to.be.equals('"birthDate" is required');
    });
  });

  describe('When the field "birthDate" is not a valid date(ISO 8601) YYYY-MM-DD', () => {
    let response;
    before(async () => {
      response = await chai.request(server)
        .post('/customers')
        .send({
          name: 'Roberto Dias',
          birthDate: '04/05/1990',
          gender: 'male',
          healthProblems: [
            {
              name: 'diabete',
              level: 2,
            },
          ],
        });
    });

    it('Return status 422', () => {
      expect(response).to.have.status(422);
    });

    it('Return an object in the body', () => {
      expect(response.body).to.be.an('object');
    });

    it('return a property "message" in the body', () => {
      expect(response.body).to.have.property('message');
    });

    it('Property "message" have the value: "\"birthDate\" must be in ISO 8601 date format"', () => {
      expect(response.body.message).to.be.equals('"birthDate" must be in ISO 8601 date format');
    });
  });

  describe('When the field "sex" is not filled', () => {
    let response;
    before(async () => {
      response = await chai.request(server)
        .post('/customers')
        .send({
          name: 'Roberto Dias',
          birthDate: '1990-05-04',
          healthProblems: [
            {
              name: 'diabete',
              level: 2,
            },
          ],
        });
    });

    it('Return status 422', () => {
      expect(response).to.have.status(422);
    });

    it('Return an object in the body', () => {
      expect(response.body).to.be.an('object');
    });

    it('return a property "message" in the body', () => {
      expect(response.body).to.have.property('message');
    });

    it('Property "message" have the value: "\"sex\" is required"', () => {
      expect(response.body.message).to.be.equals('"sex" is required');
    });
  });

  describe('When the field "sex" is not a string type', () => {
    let response;
    before(async () => {
      response = await chai.request(server)
        .post('/customers')
        .send({
          name: 'Roberto Dias',
          birthDate: '1990-05-04',
          sex: 46565,
          healthProblems: [
            {
              name: 'diabete',
              level: 2,
            },
          ],
        });
    });

    it('Return status 422', () => {
      expect(response).to.have.status(422);
    });

    it('Return an object in the body', () => {
      expect(response.body).to.be.an('object');
    });

    it('return a property "message" in the body', () => {
      expect(response.body).to.have.property('message');
    });

    it('Property "message" have the value: "\"sex\" must be a string"', () => {
      expect(response.body.message).to.be.equals('"sex" must be a string');
    });
  });

  describe('When the field "sex" is not filled with "female" or "male"', () => {
    let response;
    before(async () => {
      response = await chai.request(server)
        .post('/customers')
        .send({
          name: 'Roberto Dias',
          birthDate: '1990-05-04',
          sex: 'malee',
          healthProblems: [
            {
              name: 'diabete',
              level: 2,
            },
          ],
        });
    });

    it('Return status 406', () => {
      expect(response).to.have.status(406);
    });

    it('Return an object in the body', () => {
      expect(response.body).to.be.an('object');
    });

    it('return a property "message" in the body', () => {
      expect(response.body).to.have.property('message');
    });

    it('Property "message" have the value: "\"sex\" must be filled with \"male\" or \"female\""', () => {
      expect(response.body.message).to.be.equals('"sex" must be filled with "male" or "female"');
    });
  });

  describe('When the field "healthProblems" is not filled', () => {
    let response;
    before(async () => {
      response = await chai.request(server)
        .post('/customers')
        .send({
          name: 'Roberto Dias',
          birthDate: '1990-05-04',
          sex: 'male',
        });
    });

    it('Return status 422', () => {
      expect(response).to.have.status(422);
    });

    it('Return an object in the body', () => {
      expect(response.body).to.be.an('object');
    });

    it('return a property "message" in the body', () => {
      expect(response.body).to.have.property('message');
    });

    it('Property "message" have the value: "\"healthProblems\" is required"', () => {
      expect(response.body.message).to.be.equals('"healthProblems" is required');
    });
  });

  describe('When the field "healthProblems" is not an array', () => {
    let response;
    before(async () => {
      response = await chai.request(server)
        .post('/customers')
        .send({
          name: 'Roberto Dias',
          birthDate: '1990-05-04',
          sex: 'male',
          healthProblems: 123465,
        });
    });

    it('Return status 422', () => {
      expect(response).to.have.status(422);
    });

    it('return a property "message" in the body', () => {
      expect(response.body).to.have.property('message');
    });

    it('Property "message" have the value: "\"healthProblems\" must be an array"', () => {
      expect(response.body.message).to.be.equals('"healthProblems" must be an array');
    });
  });

  describe('When the field "name" from "healthProblems" is not filled', () => {
    let response;
    before(async () => {
      response = await chai.request(server)
        .post('/customers')
        .send({
          name: 'Roberto Dias',
          birthDate: '1990-05-04',
          sex: 'male',
          healthProblems: [
            {
              level: 2,
            },
          ],
        });
    });

    it('Return status 422', () => {
      expect(response).to.have.status(422);
    });

    it('return a property "message" in the body', () => {
      expect(response.body).to.have.property('message');
    });

    it('Property "message" have the value: "\"healthProblems[0].name\" is required"', () => {
      expect(response.body.message).to.be.equals('"healthProblems[0].name" is required');
    });
  });

  describe('When the field "level" from "healthProblems" is not filled', () => {
    let response;
    before(async () => {
      response = await chai.request(server)
        .post('/customers')
        .send({
          name: 'Roberto Dias',
          birthDate: '1990-05-04',
          sex: 'male',
          healthProblems: [
            {
              name: 'diabetes',
            },
          ],
        });
    });

    it('Return status 422', () => {
      expect(response).to.have.status(422);
    });

    it('return a property "message" in the body', () => {
      expect(response.body).to.have.property('message');
    });

    it('Property "message" have the value: "\"healthProblems[0].level\" is required"', () => {
      expect(response.body.message).to.be.equals('"healthProblems[0].level" is required');
    });
  });

  describe('When the field "name" from "healthProblems" is not a string type', () => {
    let response;
    before(async () => {
      response = await chai.request(server)
        .post('/customers')
        .send({
          name: 'Roberto Dias',
          birthDate: '1990-05-04',
          sex: 'male',
          healthProblems: [
            {
              name: 4565,
              level: 2,
            },
          ],
        });
    });

    it('Return status 422', () => {
      expect(response).to.have.status(422);
    });

    it('return a property "message" in the body', () => {
      expect(response.body).to.have.property('message');
    });

    it('Property "message" have the value: "\"healthProblems[0].name\" must be a string"', () => {
      expect(response.body.message).to.be.equals('"healthProblems[0].name" must be a string');
    });
  });

  describe('When the field "level" from "healthProblems" is not a number type', () => {
    let response;
    before(async () => {
      response = await chai.request(server)
        .post('/customers')
        .send({
          name: 'Roberto Dias',
          birthDate: '1990-05-04',
          sex: 'male',
          healthProblems: [
            {
              name: 'Roberto da Silva',
              level: '5',
            },
          ],
        });
    });

    it('Return status 422', () => {
      expect(response).to.have.status(422);
    });

    it('return a property "message" in the body', () => {
      expect(response.body).to.have.property('message');
    });

    it('Property "message" have the value: "\"healthProblems[0].level\" must be a number"', () => {
      expect(response.body.message).to.be.equals('"healthProblems[0].level" must be a number');
    });
  });

  describe('When everything is filled correct and the customer is successfully registered', () => {
    let response;
    before(async () => {
      response = await chai.request(server)
        .post('/customers')
        .send({
          name: 'Roberto Dias',
          birthDate: '1990-05-04',
          sex: 'male',
          healthProblems: [
            {
              name: 'Roberto da Silva',
              level: 2,
            },
          ],
        });
    });

    it('Return status 201', () => {
      expect(response).to.have.status(201);
    });

    it('Return an object in the body', () => {
      expect(response.body).to.be.an('object');
    });

    it('Return an object with properties: "_id", "name","birthDate", "sex", "healthProblems", "creationDate", "updateDate", "score"', () => {
      expect(response.body).to.have.property('_id');
      expect(response.body).to.have.property('name');
      expect(response.body).to.have.property('birthDate');
      expect(response.body).to.have.property('sex');
      expect(response.body).to.have.property('healthProblems');
      expect(response.body).to.have.property('creationDate');
      expect(response.body).to.have.property('updateDate');
      expect(response.body).to.have.property('score');
    });
  });
});

// PUT CUSTOMERS/:ID
describe('PUT /customers/:id', () => {
  let connectionMock;

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(() => {
    MongoClient.connect.restore();
  });

  describe('When id is not valid', () => {
    let response;
    let id;
    before(async () => {
      const customersCollection = connectionMock.db('Oli-Saude').collection('customers');
      id = await customersCollection.insertOne({
        name: 'Roberto da Silva',
        birthDate: '1990-05-04',
        sex: 'male',
        healthProblems:
        [
          {
            name: 'diabetes',
            level: 2,
          },
        ],
      });
      response = await chai.request(server)
        .put(`/customers/${56565656}`)
        .send({
          name: 'Roberto da Silva',
          birthDate: '1990-05-04',
          sex: 'male',
          healthProblems:
            [
              {
                name: 'AIDS',
                level: 2,
              },
            ],
        });
    });

    it('Return status 422', () => {
      expect(response).to.have.status(422);
    });

    it('Return a object in the body', () => {
      expect(response.body).to.be.an('object');
    });

    it('Return property message in body', () => {
      expect(response.body).to.have.property('message');
    });

    it('"message property has the value: "Invalid customer ID"', () => {
      expect(response.body.message).to.be.equals('Invalid customer ID');
    });
  });

  describe('When customer id is not found', () => {
    let response;
    let id;
    before(async () => {
      const customersCollection = connectionMock.db('Oli-Saude').collection('customers');
      id = await customersCollection.insertOne({
        name: 'Roberto da Silva',
        birthDate: '1990-05-04',
        sex: 'male',
        healthProblems:
        [
          {
            name: 'diabetes',
            level: 2,
          },
        ],
      });
      const { insertedId } = id;
      console.log(insertedId);
      response = await chai.request(server)
        .put('/customers/61f42e5e0a73e1ad82a301f2')
        .send({
          name: 'Roberto da Silva',
          birthDate: '1990-05-04',
          sex: 'male',
          healthProblems:
            [
              {
                name: 'AIDS',
                level: 2,
              },
            ],
        });
    });

    it('Return status 404', () => {
      expect(response).to.have.status(404);
    });

    it('Return a object in the body', () => {
      expect(response.body).to.be.an('object');
    });

    it('Return property message in body', () => {
      expect(response.body).to.have.property('message');
    });

    it('"message property has the value: "Customer not found"', () => {
      expect(response.body.message).to.be.equals('Customer not found');
    });
  });

  describe('When customer is successfully edited', () => {
    let response;
    let id;
    before(async () => {
      const customersCollection = connectionMock.db('Oli-Saude').collection('customers');
      id = await customersCollection.insertOne({
        name: 'Roberto da Silva',
        birthDate: '1990-05-04',
        sex: 'male',
        healthProblems:
        [
          {
            name: 'diabetes',
            level: 2,
          },
        ],
      });
      const { insertedId } = id;
      console.log(insertedId);
      response = await chai.request(server)
        .put(`/customers/${insertedId}`)
        .send({
          name: 'Roberto da Silva',
          birthDate: '1990-05-04',
          sex: 'male',
          healthProblems:
            [
              {
                name: 'AIDS',
                level: 2,
              },
            ],
        });
    });

    it('Return status 200', () => {
      expect(response).to.have.status(200);
    });

    it('Return a object in the body', () => {
      expect(response.body).to.be.an('object');
    });

    it('Return property "_id", "name", "birthDate", "sex", "healthProblems", "updateDate", "score" in the body', () => {
      expect(response.body).to.have.property('_id');
      expect(response.body).to.have.property('name');
      expect(response.body).to.have.property('birthDate');
      expect(response.body).to.have.property('sex');
      expect(response.body).to.have.property('healthProblems');
      expect(response.body).to.have.property('updateDate');
      expect(response.body).to.have.property('score');
    });
  });
});

// GET /CUSTOMERS/:ID

describe('GET /customers/:id', () => {
  let connectionMock;

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(() => {
    MongoClient.connect.restore();
  });

  describe('When id is not valid', () => {
    let response;
    let id;
    before(async () => {
      const customersCollection = connectionMock.db('Oli-Saude').collection('customers');
      id = await customersCollection.insertOne({
        name: 'Roberto da Silva',
        birthDate: '1990-05-04',
        sex: 'male',
        healthProblems:
        [
          {
            name: 'diabetes',
            level: 2,
          },
        ],
      });

      response = await chai.request(server)
        .get(`/customers/${56565656}`);
    });

    it('Return status 422', () => {
      expect(response).to.have.status(422);
    });

    it('Return a object in the body', () => {
      expect(response.body).to.be.an('object');
    });

    it('Return property message in body', () => {
      expect(response.body).to.have.property('message');
    });

    it('"message property has the value: "Invalid customer ID"', () => {
      expect(response.body.message).to.be.equals('Invalid customer ID');
    });
  });

  describe('When customer id is not found', () => {
    let response;
    let id;
    before(async () => {
      const customersCollection = connectionMock.db('Oli-Saude').collection('customers');
      id = await customersCollection.insertOne({
        name: 'Roberto da Silva',
        birthDate: '1990-05-04',
        sex: 'male',
        healthProblems:
        [
          {
            name: 'diabetes',
            level: 2,
          },
        ],
      });
      const { insertedId } = id;
      console.log(insertedId);
      response = await chai.request(server)
        .get('/customers/61f42e5e0a73e1ad82a301f2');
    });

    it('Return status 404', () => {
      expect(response).to.have.status(404);
    });

    it('Return a object in the body', () => {
      expect(response.body).to.be.an('object');
    });

    it('Return property message in body', () => {
      expect(response.body).to.have.property('message');
    });

    it('"message property has the value: "Customer not found"', () => {
      expect(response.body.message).to.be.equals('Customer not found');
    });
  });

  describe('When the request is complete succesfully', () => {
    let response;
    let id;
    before(async () => {
      const customersCollection = connectionMock.db('Oli-Saude').collection('customers');
      id = await customersCollection.insertOne({
        name: 'Roberto da Silva',
        birthDate: '1990-05-04',
        sex: 'male',
        healthProblems:
        [
          {
            name: 'diabetes',
            level: 2,
          },
        ],
        creationDate: new Date().toISOString(),
        updateDate: new Date().toISOString(),
        score,
      });

      const { insertedId } = id;
      response = await chai.request(server)
        .get(`/customers/${insertedId}`);
    });

    it('Return status 200', () => {
      expect(response).to.have.status(200);
    });

    it('Return a object in the body', () => {
      expect(response.body).to.be.an('object');
    });

    it('Return property "_id", "name", "birthDate", "sex", "healthProblems", "creationDate", "updateDate", "score" in the body', () => {
      console.log(response.body);
      expect(response.body).to.have.property('_id');
      expect(response.body).to.have.property('name');
      expect(response.body).to.have.property('birthDate');
      expect(response.body).to.have.property('sex');
      expect(response.body).to.have.property('healthProblems');
      expect(response.body).to.have.property('creationDate');
      expect(response.body).to.have.property('updateDate');
      expect(response.body).to.have.property('score');
    });
  });
});

// DELETE /CUSTOMERS/:ID
describe('DELETE /customers/:id', () => {
  let connectionMock;

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(() => {
    MongoClient.connect.restore();
  });

  describe('When id is not valid', () => {
    let response;
    let id;
    before(async () => {
      const customersCollection = connectionMock.db('Oli-Saude').collection('customers');
      id = await customersCollection.insertOne({
        name: 'Roberto da Silva',
        birthDate: '1990-05-04',
        sex: 'male',
        healthProblems:
        [
          {
            name: 'diabetes',
            level: 2,
          },
        ],
      });

      response = await chai.request(server)
        .delete(`/customers/${56565656}`);
    });

    it('Return status 422', () => {
      expect(response).to.have.status(422);
    });

    it('Return a object in the body', () => {
      expect(response.body).to.be.an('object');
    });

    it('Return property message in body', () => {
      expect(response.body).to.have.property('message');
    });

    it('"message property has the value: "Invalid customer ID"', () => {
      expect(response.body.message).to.be.equals('Invalid customer ID');
    });
  });

  describe('When customer id is not found', () => {
    let response;
    let id;
    before(async () => {
      const customersCollection = connectionMock.db('Oli-Saude').collection('customers');
      id = await customersCollection.insertOne({
        name: 'Roberto da Silva',
        birthDate: '1990-05-04',
        sex: 'male',
        healthProblems:
        [
          {
            name: 'diabetes',
            level: 2,
          },
        ],
      });
      const { insertedId } = id;
      console.log(insertedId);
      response = await chai.request(server)
        .delete('/customers/61f42e5e0a73e1ad82a301f2');
    });

    it('Return status 404', () => {
      expect(response).to.have.status(404);
    });

    it('Return a object in the body', () => {
      expect(response.body).to.be.an('object');
    });

    it('Return property message in body', () => {
      expect(response.body).to.have.property('message');
    });

    it('"message property has the value: "Customer not found"', () => {
      expect(response.body.message).to.be.equals('Customer not found');
    });
  });

  describe('When the request is completed succesfully', () => {
    let response;
    let id;
    before(async () => {
      const customersCollection = connectionMock.db('Oli-Saude').collection('customers');
      id = await customersCollection.insertOne({
        name: 'Roberto da Silva',
        birthDate: '1990-05-04',
        sex: 'male',
        healthProblems:
        [
          {
            name: 'diabetes',
            level: 2,
          },
        ],
      });

      const { insertedId } = id;
      response = await chai.request(server)
        .delete(`/customers/${insertedId}`);
    });

    it('Return status 200', () => {
      expect(response).to.have.status(200);
    });

    it('Return a object in the body', () => {
      console.log(response.body);
      expect(response.body).to.be.an('object');
    });

    it('Return property message in body', () => {
      expect(response.body).to.have.property('message');
    });

    it('message property has the value: Customer with ID: <_id> succesfull deleted', () => {
      expect(response.body.message).to.be.equals(`Customer with ID: ${id.insertedId} succesfull deleted`);
    });
  });
});
