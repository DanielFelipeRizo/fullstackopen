import express from "express";
import patientService from "../services/patientService.js";
import {toNewPatient, toNewEntry} from "../utils.js";

const router = express.Router();

router.get("/", (_req, res) => {
  const result = patientService.getPatients();
  return res.send(result);
});

router.get("/:id", (req, res) => {
  const patient = patientService.getPatientById(req.params.id);
  if (!patient) {
    res.status(404).send({ error: "Patient not found" });
  }
  return res.send(patient);
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

router.post("/entries", (req, res) => {
  try {
    const newEntry = toNewEntry(req.body);
    const addedEntry = patientService.addEntryToPatient(newEntry, 'sd');
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
