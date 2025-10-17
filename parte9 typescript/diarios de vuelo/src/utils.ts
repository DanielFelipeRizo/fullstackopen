import type { NewDiaryEntry } from './types.js';

const toNewDiaryEntry = (object: unknown): NewDiaryEntry => {

    console.log(object); // now object is no longer unused
    const newEntry: NewDiaryEntry = {
        weather: 'cloudy', // fake the return value
        visibility: 'great',
        date: '2022-1-1',
        comment: 'fake news'
    };
    return newEntry;
}

const parseComment = (comment: unknown): string => {
  if (!comment || !isString(comment)) {
    throw new Error('Incorrect or missing comment');
  }

  return comment;
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

export default toNewDiaryEntry;