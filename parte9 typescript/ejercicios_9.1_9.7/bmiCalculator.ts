interface BmiValues {
    value1: number;
    value2: number;
}

const parseArguments = (args: string[]): BmiValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {

        if (Number(args[2]) > 300 || Number(args[3]) > 300) {
            throw new Error('Values too high');
        }

        return {
            value1: Number(args[2]),
            value2: Number(args[3])
        }

    } else {
        throw new Error('Provided values were not numbers!');
    }

}

const multiplicator = (a: number, b: number, printText: string) => {
    console.log(printText, a * b);
}

const bmiCalculator = (a: number, b: number, printText: string) => {
    const heightInMeters = b / 100;
    console.log(printText, a / (heightInMeters * heightInMeters));
}

try {
    const { value1, value2 } = parseArguments(process.argv);
    //   multiplicator(value1, value2, `Multiplied ${value1} and ${value2}, the result is:`);
    bmiCalculator(value1, value2, `El peso: ${value1} kg y estatura: ${value2} cm, da como resultado:`);
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.'
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}
