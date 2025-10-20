import diagnosesData from '../../data/diagnoses.js';
import type { Diagnosis } from '../types.js';

const getDiagnoses = (): Diagnosis[] => {
    return diagnosesData;
}

export default {
    getDiagnoses
}
