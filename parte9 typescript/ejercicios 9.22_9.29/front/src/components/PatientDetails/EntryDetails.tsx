import { Typography, Box } from "@mui/material";
import { Patient, Diagnosis } from "../../types";
import './details.css';

interface Props {
    patient: Patient;
    diagnoses: Diagnosis[];
}

const EntryDetails = ({ patient, diagnoses }: Props) => {

    console.log('entry details');

    // console.log('--------', patient);
    // console.log('--------', diagnoses);

    return <div>

        {patient.entries?.map(pe => (

            <Box key={pe.id}>
                <Typography> Data: {pe.date} </Typography>
                <Typography> Description: {pe.description} </Typography>

                {pe.diagnosisCodes?.map((dc) => {
                    const diagnosis = diagnoses.find(d => d.code === dc);

                    return (
                        <div className="diagnosis-div">
                            <Typography variant="h6"> Diagnosis </Typography>


                            <Typography key={dc}>Code: {dc}{diagnosis ? diagnosis.name : ''}</Typography>

                        </div>
                    );
                })}

            </Box>
        ))}

    </div>;
};

export default EntryDetails;