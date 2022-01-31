const { listByScore } = require('../services/healthProblemsService');

const showByScore = async (req, res, next) => {
  try {
    const result = await listByScore();

    return res.status(200).json(result);
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};

module.exports = {
  showByScore,
};
