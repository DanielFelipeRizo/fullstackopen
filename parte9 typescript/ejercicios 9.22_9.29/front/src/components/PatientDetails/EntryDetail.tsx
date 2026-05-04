import { Typography, Box } from "@mui/material";
import { Entry, Diagnosis, HealthCheckRating } from "../../types";
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import WorkIcon from '@mui/icons-material/Work';
import FavoriteIcon from '@mui/icons-material/Favorite';
import './details.css';

interface Props {
  entry: Entry;
  diagnoses: Diagnosis[];
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryDetail = ({ entry, diagnoses }: Props) => {
  const diagnosisCodes = entry.diagnosisCodes;

  const renderDiagnosisCodes = () => {
    if (!diagnosisCodes) return null;
    return (
      <Box className="diagnosis-div">
        <ul>
          {diagnosisCodes.map((code) => {
            const diagnosis = diagnoses.find((d) => d.code === code);
            return (
              <li key={code}>
                <Typography variant="body2">
                  {code} {diagnosis ? diagnosis.name : ""}
                </Typography>
              </li>
            );
          })}
        </ul>
      </Box>
    );
  };

  switch (entry.type) {
    case "HealthCheck":
      return (
        <Box className="entry-card">
          <Box display="flex" alignItems="center" gap={1}>
            <Typography variant="h6">{entry.date}</Typography>
            <MedicalServicesIcon />
          </Box>
          <Typography sx={{ fontStyle: "italic" }}>{entry.description}</Typography>
          <Box mt={1}>
            <FavoriteIcon className={`health-rating-${entry.healthCheckRating}`} />
            {HealthCheckRating[entry.healthCheckRating]}
          </Box>
          {renderDiagnosisCodes()}
          <Typography variant="body2" sx={{ mt: 1 }}>
            diagnose by {entry.specialist}
          </Typography>
        </Box>
      );

    case "Hospital":
      return (
        <Box className="entry-card">
          <Box display="flex" alignItems="center" gap={1}>
            <Typography variant="h6">{entry.date}</Typography>
            <LocalHospitalIcon />
          </Box>
          <Typography sx={{ fontStyle: "italic" }}>{entry.description}</Typography>
          <Box mt={1}>
            <Typography variant="body2">
              <strong>Discharge:</strong> {entry.discharge.date} - {entry.discharge.criteria}
            </Typography>
          </Box>
          {renderDiagnosisCodes()}
          <Typography variant="body2" sx={{ mt: 1 }}>
            diagnose by {entry.specialist}
          </Typography>
        </Box>
      );

    case "OccupationalHealthcare":
      return (
        <Box className="entry-card">
          <Box display="flex" alignItems="center" gap={1}>
            <Typography variant="h6">{entry.date}</Typography>
            <WorkIcon />
            <Typography variant="h6">{entry.employerName}</Typography>
          </Box>
          <Typography sx={{ fontStyle: "italic" }}>{entry.description}</Typography>
          {entry.sickLeave && (
            <Box mt={1}>
              <Typography variant="body2">
                <strong>Sick Leave:</strong> {entry.sickLeave.startDate} to {entry.sickLeave.endDate}
              </Typography>
            </Box>
          )}
          {renderDiagnosisCodes()}
          <Typography variant="body2" sx={{ mt: 1 }}>
            diagnose by {entry.specialist}
          </Typography>
        </Box>
      );

    default:
      return assertNever(entry);
  }
};

export default EntryDetail;
