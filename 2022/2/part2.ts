import { readInput } from "../helper.js";

type FoeShape = "A" | "B" | "C";
type ExpectedResult = "X" | "Y" | "Z";

const shapePointsTable = {
  X: 1,
  Y: 2,
  Z: 3
};

const foeShapesMap: Record<FoeShape, ExpectedResult> = {
  A: "X",
  B: "Y",
  C: "Z"
};

const lines = readInput(import.meta.url);

let points = 0;

for (const line of lines) {
  const [foe, expected] = line.split(" ") as [FoeShape, ExpectedResult];

  if (expected === "Y") {
    const normalizedShape = foeShapesMap[foe];

    points += 3 + shapePointsTable[normalizedShape];
  } else if (expected === "Z") {
    const winningShape = foe === "A" ? "Y" : foe === "B" ? "Z" : "X";

    points += 6 + shapePointsTable[winningShape];
  } else {
    const losingShape = foe === "A" ? "Z" : foe === "B" ? "X" : "Y";

    points += shapePointsTable[losingShape];
  }
}

console.log(points);
