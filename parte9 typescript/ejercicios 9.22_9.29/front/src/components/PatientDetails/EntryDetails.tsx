import { Typography, Box } from "@mui/material";
import { Patient, Diagnosis, Entry } from "../../types";
import "./details.css";

interface Props {
    patient: Patient;
    diagnoses: Diagnosis[];
}

const assertNever = (value: never): never => {
    throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

const renderDiagnoses = (codes: Array<string> | undefined, diagnoses: Diagnosis[]) => {
    if (!codes) return null;

    return codes.map(dc => {
        const diagnosis = diagnoses.find(d => d.code === dc);

        return (
            <div className="diagnosis-div" key={dc}>
                <Typography variant="h6">Diagnosis</Typography>
                <Typography>
                    Code: {dc}, Name: {diagnosis ? diagnosis.name : ""}
                </Typography>
            </div>
        );
    });
};

const renderEntry = (pe: Entry, diagnoses: Diagnosis[]) => {
    switch (pe.type) {
        case "Hospital":
            return (
                <div className="entry-header">
                    <Typography>Data: {pe.date}</Typography>
                    <Typography>Description: {pe.description}</Typography>
                    <Typography>
                        Discharge: {pe.discharge.date} — {pe.discharge.criteria}
                    </Typography>

                    {renderDiagnoses(pe.diagnosisCodes, diagnoses)}
                </div>
            );

        case "OccupationalHealthcare":
            return (
                <div className="entry-header">
                    <Typography>Data: {pe.date}</Typography>
                    <Typography>Description: {pe.description}</Typography>
                    <Typography>Employer: {pe.employerName}</Typography>

                    {pe.sickLeave && (
                        <Typography>
                            Sick leave: {pe.sickLeave.startDate} — {pe.sickLeave.endDate}
                        </Typography>
                    )}

                    {renderDiagnoses(pe.diagnosisCodes, diagnoses)}
                </div>
            );

        case "HealthCheck":
            return (
                <div className="entry-header">
                    <Typography>Data: {pe.date}</Typography>
                    <Typography>Description: {pe.description}</Typography>
                    <Typography>Health rating: {pe.healthCheckRating}</Typography>

                    {renderDiagnoses(pe.diagnosisCodes, diagnoses)}
                </div>
            );

        default:
            return assertNever(pe);
    }
};

const EntryDetails = ({ patient, diagnoses }: Props) => {
    return (
        <div className="entry-details">
            {patient.entries?.map(pe => (
                <Box key={pe.id}>
                    {renderEntry(pe, diagnoses)}
                </Box>
            ))}
        </div>
    );
};

export default EntryDetails;
