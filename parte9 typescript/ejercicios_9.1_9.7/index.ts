import express from "express";
import {
  bmiCalculator,
  parseArgumentsUrl,
} from "../ejercicios_9.1_9.7/bmiCalculator";
import { calculator } from "./exerciseCalculator";

const app = express();

app.get("/ping", (_req, res) => {
  res.send("pong");
});
``;
app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi/", (req, res) => {
  if (!req.query.weight || !req.query.height) {
    res.status(400).send({ error: "malformatted parameters" });
    return;
  }

  try {
    const { weight, height } = req.query;
    const { value1, value2 } = parseArgumentsUrl([weight, height] as string[]);
    const resultBmi = bmiCalculator(Number(value1), Number(value2));
    res.send({ weight, height, bmi: resultBmi.bmi });
  } catch (error: unknown) {
    let errorMessage = "Something bad happened.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
      res.status(400).send({ error: errorMessage });
      console.log(errorMessage);
    }
  }
});

app.post("/exercises", express.json(), (req, res) => {
  const { daily_exercises, target } = req.body;
  if (!daily_exercises || !target) {
    res.status(400).send({ error: "parameters missing" });
    return;
  }

  if (!Array.isArray(daily_exercises) || isNaN(Number(target))) {
    res.status(400).send({ error: "malformatted parameters" });
    return;
  }

  try {
    const arrDailyExercisesAndTarget = [...daily_exercises, target].map((d) =>
      Number(d)
    );

    if (arrDailyExercisesAndTarget.some(isNaN)) {
      throw new Error("malformatted parameters");
    }

    const result = calculator(arrDailyExercisesAndTarget);
    res.send(result);
    
  } catch (error: unknown) {
    let errorMessage = "Something bad happened.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
      res.status(400).send({ error: errorMessage });
      console.log(errorMessage);
    }
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
