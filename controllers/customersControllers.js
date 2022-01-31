const {
  validateSchema,
  insertCustomer,
  checkCustomer,
  updateCustomer,
  listById,
  listAll,
  deleteCustomerById,
} = require('../services/customersServices');

const newCustomer = async (req, res, next) => {
  try {
    validateSchema(req.body);
    const result = await insertCustomer(req.body);

    return res.status(201).json(result);
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};

const modifyCustomer = async (req, res, next) => {
  try {
    const { id } = req.params;
    validateSchema(req.body);
    await checkCustomer(id);

    const result = await updateCustomer(id, req.body);

    return res.status(200).json(result);
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    await checkCustomer(id);

    const result = await listById(id);

    return res.status(200).json(result);
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const result = await listAll();
    return res.status(200).json(result);
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};

const eraseCustomerById = async (req, res, next) => {
  try {
    const { id } = req.params;
    await checkCustomer(id);
    const result = await deleteCustomerById(id);

    return res.status(200).json(result);
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};

module.exports = {
  newCustomer,
  modifyCustomer,
  getById,
  getAll,
  eraseCustomerById,
};
