import { fileURLToPath } from "url";
import { readFileSync } from "fs";
import * as path from "path";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

const lines = readFileSync(path.resolve(__dirname, "./input.txt"), {
  encoding: "utf8"
}).split("\r\n");
