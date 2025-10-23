import type { DiaryEntry } from '../../src/types.ts'

const FlightsDiary = (diaries: { diaries: DiaryEntry[] }) => {
    console.log(diaries);
    
    return (
        <div>
            Diaries
            {diaries.diaries.map((diary) => (
                <div key={diary.id}>
                    <p>{diary.date} - {diary.weather} - {diary.visibility}</p>
                </div>
            ))}
        </div>);
}

export default FlightsDiary;