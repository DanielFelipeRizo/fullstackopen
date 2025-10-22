import { useState, useEffect } from 'react'
import FlightsDiary from './FlightsDiary.tsx'
import axios from 'axios'
import type {DiaryEntry} from '../../src/types.ts'

  function App() {


    const [newDiary, setNewDiary] = useState('');
    const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

    useEffect(() => {
      axios.get<DiaryEntry[]>('http://localhost:3000/api/diaries')
        .then(response => {
          console.log(response.data);
          setDiaries(response.data);
        });
    }, []);

    return (
      <div>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
      </div>
    )
  }

export default App
