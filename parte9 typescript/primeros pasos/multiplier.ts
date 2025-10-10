const multiplicator = (a: number, b: number, printText: string) => {
  console.log(printText,  a * b);
}

export type Operation = "add" | "subtract" | "multiply" | "divide";

export const calculator = (a: number, b: number, operation: Operation): number =>{
  if(operation === "add") return a + b;
  if(operation === "subtract") return a - b;
  if(operation === "multiply") return a * b;
  if(operation === "divide") return a / b;
  throw new Error("Operation not supported");
}

const a: number = Number(process.argv[2])
const b: number = Number(process.argv[3])
multiplicator(a, b, `Multiplied ${a} and ${b}, the result is:`);
