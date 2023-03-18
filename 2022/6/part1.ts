import { readInput } from "../helper.js";

const lines = readInput(import.meta.url);
const line = lines[0];

const MARKER_LENGTH = 4;

const sequence: string[] = [];
let packetStart = 0;

for (let index = 0; index < line.length; index++) {
  if (sequence.length === MARKER_LENGTH) {
    sequence.shift();
  }

  const char = line[index];

  sequence.push(char);

  if (
    sequence.length === MARKER_LENGTH &&
    !sequence.some((v, i) => sequence.lastIndexOf(v) !== i)
  ) {
    packetStart = index + 1;
    break;
  }
}

console.log(packetStart);
