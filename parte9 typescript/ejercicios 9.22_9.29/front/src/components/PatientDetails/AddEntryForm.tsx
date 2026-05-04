import { useState, SyntheticEvent } from "react";
import { 
  TextField, 
  Grid, 
  Button, 
  Typography, 
  Box, 
  Alert, 
  Select, 
  MenuItem, 
  InputLabel, 
  FormControl, 
  OutlinedInput,
  Chip
} from "@mui/material";
import { EntryWithoutId, HealthCheckRating, Diagnosis } from "../../types";

interface Props {
  onSubmit: (values: EntryWithoutId) => void;
  onCancel: () => void;
  error?: string;
  diagnoses: Diagnosis[];
}

type EntryType = "HealthCheck" | "Hospital" | "OccupationalHealthcare";

const AddEntryForm = ({ onSubmit, onCancel, error, diagnoses }: Props) => {
  const [entryType, setEntryType] = useState<EntryType>("HealthCheck");
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(HealthCheckRating.Healthy);
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  
  // Hospital fields
  const [dischargeDate, setDischargeDate] = useState('');
  const [dischargeCriteria, setDischargeCriteria] = useState('');

  // Occupational Healthcare fields
  const [employerName, setEmployerName] = useState('');
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState('');
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState('');

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();

    const baseEntry = {
      description,
      date,
      specialist,
      diagnosisCodes: diagnosisCodes.length > 0 ? diagnosisCodes : undefined
    };

    switch (entryType) {
      case "HealthCheck":
        onSubmit({
          ...baseEntry,
          type: "HealthCheck",
          healthCheckRating
        });
        break;
      case "Hospital":
        onSubmit({
          ...baseEntry,
          type: "Hospital",
          discharge: {
            date: dischargeDate,
            criteria: dischargeCriteria
          }
        });
        break;
      case "OccupationalHealthcare":
        const occupationalEntry: EntryWithoutId = {
          ...baseEntry,
          type: "OccupationalHealthcare",
          employerName
        };
        if (sickLeaveStartDate && sickLeaveEndDate) {
          (occupationalEntry as any).sickLeave = {
            startDate: sickLeaveStartDate,
            endDate: sickLeaveEndDate
          };
        }
        onSubmit(occupationalEntry);
        break;
    }
  };

  return (
    <Box sx={{ border: '2px dashed #ccc', padding: 2, borderRadius: 2, marginBottom: 2 }}>
      <Typography variant="h6" gutterBottom>New Medical Entry</Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <form onSubmit={addEntry}>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Entry Type</InputLabel>
          <Select
            value={entryType}
            label="Entry Type"
            onChange={({ target }) => setEntryType(target.value as EntryType)}
          >
            <MenuItem value="HealthCheck">Health Check</MenuItem>
            <MenuItem value="Hospital">Hospital</MenuItem>
            <MenuItem value="OccupationalHealthcare">Occupational Healthcare</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Description"
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Date"
          type="date"
          fullWidth
          value={date}
          InputLabelProps={{ shrink: true }}
          onChange={({ target }) => setDate(target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
          sx={{ mb: 2 }}
        />

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Diagnosis Codes</InputLabel>
          <Select
            multiple
            value={diagnosisCodes}
            onChange={({ target }) => setDiagnosisCodes(typeof target.value === 'string' ? target.value.split(',') : target.value)}
            input={<OutlinedInput label="Diagnosis Codes" />}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
          >
            {diagnoses.map((d) => (
              <MenuItem key={d.code} value={d.code}>
                {d.code} - {d.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {entryType === "HealthCheck" && (
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Healthcheck rating</InputLabel>
            <Select
              value={healthCheckRating}
              label="Healthcheck rating"
              onChange={({ target }) => setHealthCheckRating(Number(target.value) as HealthCheckRating)}
            >
              <MenuItem value={HealthCheckRating.Healthy}>Healthy</MenuItem>
              <MenuItem value={HealthCheckRating.LowRisk}>Low Risk</MenuItem>
              <MenuItem value={HealthCheckRating.HighRisk}>High Risk</MenuItem>
              <MenuItem value={HealthCheckRating.CriticalRisk}>Critical Risk</MenuItem>
            </Select>
          </FormControl>
        )}

        {entryType === "Hospital" && (
          <>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>Discharge Info</Typography>
            <TextField
              label="Discharge Date"
              type="date"
              fullWidth
              value={dischargeDate}
              InputLabelProps={{ shrink: true }}
              onChange={({ target }) => setDischargeDate(target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Discharge Criteria"
              fullWidth
              value={dischargeCriteria}
              onChange={({ target }) => setDischargeCriteria(target.value)}
              sx={{ mb: 2 }}
            />
          </>
        )}

        {entryType === "OccupationalHealthcare" && (
          <>
            <TextField
              label="Employer Name"
              fullWidth
              value={employerName}
              onChange={({ target }) => setEmployerName(target.value)}
              sx={{ mb: 2 }}
            />
            <Typography variant="subtitle2" sx={{ mb: 1 }}>Sick Leave (Optional)</Typography>
            <Box display="flex" gap={2} sx={{ mb: 2 }}>
              <TextField
                label="Start Date"
                type="date"
                fullWidth
                value={sickLeaveStartDate}
                InputLabelProps={{ shrink: true }}
                onChange={({ target }) => setSickLeaveStartDate(target.value)}
              />
              <TextField
                label="End Date"
                type="date"
                fullWidth
                value={sickLeaveEndDate}
                InputLabelProps={{ shrink: true }}
                onChange={({ target }) => setSickLeaveEndDate(target.value)}
              />
            </Box>
          </>
        )}

        <Grid container justifyContent="space-between" mt={2}>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default AddEntryForm;
