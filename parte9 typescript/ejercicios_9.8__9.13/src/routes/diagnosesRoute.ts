import express from 'express';
import diagnosisService from '../services/diagnosisService.js';

const router = express.Router();

router.get('/', (_req, res) => {
    const result = diagnosisService.getDiagnoses();
    return res.send(result);
})

export default router;


