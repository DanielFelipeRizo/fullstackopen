import express from 'express';
import diaryService from '../services/diaryService.js';

const router = express.Router();

router.get('/', (_req, res) => {
  const result = diaryService.getNonSensitiveEntries()
  console.log('---------', result[0]);
  res.send(result);
})

router.post('/', (_req, res) => {
  res.send('Saving a diary!');
})

export default router;
