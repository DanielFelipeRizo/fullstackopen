interface exerciseValues {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const parseArrArguments = (args: string[]): number[] => {

  if (args.length < 3) throw new Error("Not enough arguments");

  // Tomamos todos los argumentos desde la posición 2 en adelante
  const arrDays = args.slice(2).map((arg, index) => {
    const value = Number(arg);

    if (isNaN(value)) {
      throw new Error(`Argument at position ${index + 2} ('${arg}') is not a number`);
    }

    if (value > 24) {
      throw new Error(`Argument at position ${index + 2} ('${arg}') exceeds 24`);
    }

    if (value < 0) {
      throw new Error(`Argument at position ${index + 2} ('${arg}') is negative`);
    }

    return value;
  });

  return arrDays;
};



const calculator = (arrDays: number[]): exerciseValues => {

  // const arrDays: number[] = arrValues;
  const target: number = arrDays.pop() || 0;

  const periodLength: number = arrDays.length;

  const trainingDays: number = (arrDays.filter(d => d > 0).length);

  const average: number = arrDays.reduce((a, b) => a + b, 0) / periodLength;

  type Rating = 1 | 2 | 3;

  let rating: Rating = 1;
  let ratingDescription: string = '';
  let success: boolean = false;

  if (average >= target) {
    rating = 3;
    ratingDescription = 'Muy bien, objetivo cumplido';
    success = true;
  } else if (average >= target / 2) {
    rating = 2;
    ratingDescription = 'No está mal, pero podrías hacerlo mejor';
  }
  else if (average < target / 2) {
    rating = 1;
    ratingDescription = 'Vamos, que no has hecho nada';
  }

  return {
    periodLength: periodLength,
    trainingDays: trainingDays,
    success: success,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: average,
  };

};

try {
  const validatedArray = parseArrArguments(process.argv);
  console.log(calculator(validatedArray));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
