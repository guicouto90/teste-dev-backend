const express = require('express');
const {
  newCustomer, modifyCustomer, getById, getAll, eraseCustomerById,
} = require('../controllers/customersControllers');

const customersRouter = express.Router();

customersRouter.post('/', newCustomer);

customersRouter.put('/:id', modifyCustomer);

customersRouter.get('/', getAll);

customersRouter.get('/:id', getById);

customersRouter.delete('/:id', eraseCustomerById);

module.exports = customersRouter;
