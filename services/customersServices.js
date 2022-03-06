const joi = require('@hapi/joi');
const { ObjectId } = require('mongodb');
const {
  createCustomer, findById, editCustomer, findAll, deleteCustomer,
} = require('../models/customersModel');

const customerSchemaNew = joi.object({
  name: joi.string().min(3).required(),
  birthDate: joi.date().iso().required(),
  sex: joi.string().min(4).max(6).required(),
  healthProblems: joi.array().items(joi.object({
    name: joi.string().min(2).required(),
    level: joi.number().min(1).max(2).strict()
      .required(),
  })).required(),
});

const validateSchema = (body) => {
  const {
    name, birthDate, sex, healthProblems,
  } = body;
  const { error } = customerSchemaNew.validate({
    name, birthDate, sex, healthProblems,
  });

  if (error) throw error;

  if (sex !== 'female' && sex !== 'male') {
    const error1 = { status: 406, message: '"sex" must be filled with "male" or "female"' };
    throw error1;
  }
};

const insertCustomer = async (body) => {
  const {
    name, birthDate, sex, healthProblems,
  } = body;
  validateSchema(body);
  let sd = 0;
  healthProblems.forEach((problem) => sd = problem.level + sd);
  const score = Math.round((1 / (1 + Math.exp(-(-2.8 + sd)))) * 100 * 100) / 100;
  const creationDate = new Date().toISOString(); // Date reference: https://www.tabnine.com/academy/javascript/how-to-format-date/
  const updateDate = new Date().toISOString(); // Convert Date do ISO 8061 Standard: REF https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString
  const customerId = await createCustomer(body, creationDate, updateDate, score);
  const newCustomer = {
    _id: customerId,
    name,
    birthDate,
    sex,
    healthProblems,
    creationDate,
    updateDate,
    score,
  };

  return newCustomer;
};

const checkCustomer = async (id) => {
  const valid = ObjectId.isValid(id);
  if (valid === false) {
    const error = { status: 422, message: 'Invalid customer ID' };
    throw error;
  }

  const customer = await findById(id);

  if (!customer) {
    const error = { status: 404, message: 'Customer not found' };
    throw error;
  }
};

const updateCustomer = async (id, body) => {
  validateSchema(body);
  await checkCustomer(id);
  const updateDate = new Date().toISOString();
  const {
    name, birthDate, sex, healthProblems,
  } = body;
  let sd = 0;
  healthProblems.forEach((problem) => sd = problem.level + sd);
  const score = Math.round((1 / (1 + Math.exp(-(-2.8 + sd)))) * 100 * 100) / 100;
  await editCustomer(id, body, updateDate, score);

  const editedCustomer = {
    _id: id,
    name,
    birthDate,
    sex,
    healthProblems,
    updateDate,
    score,
  };

  return editedCustomer;
};

const listById = async (id) => {
  await checkCustomer(id);
  const customer = await findById(id);

  return customer;
};

const listAll = async () => {
  const customersList = await findAll();

  return customersList;
};

const deleteCustomerById = async (id) => {
  await checkCustomer(id);
  await deleteCustomer(id);

  const message = { message: `Customer with ID: ${id} succesfull deleted` };
  return message;
};

module.exports = {
  validateSchema,
  insertCustomer,
  checkCustomer,
  updateCustomer,
  listById,
  listAll,
  deleteCustomerById,
};
