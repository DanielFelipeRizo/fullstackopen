//exercises 2.1 - 2.5
const Header = ({ course }) => <div><h1>{course.name}</h1></div>

const Part = ({ name, exercises }) => <li>{name}: {exercises}</li>

const Content = ({ parts }) => {
    return (
        <ul>
            {parts.map((p, i) => <Part key={i} name={p.name} exercises={p.exercises} />)}
        </ul>
    )
}

const Total = ({ parts }) => {
    const total = parts.reduce( (sum, parts) => (sum + parts.exercises) , 0 )
    return (
        <div>
            <h4>Number of exercise: {total}</h4>
        </div>
    )
}

const Course = ({ course }) => {
    return (
        <div>
            <Header course={course} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

export default Course