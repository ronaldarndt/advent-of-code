import { readInput } from "../helper.js";

const lines = readInput(import.meta.url).map(x => x.split("").map(Number));

const MAX_HEIGHT = 9;

const foundTable: string[] = [];

let visible = lines[0].length * 2 + lines.length * 2 - 4;

for (let rowIndex = 1; rowIndex < lines.length - 1; rowIndex++) {
  checkVisibleFromLeft(rowIndex);
  checkVisibleFromRight(rowIndex);
}

checkVisibleFromTop();
checkVisibleFromBottom();

console.log(visible);

function checkVisibleFromLeft(rowIndex: number) {
  const row = lines[rowIndex];

  for (let colIndex = 1; colIndex < row.length - 1; colIndex++) {
    const height = row[colIndex];

    const visibleFromLeft = row.slice(0, colIndex).every(x => x < height);

    if (visibleFromLeft) {
      handleFound(rowIndex, colIndex);
    }

    if (height === MAX_HEIGHT) {
      break;
    }
  }
}

function checkVisibleFromRight(rowIndex: number) {
  const row = lines[rowIndex];

  for (let colIndex = row.length - 2; colIndex >= 1; colIndex--) {
    if (checkAlreadyFound(rowIndex, colIndex)) continue;

    const height = row[colIndex];

    const visibleFromRight = row.slice(colIndex + 1).every(x => x < height);

    if (visibleFromRight) {
      handleFound(rowIndex, colIndex);
    }

    if (height === MAX_HEIGHT) {
      break;
    }
  }
}

function checkVisibleFromTop() {
  for (let colIndex = 1; colIndex < lines[0].length - 1; colIndex++) {
    for (let rowIndex = 1; rowIndex < lines.length - 1; rowIndex++) {
      if (checkAlreadyFound(rowIndex, colIndex)) continue;

      const height = lines[rowIndex][colIndex];

      const visibleFromTop = getColValues(colIndex, 0, rowIndex).every(
        x => x < height
      );

      if (visibleFromTop) {
        handleFound(rowIndex, colIndex);
      }

      if (height === MAX_HEIGHT) {
        break;
      }
    }
  }
}

function checkVisibleFromBottom() {
  for (let colIndex = 1; colIndex < lines[0].length - 1; colIndex++) {
    for (let rowIndex = lines.length - 2; rowIndex >= 1; rowIndex--) {
      if (checkAlreadyFound(rowIndex, colIndex)) continue;

      const height = lines[rowIndex][colIndex];

      const visibleFromBottom = getColValues(colIndex, rowIndex + 1).every(
        x => x < height
      );

      if (visibleFromBottom) {
        handleFound(rowIndex, colIndex);
      }

      if (height === MAX_HEIGHT) {
        break;
      }
    }
  }
}

function getColValues(colIndex: number, from: number, to?: number) {
  return lines.slice(from, to).map(r => r[colIndex]);
}

function checkAlreadyFound(rowIndex: number, colIndex: number) {
  return foundTable.includes(`${rowIndex}.${colIndex}`);
}

function handleFound(rowIndex: number, colIndex: number) {
  foundTable.push(`${rowIndex}.${colIndex}`);
  visible += 1;
}
