const connection = require('./connection');

const getByScoreField = async () => {
  const connect = await connection();
  const query = await connect.collection('customers').find().sort({ score: -1 }).limit(10)
    .toArray();

  return query;
};

module.exports = {
  getByScoreField,
};
