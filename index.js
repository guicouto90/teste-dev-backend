const express = require('express');
const errorHandler = require('./middlewares/errorHandler');
const customersRouter = require('./router/customersRouter');
const healthProblemsRouter = require('./router/healthProblemsRouter');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/customers', customersRouter);

app.use('/healthproblems', healthProblemsRouter);

app.use(errorHandler);

app.listen(PORT, () => console.log(`${PORT} working properly`));

module.exports = app;
