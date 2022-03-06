const express = require('express');
const errorHandler = require('./middlewares/errorHandler');
const customersRouter = require('./router/customersRouter');
const healthProblemsRouter = require('./router/healthProblemsRouter');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('<h2> WELCOME, please access the endpoint "/customers" or "/healthproblems" </h2>');
});

app.use('/customers', customersRouter);

app.use('/healthproblems', healthProblemsRouter);

app.use(errorHandler);

app.listen(PORT, () => console.log(`${PORT} working properly`));

module.exports = app;
