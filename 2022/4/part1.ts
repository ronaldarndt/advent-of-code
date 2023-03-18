import { readInput } from "../helper.js";

const lines = readInput(import.meta.url);

const count = lines.reduce((acc, line) => {
  const [first, second] = line.split(",");
  const [firstStart, firstEnd] = first.split("-").map(Number);
  const [secondStart, secondEnd] = second.split("-").map(Number);

  const isFullyContained =
    (firstStart <= secondStart && firstEnd >= secondEnd) ||
    (firstStart >= secondStart && firstEnd <= secondEnd);

  return acc + (isFullyContained ? 1 : 0);
}, 0);

console.log(count);
