import { useState, useEffect } from 'react';
import FlightsDiary from './FlightsDiary.tsx';
import axios from 'axios';
import { Visibility, type DiaryEntry, type NewDiaryEntry, Weather } from '../../src/types.ts';

function App() {

  const [newDate, setNewDate] = useState('');
  const [newWeather, setNewWeather] = useState<Weather>(Weather.Sunny);
  const [newVisibility, setNewVisibility] = useState<Visibility>(Visibility.Great);
  const [newComment, setNewComment] = useState('');

  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    axios.get<DiaryEntry[]>('http://localhost:3000/api/diaries')
      .then(response => {
        // console.log(response.data);
        setDiaries(response.data);
      });
  }, []);

  const createFlightDiary = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const newDiary: NewDiaryEntry = {
      date: newDate,
      weather: newWeather,
      visibility: newVisibility,
      comment: newComment
    }

    try {

      const response = await axios.post<DiaryEntry>('http://localhost:3000/api/diaries', newDiary);

      console.log('response.data', response.data);

      setDiaries(diaries.concat(response.data));

      setNewDate('');
      setNewWeather(Weather.Sunny);
      setNewVisibility(Visibility.Great);
      setNewComment('');
    } catch (error) {

      if (axios.isAxiosError(error)) {
        // error.response puede ser undefined si el servidor no respondió
        console.error('Error de Axios:', error.response?.data || error.message);
        alert(`Error: ${error.response?.data || error.message}`);
      } else {
        console.error('Error desconocido:', error);
        alert('Ocurrió un error inesperado');
      }
    }
  };

  return (
    <div>
      <FlightsDiary diaries={diaries} />

      <div>
        <h2>Add New Flight Diary Entry</h2>
        <form onSubmit={createFlightDiary}>
          <div>
            date
            <input type='date' value={newDate} onChange={(event) => setNewDate(event.target.value)} />
          </div>

          <div>
            weather
            <select
              value={newWeather}
              onChange={({ target }) => setNewWeather(target.value as Weather)}
              required
            >
              <option value="" disabled>Select weather</option>
              {Object.values(Weather).map(w => <option key={w} value={w}>{w}</option>)}
            </select>


          </div>

          <div>
            visibility
            <select
              value={newVisibility}
              onChange={({ target }) => setNewVisibility(target.value as Visibility)}
            >
              <option value="" disabled>Select visibility</option>
              {Object.values(Visibility).map(v => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>

          </div>

          <div>
            comment
            <input
              value={newComment}
              onChange={({ target }) => setNewComment(target.value)}
            />
          </div>

          <button type="submit">Add Diary Entry</button>
        </form>
      </div >

    </div >
  )
}


export default App
