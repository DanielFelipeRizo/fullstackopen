interface exerciseValues {
  numDays: number;
  trainingDays: number;
  originalTarget: number;
  calculatedAverageTime: number;
  targetSuccess: boolean;
  rating: number;
  ratingDescription: string;
}

const parseArguments = (args: string[]): BmiValues => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    if (Number(args[2]) > 300 || Number(args[3]) > 300) {
      throw new Error("Values too high");
    }

    return {
      value1: Number(args[2]),
      value2: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

const multiplicator = (a: number, b: number, printText: string) => {
  console.log(printText, a * b);
};

type BmiCategory =
  | "Bajo peso (underweight)"
  | "Peso normal (normal weight)"
  | "Sobrepeso (overweight)"
  | "Obesidad (obesity)";

const getBmiCategory = (bmi: number): BmiCategory => {
  if (bmi < 18.5) return "Bajo peso (underweight)";
  if (bmi < 24.9) return "Peso normal (normal weight)";
  if (bmi < 29.9) return "Sobrepeso (overweight)";
  return "Obesidad (obesity)";
};

const bmiCalculator = (a: number, b: number, printText: string) => {
  const heightInMeters = b / 100;
  const bmi = a / (heightInMeters * heightInMeters);
  const category = getBmiCategory(bmi);

  console.log(`${printText} ${bmi.toFixed(2)} - ${category}`);
  // if(bmi < 18.5){
  //     console.log(printText, bmi, ' - Bajo peso (underweight)');
  // }
  // else if(bmi >= 18.5 && bmi < 24.9){
  //     console.log(printText, bmi, ' - Peso normal (normal weight)');
  // }
  // else if(bmi >= 25 && bmi < 29.9){
  //     console.log(printText, bmi, ' - Sobrepeso (overweight)');
  // }
  // else{
  //     console.log(printText, bmi, ' - Obesidad (obesity)');
  // }
  // console.log(printText, a / (heightInMeters * heightInMeters));
};

try {
  const { value1, value2 } = parseArguments(process.argv);
  //   multiplicator(value1, value2, `Multiplied ${value1} and ${value2}, the result is:`);
  bmiCalculator(
    value1,
    value2,
    `El peso: ${value1} kg y estatura: ${value2} cm, da como resultado:`
  );
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
