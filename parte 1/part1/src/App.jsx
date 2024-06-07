import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const StatisticLine = (props) =>
  <tr>
    <td>{props.text}</td>
    <td>{props.value}</td>
  </tr>;

const Statistics = (props) => {

  const total = props.good + props.neutral + props.bad;
  const average = props.good > props.bad ? (props.good - props.bad) / total : 0;
  const positive = props.good / total;

  if (total > 0) {
    return (
      <div>
        <h1>statistics</h1>
        <table>
          <thead>
            <tr>
              <td></td>
            </tr>
          </thead>
          <tbody>
            <StatisticLine text="good" value={props.good} />
            <StatisticLine text="neutral" value={props.neutral} />
            <StatisticLine text="bad" value={props.bad} />
            <StatisticLine text="all" value={total} />
            <StatisticLine text="average" value={average + '%'} />
            <StatisticLine text="positive" value={positive + '%'} />
          </tbody>
        </table>
      </div>
    )
  }
  else {
    return <div>
      <br></br>
      <p>No feedback given</p>
    </div>
  }
}


const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const createFunctionsAddStatistics = (currentFunction, currentValue) => {
    //console.log(currentValue);
    const returnFunction = () => currentFunction(currentValue + 1)
    return returnFunction
  }

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={createFunctionsAddStatistics(setGood, good)} text="good" />
      <Button handleClick={createFunctionsAddStatistics(setNeutral, neutral)} text="neutral" />
      <Button handleClick={createFunctionsAddStatistics(setBad, bad)} text="bad" />

      <Statistics good={good} neutral={neutral} bad={bad} />

    </div>
  )
}

export default App