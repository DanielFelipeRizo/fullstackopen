import patientsData from "../../data/patients.js";
import type {
  NonSensitivePatient,
  NewPatient,
  Patient,
} from "../types.js";
import { v4 as uuidv4 } from "uuid";

const getPatients = (): NonSensitivePatient[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuidv4(),
    ...patient,
  };
  patientsData.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  addPatient
};
