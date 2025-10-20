export interface CourseTitle {
  courseName: string;
}

interface CoursePart {
  name: string;
  exerciseCount: number;
}

export interface CourseAllParts {
  courseParts: CoursePart[];
}


export interface TotalExercises {
  totalExercises: number;
}
