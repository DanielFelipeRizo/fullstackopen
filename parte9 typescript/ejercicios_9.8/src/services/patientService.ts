import patientsData from "../../data/patients.js";
import type { NonSensitivePatient } from "../types.js";

const getPatients = (): NonSensitivePatient[] => {
    return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

export default {
    getPatients
}
