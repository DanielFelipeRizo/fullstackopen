import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import patientService from "../../services/patients";
import diagnosisService from "../../services/diagnoses";
import { Patient, Diagnosis } from "../../types";
import { Typography, Box, Button } from "@mui/material";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';
import EntryDetails from "./EntryDetails";
import AddEntryForm from "./AddEntryForm";
import axios from "axios";
import { EntryWithoutId } from "../../types";

const PatientDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [formError, setFormError] = useState<string | null>(null);


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

  const submitNewEntry = async (values: EntryWithoutId) => {
    if (!id) return;
    try {
      const addedEntry = await patientService.addEntry(id, values);
      if (patient) {
        setPatient({
          ...patient,
          entries: (patient.entries || []).concat(addedEntry)
        });
      }
      setShowForm(false);
      setFormError(null);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace('Something went wrong. Error: ', '');
          console.error(message);
          setFormError(message);
        } else {
          setFormError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setFormError("Unknown error");
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!patient) return <div>No patient found</div>;

  return (
    <Box>
      <Typography variant="h5">
        {patient.name}
        {patient.gender === 'male' && <MaleIcon />}
        {patient.gender === 'female' && <FemaleIcon />}
        {patient.gender === 'other' && <TransgenderIcon />}
      </Typography>
      <Typography>SSN: {patient.ssn ?? "—"}</Typography>
      <Typography>Occupation: {patient.occupation}</Typography>
      <Box mt={3}>
        <Typography variant="h6">Entries</Typography>
        <Typography variant="body2" color="textSecondary">
          {patient.entries?.length === 0 ? "No entries yet" : ""}
        </Typography>
      </Box>

      {showForm ? (
        <AddEntryForm 
          onSubmit={submitNewEntry} 
          onCancel={() => setShowForm(false)} 
          error={formError ?? undefined}
          diagnoses={diagnoses}
        />
      ) : (
        <Button variant="contained" color="primary" onClick={() => setShowForm(true)} sx={{ mb: 2 }}>
          Add New Entry
        </Button>
      )}

      <EntryDetails patient={patient} diagnoses={diagnoses} />
      
    </Box>

  );
};

export default PatientDetails;
