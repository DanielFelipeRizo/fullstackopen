import patientsData from "../../data/patients.js";
import type {
  NonSensitivePatient,
  NewPatient,
  Patient,
  NewEntry,
  Entry
} from "../types.js";
import { v4 as uuidv4 } from "uuid";

const getPatients = (): NonSensitivePatient[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const getPatientById = (id: string): Patient => {
  const patient = patientsData.find((p) => p.id === id);

  if (!patient) {
    throw new Error("Patient not found");
  }
  return patient;
}

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuidv4(),
    ...patient,
  };
  patientsData.push(newPatient);
  return newPatient;
};

const addEntryToPatient = (entry: NewEntry, patientId: string): Entry => {
  const patient = patientsData.find((p) => p.id === patientId);

  if (!patient) {
    throw new Error("Patient not found");
  }

  const newEntry = {
    id: uuidv4(),
    ...entry,
  };

  patientsData.find((p) => p.id === patientId)?.entries?.push(newEntry);

  return newEntry;
};

export default {
  getPatients,
  addPatient,
  getPatientById,
  addEntryToPatient
};
