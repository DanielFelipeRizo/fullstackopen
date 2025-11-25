import { Gender, HealthCheckRating } from "./types.js";
import type { Diagnosis, Entry, NewPatient, NewEntry } from "./types.js";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isEntryArray = (arr: unknown): arr is Entry[] => {
  console.log(Array.isArray(arr));

  return Array.isArray(arr) && arr.every(item => typeof item === 'object');

}

// -- NewPatient helpers --
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

// -- NewEntry helpers --
const parseDescription = (description: unknown): string => {
  if (!isString(description)) {
    throw new Error('Incorrect or missing description');
  }
  return description;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!isString(specialist)) {
    throw new Error('Incorrect or missing specialist');
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
  if (!isNumber(rating) || !isHealthCheckRating(rating)) {
    throw new Error('Incorrect or missing health check rating: ' + rating);
  }
  return rating;
};

const parseDischarge = (discharge: unknown): { date: string; criteria: string } => {
  if (
    !discharge ||
    typeof discharge !== 'object' ||
    !('date' in discharge) ||
    !('criteria' in discharge) ||
    !isString((discharge as { date: unknown }).date) ||
    !isDate((discharge as { date: string }).date) ||
    !isString((discharge as { criteria: unknown }).criteria)
  ) {
    throw new Error('Incorrect or missing discharge info');
  }
  return discharge as { date: string; criteria: string };
};

const parseSickLeave = (sickLeave: unknown): { startDate: string; endDate: string } | undefined => {
  if (!sickLeave) return undefined;
  if (
    typeof sickLeave !== 'object' ||
    !('startDate' in sickLeave) ||
    !('endDate' in sickLeave) ||
    !isString((sickLeave as { startDate: unknown }).startDate) ||
    !isDate((sickLeave as { startDate: string }).startDate) ||
    !isString((sickLeave as { endDate: unknown }).endDate) ||
    !isDate((sickLeave as { endDate: string }).endDate)
  ) {
    throw new Error('Incorrect sick leave info');
  }
  return sickLeave as { startDate: string; endDate: string };
};

const parseEmployerName = (employerName: unknown): string => {
  if (!isString(employerName)) {
    throw new Error('Incorrect or missing employer name');
  }
  return employerName;
};

const isNumber = (text: unknown): text is number => {
  return typeof text === 'number' || text instanceof Number;
};

// -- Public parsers --
const toNewPatient = (object: unknown): NewPatient => {
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


const toNewEntry = (object: unknown): NewEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if (
    'description' in object &&
    'date' in object &&
    'specialist' in object &&
    'type' in object
  ) {
    const newEntryBase = {
      description: parseDescription(object.description),
      date: parseDate(object.date),
      specialist: parseSpecialist(object.specialist),
      diagnosisCodes: parseDiagnosisCodes(object),
    };

    switch (object.type) {
      case 'HealthCheck':
        if ('healthCheckRating' in object) {
          const healthCheckEntry: NewEntry = {
            ...newEntryBase,
            type: 'HealthCheck',
            healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
          };
          return healthCheckEntry;
        }
        throw new Error('Missing healthCheckRating');

      case 'Hospital':
        if ('discharge' in object) {
          const hospitalEntry: NewEntry = {
            ...newEntryBase,
            type: 'Hospital',
            discharge: parseDischarge(object.discharge),
          };
          return hospitalEntry;
        }
        throw new Error('Missing discharge');

      case 'OccupationalHealthcare':
        if ('employerName' in object) {
          const occupationalEntry: NewEntry = {
            ...newEntryBase,
            type: 'OccupationalHealthcare',
            employerName: parseEmployerName(object.employerName),
          };
          if ('sickLeave' in object) {
            const sickLeave = parseSickLeave(object.sickLeave);
            if (sickLeave) {
              occupationalEntry.sickLeave = sickLeave;
            }
          }
          return occupationalEntry;
        }
        throw new Error('Missing employerName');

      default:
        throw new Error('Incorrect entry type');
    }
  }

  throw new Error('Incorrect data: a field missing');
};



export default toNewPatient;
export { toNewEntry };
