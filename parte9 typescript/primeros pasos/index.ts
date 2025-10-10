import express from 'express';
import { calculator, Operation } from './multiplier';
const app = express();

app.get('/ping', (req, res) => {
  console.log('---', req.query)
  let value1: any = 1;
  console.log(value1);

  res.send('pong');
});

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.post('/calculate', (req, res) => {
  const { value1, value2, op } = req.body;

  const operation = op as Operation;
  const result = calculator(Number(value1), Number(value2), operation);
  return res.send({ result });
});


const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});