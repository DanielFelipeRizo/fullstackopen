import diaries from '../../data/diaries.js';
import type { NonSensitiveDiaryEntry, DiaryEntry } from '../types.js';


const getEntries = (): DiaryEntry[] => {
  return diaries;
};

const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
  return diaries;
};

const addEntry = () => {
  return null;
};

export default {
  getEntries,
  addEntry,
  getNonSensitiveEntries
};