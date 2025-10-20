import type { CourseAllParts } from "../types";

const Content = (props: CourseAllParts) => {

  
  return (
    <div>
      {props.courseParts.map((part) => (
        <p key={part.name}>
          {part.name} {part.exerciseCount}
        </p>
      ))}
    </div>
  )
}

export default Content;