import { readInput } from "../helper.js";

type Command = "cd" | "ls";

type Dir = {
  [key: string]: number | Dir;
};

const lines = readInput(import.meta.url);

const SEPARATOR = "/";
const MAX = 100000;

const tree: Dir = { "/": {} };
let lastCommand: Command = "cd";
let cwd = "";

for (const line of lines) {
  if (line.startsWith("$")) {
    const [_, command, arg] = line.split(" ");
    lastCommand = command as Command;

    if (lastCommand === "cd") {
      handleCd(arg);
    }
    continue;
  }

  if (lastCommand === "ls") {
    const [type, name] = line.split(" ");
    const currentDir = getDir(cwd);

    currentDir[name] = type === "dir" ? {} : Number(type);
  }
}

console.log(tree);
console.log(calculateResult());

function handleCd(path: string) {
  if (path === "..") {
    cwd = cwd.split(SEPARATOR).slice(0, -1).join(SEPARATOR);
    return;
  }

  const sep = cwd ? SEPARATOR : "";

  cwd += sep + path;
}

function getDir(path: string) {
  const root = tree["/"];

  return path
    .split(SEPARATOR)
    .filter(Boolean)
    .reduce(
      (dir, dirName) => (typeof dir === "object" ? dir[dirName] : dir),
      root
    ) as Record<string, number | Dir>;
}

function calculateResult(path = "/") {
  const root = getDir(path);
  let result = 0;

  const rootSize = calculateDirSize(root);

  if (rootSize <= MAX) {
    result += rootSize;
  }

  for (const [key, value] of Object.entries(root)) {
    if (typeof value === "number") continue;

    result += calculateResult(path + "/" + key);
  }

  return result;
}

function calculateDirSize(dir: Dir): number {
  return Object.values(dir).reduce(
    (acc: number, v) => acc + (typeof v === "number" ? v : calculateDirSize(v)),
    0
  );
}
