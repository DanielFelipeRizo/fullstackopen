import type {CoursePart} from "../types"

const Part = (props: CoursePart) => {
    return (
        <div>
            <p>{props.part.name} {props.part.exerciseCount}</p>
        </div>
    )
}

export default Part;