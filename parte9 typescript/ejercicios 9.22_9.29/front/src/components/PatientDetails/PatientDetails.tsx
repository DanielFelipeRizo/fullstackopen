import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import patientService from "../../services/patients";
import diagnosisService from "../../services/diagnoses";
import { Patient, Diagnosis } from "../../types";
import { Typography, Box } from "@mui/material";
import EntryDetails from "./EntryDetails";

const PatientDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);


  useEffect(() => {
    if (!id) return;
    const fetchPatient = async () => {
      setLoading(true);
      try {
        const p: Patient = await patientService.getById(id);

        setPatient(p);
      } catch (e) {
        console.error(e);
        setError("Error loading patient");
      } finally {
        setLoading(false);
      }
    };

    const fetchDiagnosesForCode = async () => {
      try {
        const diagnoses: Diagnosis[] = await diagnosisService.getAllDiagnoses();
        setDiagnoses(diagnoses);
      } catch (e) {
        console.error(e);
      }
    };

    void fetchDiagnosesForCode();
    void fetchPatient();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!patient) return <div>No patient found</div>;

  return (
    <Box>
      <Typography variant="h5">{patient.name}</Typography>
      <Typography>Gender: {patient.gender}</Typography>
      <Typography>SSN: {patient.ssn ?? "—"}</Typography>
      <Typography>Occupation: {patient.occupation}</Typography>
      <br></br>
      <Typography variant="h6"> Entrites </Typography>
      <Typography> {patient.entries?.length === 0 ? "No entries" : ""} </Typography>

      <EntryDetails patient={patient} diagnoses={diagnoses} />
      
    </Box>

  );
};

export default PatientDetails;
