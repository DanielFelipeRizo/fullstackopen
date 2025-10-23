import diaries from '../../data/diaries.js';
import type { NonSensitiveDiaryEntry, DiaryEntry, NewDiaryEntry } from '../types.js';
import { v4 as uuidv4 } from 'uuid';

const getEntries = (): DiaryEntry[] => {
  return diaries;
};

const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
  return diaries.map(({ id, date, weather, visibility }) => ({
    id,
    date,
    weather,
    visibility,
  }));
};

const findById = (id: string): DiaryEntry | undefined => {
  const entry = diaries.find(d => d.id === id);
  return entry;
};

const addEntry = ( entry: NewDiaryEntry ): DiaryEntry => {

  const newDiaryEntry = {
    id: uuidv4(),
    ...entry
  }

  diaries.push(newDiaryEntry);
  return newDiaryEntry;
};

export default {
  getEntries,
  addEntry,
  getNonSensitiveEntries,
  findById
};
