import express from 'express';
import diaryRouter from './routes/diaries.js';
import cors from 'cors';
const app = express();
app.use(express.json());

const PORT = 3000;

app.use( // Middleware para habilitar CORS
  cors({
    origin: "http://localhost:5173", // o el puerto donde corre tu React app
  })
);
app.use(express.json());

app.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diaries', diaryRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
