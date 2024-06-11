import { useState } from 'react'

const App2 = () => {
    const anecdotes = [
        'If it hurts, do it more often.',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
        'The only way to go fast, is to go well.'
    ]

    const [selected, setSelected] = useState(0);
    const points = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0 };
    const [selectedPoints, setSelectedPoints] = useState(points);
    const copyPoints = { ...selectedPoints };
    let valVotes = false;

    const handleClickRandom = () => {
        const RandomNumber = Math.floor(Math.random() * 7) + 1;
        //console.log(RandomNumber);
        setSelected(RandomNumber);
    }

    const handleClickVote = () => {
        copyPoints[selected] += 1;
        setSelectedPoints(copyPoints)
        valVotes = true;
        console.log('copyPoints', copyPoints);
    }

    function mostVotes() {
        let maxProp = null;
        let maxVal = -Infinity;

        for (const prop in copyPoints) {

            if (copyPoints[prop] > maxVal) {
                maxVal = copyPoints[prop];
                maxProp = prop;
            }
        }
        return maxProp;
    }

    return (
        <div>
            {anecdotes[selected]}
            <h1>valor: {selected}</h1>
            <h3>has {copyPoints[selected]} votes</h3>
            <button onClick={handleClickVote}>Vote</button>
            <button onClick={handleClickRandom}>Next anecdote</button>
            <h3>Anecdote With Most Votes:</h3>
            <p>{anecdotes[mostVotes()]}</p>
            <p>has {copyPoints[mostVotes()]} votes</p>
        </div>
    )
}

export default App2