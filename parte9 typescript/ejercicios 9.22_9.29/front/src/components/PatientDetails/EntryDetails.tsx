import { Box } from "@mui/material";
import { Patient, Diagnosis } from "../../types";
import EntryDetail from "./EntryDetail";
import './details.css';

interface Props {
    patient: Patient;
    diagnoses: Diagnosis[];
}

const EntryDetails = ({ patient, diagnoses }: Props) => {
    if (!patient.entries || patient.entries.length === 0) {
        return null;
    }

    return (
        <Box mt={2}>
            {patient.entries.map(entry => (
                <EntryDetail key={entry.id} entry={entry} diagnoses={diagnoses} />
            ))}
        </Box>
    );
};

export default EntryDetails;