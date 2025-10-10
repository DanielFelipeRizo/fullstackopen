interface BmiValues {
  value1: number;
  value2: number;
}

export const parseArguments = (args: string[]): BmiValues => {
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

export const parseArgumentsUrl = (args: string[]): BmiValues => {

  if (!isNaN(Number(args[0])) && !isNaN(Number(args[1]))) {
    if (Number(args[0]) > 300 || Number(args[1]) > 300) {
      throw new Error("Values too high");
    }

    return {
      value1: Number(args[0]),
      value2: Number(args[1]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
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

export const bmiCalculator = (a: number, b: number) => {
  const heightInMeters = b / 100;
  const bmi = a / (heightInMeters * heightInMeters);
  const category = getBmiCategory(bmi);

  // console.log(`${printText} ${bmi.toFixed(2)} - ${category}`);
  return { bmi: bmi.toFixed(2), category };

};

try {
  const { value1, value2 } = parseArguments(process.argv);
  bmiCalculator(
    value1,
    value2
  );
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}

export default { bmiCalculator }