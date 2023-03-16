import { readInput } from "../helper.js";

const lines = readInput(import.meta.url);

let max = 0;
let current = 0;

for (const line of lines) {
  if (line) {
    current += Number(line);
    continue;
  }

  if (current > max) {
    max = current;
  }

  current = 0;
}

console.log(max);
