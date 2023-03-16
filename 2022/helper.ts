import { readFileSync } from "fs";

export function readInput(base: string) {
  const lines = readFileSync(new URL("./input.txt", base), {
    encoding: "utf8"
  }).split("\r\n");

  return lines;
}
