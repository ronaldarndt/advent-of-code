import { readInput } from "../helper.js";

const lines = readInput(import.meta.url);

const top = [0];
let current = 0;

for (const line of lines) {
  if (line) {
    current += Number(line);
    continue;
  }

  if (current > top[0]) {
    if (top.length === 3) top.shift();

    top.push(current);
    top.sort();
  }

  current = 0;
}

console.log(top.reduce((a, b) => a + b, 0));
