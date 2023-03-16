import { readInput } from "../helper.js";

type FoeShapes = "A" | "B" | "C";
type MyShapes = "X" | "Y" | "Z";

const shapePointsTable = {
  X: 1,
  Y: 2,
  Z: 3
};

const foeShapesMap: Record<FoeShapes, MyShapes> = {
  A: "X",
  B: "Y",
  C: "Z"
};

const lines = readInput(import.meta.url);

let points = 0;

for (const line of lines) {
  const [foe, me] = line.split(" ") as [FoeShapes, MyShapes];

  const draw = me === foeShapesMap[foe];

  const won =
    (me === "X" && foe !== "B") ||
    (me === "Y" && foe !== "C") ||
    (me === "Z" && foe !== "A");

  const roundPoints = shapePointsTable[me] + (draw ? 3 : won ? 6 : 0);

  points += roundPoints;
}

console.log(points);
