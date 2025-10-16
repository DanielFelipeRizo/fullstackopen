import express from 'express';
import patientService from '../services/patientService.js';

const router = express.Router();

router.get('/', (_req, res) => {
    const result = patientService.getPatients();
    return res.send(result);
})

export default router;
