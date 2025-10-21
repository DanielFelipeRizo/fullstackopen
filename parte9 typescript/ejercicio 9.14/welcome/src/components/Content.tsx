import type { CourseAllParts } from "../types";
import Part from "./Part";

const Content = (props: CourseAllParts) => {

  // console.log(props.courseParts);

  return (
    <div>
      {props.courseParts.map((part) => (
        <Part key={`${part.name}-${part.kind}`} part={part} />
      ))}
    </div>
  );
};

export default Content;
