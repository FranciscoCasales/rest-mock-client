import express from 'express';
import { generalRouter } from './rest-handler/routes/index.routes.mjs';
import { config as initializeEnv } from 'dotenv';

initializeEnv();
const app = express();
const port = process.env.PORT || 9000;

app.use(express.json());
app.use('/', generalRouter);
app.use('*', (req, res) => {
  const response = `Route not found, path: ${req.originalUrl}, method: ${req.method}`
  console.warn(response);
  res.status(404).send({message: response})
});

app.listen(port, () => {
  console.log(`Rest mock client listening on port ${port}`);
});
