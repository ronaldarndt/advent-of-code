import { readInput } from "../helper.js";

const lines = readInput(import.meta.url);

let priorities = 0;

let group: string[] = [];

for (const line of lines) {
  group.push(line);

  if (group.length < 3) continue;

  const [first, second, third] = group;

  const reocurrentChar = first
    .split("")
    .find(x => second.includes(x) && third.includes(x))!;

  const priority =
    reocurrentChar.charCodeAt(0) -
    "A".charCodeAt(0) -
    1 +
    (reocurrentChar === reocurrentChar.toUpperCase() ? 28 : -30);

  priorities += priority;
  group = [];
}

console.log(priorities);
