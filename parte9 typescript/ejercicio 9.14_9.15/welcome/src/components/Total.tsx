import type { TotalExercises } from "../types";

const Total = (props: TotalExercises) => {
  return (
    <div>
      <p>Number of exercises {props.totalExercises}</p>
    </div>
  )
}

export default Total;