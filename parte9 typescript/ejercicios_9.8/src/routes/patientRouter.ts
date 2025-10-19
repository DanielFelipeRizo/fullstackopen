import express from "express";
import patientService from "../services/patientService.js";
import toNewPatient from "../utils.js";

const router = express.Router();

router.get("/", (_req, res) => {
  const result = patientService.getPatients();
  return res.send(result);
});

router.post("/", (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
