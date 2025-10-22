import type { CoursePart } from "../types";

const assertNever = (value: never): never => {
    throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

const Part = ({ part }: { part: CoursePart }) => {
    switch (part.kind) {
        case "basic":
            return (
                <p>
                    <h4>{part.name}</h4>
                    {part.description} <br></br>
                    {part.exerciseCount}
                </p>
            );
        case "group":
            return (
                <p>
                    <h4>{part.name}</h4>
                    {part.exerciseCount} <br></br>
                    {part.groupProjectCount}
                </p>
            );
        case "background":
            return (
                <p>
                    <h4>{part.name}</h4>
                    {part.description} <br></br>
                    {part.exerciseCount} <br></br>
                    {part.backgroundMaterial}
                </p>
            );
        default:
            return assertNever(part);
    }
};

export default Part;