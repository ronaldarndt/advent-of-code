import { fileURLToPath } from "url";
import { readFileSync } from "fs";
import * as path from "path";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

const lines = readFileSync(path.resolve(__dirname, "./input.txt"), {
  encoding: "utf8"
}).split("\r\n");

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
