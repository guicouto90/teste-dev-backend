const { ObjectId } = require('mongodb');
const connection = require('./connection');

const findAll = async () => {
  const connect = await connection();
  const query = await connect.collection('customers').find({}).toArray();

  return query;
};

const createCustomer = async (body, creationDate, updateDate, score) => {
  const {
    name, birthDate, sex, healthProblems,
  } = body;
  const connect = await connection();
  const { insertedId } = await connect.collection('customers').insertOne(
    {
      name, birthDate, sex, healthProblems, creationDate, updateDate, score,
    },
  );

  return insertedId;
};

const findById = async (id) => {
  const connect = await connection();
  const query = await connect.collection('customers').findOne({ _id: ObjectId(id) });

  return query;
};

const editCustomer = async (id, body, updateDate, score) => {
  const {
    name, birthDate, sex, healthProblems,
  } = body;
  const connect = await connection();
  await connect.collection('customers').updateOne(
    { _id: ObjectId(id) },
    {
      $set: {
        name, birthDate, sex, healthProblems, updateDate, score,
      },
    },
  );
};

const deleteCustomer = async (id) => {
  const connect = await connection();
  await connect.collection('customers').deleteOne({ _id: ObjectId(id) });
};

module.exports = {
  createCustomer,
  findById,
  editCustomer,
  findAll,
  deleteCustomer,
};
