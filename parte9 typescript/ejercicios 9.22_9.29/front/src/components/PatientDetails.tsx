import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import patientService from "../services/patients";
import { Patient } from "../types";
import { Typography, Box } from "@mui/material";

const PatientDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetchPatient = async () => {
      setLoading(true);
      try {
        const p = await patientService.getById(id);
        setPatient(p);
      } catch (e) {
        console.error(e);
        setError("Error loading patient");
      } finally {
        setLoading(false);
      }
    };
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
    </Box>
  );
};

export default PatientDetails;
