const { getByScoreField } = require('../models/healthProblemsModel');

const listByScore = async () => {
  const result = await getByScoreField();

  return result;
};

module.exports = {
  listByScore,
};
