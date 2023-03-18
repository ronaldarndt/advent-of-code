import { readInput } from "../helper.js";

const lines = readInput(import.meta.url);

let priorities = 0;

for (const line of lines) {
  const middleIndex = line.length / 2;
  const start = line.slice(0, middleIndex);
  const end = line.slice(middleIndex);

  const reocurrentChar = start.split("").find(x => end.includes(x));

  if (!reocurrentChar) continue;

  const priority =
    reocurrentChar.charCodeAt(0) -
    "A".charCodeAt(0) -
    1 +
    (reocurrentChar === reocurrentChar.toUpperCase() ? 28 : -30);

  priorities += priority;
}

console.log(priorities);
