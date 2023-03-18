import { readInput } from "../helper.js";

const lines = readInput(import.meta.url);

const stacks: Array<Array<string>> = Array.from({
  length: (lines[0].length + 1) / 4
}).map(() => []);

let hasReadStartValues = false;

for (const line of lines) {
  if (!line.trim()) {
    hasReadStartValues = true;
    continue;
  } else if (!hasReadStartValues) {
    for (let part = 0; part < stacks.length; part++) {
      const str = line.slice(part * 4);
      const value = str[1];

      if (isNumeric(value)) break;

      if (value.trim()) stacks[part].unshift(value);
    }

    continue;
  }

  const matches = /move (?<amount>\d+) from (?<from>\d+) to (?<to>\d+)/.exec(
    line
  );

  const [amount, from, to] = [
    matches?.groups?.amount,
    matches?.groups?.from,
    matches?.groups?.to
  ].map(Number);

  const origin = stacks[from - 1];
  const values = origin.splice(origin.length - amount, amount);

  stacks[to - 1].push(...values);
}

console.log(stacks.map(x => x.at(-1)).join(""));

function isNumeric(value: string) {
  return /^-?\d+$/.test(value);
}
