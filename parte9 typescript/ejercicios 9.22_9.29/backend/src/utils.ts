import { Gender, HealthCheckRating } from "./types.js";
import type { Entry, NewPatient, EntryWithoutId, Diagnosis } from "./types.js";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isEntryArray = (arr: unknown): arr is Entry[] => {
  console.log(Array.isArray(arr));

  return Array.isArray(arr) && arr.every(item => typeof item === 'object');

}

const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error("Incorrect or missing name");
  }
  return name;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error("Incorrect date: " + date);
  }
  return date;
};

const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn)) {
    throw new Error("Incorrect or missing ssn");
  }
  return ssn;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect gender: " + gender);
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) {
    throw new Error("Incorrect or missing occupation");
  }
  return occupation;
};

const parseEntries = (entries: unknown): Entry[] => {
  if (!entries || !isEntryArray(entries)) {
    throw new Error("Incorrect or missing entries");
  }
  return entries;
}

const parseDescription = (description: unknown): string => {
  if (!isString(description)) {
    throw new Error("Incorrect or missing description");
  }
  return description;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!isString(specialist)) {
    throw new Error("Incorrect or missing specialist");
  }
  return specialist;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> => {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis['code']>;
  }

  return object.diagnosisCodes as Array<Diagnosis['code']>;
};

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (typeof rating !== 'number' || !isHealthCheckRating(rating)) {
    throw new Error("Incorrect or missing healthCheckRating: " + rating);
  }
  return rating;
};

const parseDischarge = (discharge: unknown): { date: string; criteria: string } => {
  if (!discharge || typeof discharge !== 'object' || !('date' in discharge) || !('criteria' in discharge)) {
    throw new Error("Incorrect or missing discharge");
  }

  return {
    date: parseDate(discharge.date),
    criteria: parseName(discharge.criteria) // Using parseName as a generic string validator
  };
};

const parseSickLeave = (sickLeave: unknown): { startDate: string; endDate: string } => {
  if (!sickLeave || typeof sickLeave !== 'object' || !('startDate' in sickLeave) || !('endDate' in sickLeave)) {
    throw new Error("Incorrect or missing sickLeave");
  }

  return {
    startDate: parseDate(sickLeave.startDate),
    endDate: parseDate(sickLeave.endDate)
  };
};

export const toNewEntry = (object: unknown): EntryWithoutId => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "description" in object &&
    "date" in object &&
    "specialist" in object &&
    "type" in object
  ) {
    const baseEntry = {
      description: parseDescription(object.description),
      date: parseDate(object.date),
      specialist: parseSpecialist(object.specialist),
      diagnosisCodes: parseDiagnosisCodes(object),
    };

    switch (object.type) {
      case "HealthCheck":
        if ("healthCheckRating" in object) {
          return {
            ...baseEntry,
            type: "HealthCheck",
            healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
          };
        }
        throw new Error("Missing healthCheckRating for HealthCheck entry");

      case "Hospital":
        if ("discharge" in object) {
          return {
            ...baseEntry,
            type: "Hospital",
            discharge: parseDischarge(object.discharge),
          };
        }
        throw new Error("Missing discharge for Hospital entry");

      case "OccupationalHealthcare":
        if ("employerName" in object) {
          const entry: EntryWithoutId = {
            ...baseEntry,
            type: "OccupationalHealthcare",
            employerName: parseName(object.employerName),
          };
          if ("sickLeave" in object) {
            (entry as any).sickLeave = parseSickLeave(object.sickLeave);
          }
          return entry;
        }
        throw new Error("Missing employerName for OccupationalHealthcare entry");

      default:
        throw new Error("Incorrect entry type");
    }
  }

  throw new Error("Incorrect data: a field missing");
};

export const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object
  ) {
    const newPatient: NewPatient = {
      name: parseName(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
    };

    if ("entries" in object) {
      newPatient.entries = parseEntries(object.entries);
    }

    return newPatient;
  }

  throw new Error("Incorrect data: a field missing");
};

export default {
  toNewPatient,
  toNewEntry
};
