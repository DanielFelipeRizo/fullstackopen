import express from "express";
import cors from "cors";
import diagnosesRoute from './routes/diagnosesRoute.js';
import patientRouter from './routes/patientRouter.js';

const app = express();

app.use( // Middleware para habilitar CORS
  cors({
    origin: "http://localhost:5173", // o el puerto donde corre tu React app
  })
);
app.use(express.json());

const PORT = 3001;

app.get("/api/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

app.use('/api/diagnoses', diagnosesRoute);
app.use('/api/patients', patientRouter);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
