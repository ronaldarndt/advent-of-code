import { readInput } from "../helper.js";

type Coordinate = `${number}.${number}`;
type Direction = "U" | "L" | "R" | "D";

class Knot {
  private static directionOffsets = {
    U: ["y", -1],
    D: ["y", 1],
    R: ["x", 1],
    L: ["x", -1]
  } as const;

  private visited = new Set<Coordinate>(["0.0"]);

  constructor(private x: number, private y: number) {}

  move(direction: Direction, positions: number, markAsVisited = true) {
    const [prop, offset] = Knot.directionOffsets[direction];

    for (let i = 0; i < positions; i++) {
      this[prop] += 1 * offset;

      if (markAsVisited) {
        this.visited.add(`${this.x}.${this.y}`);
      }
    }
  }

  calculateDistance(other: Knot) {
    const xDist = other.x - this.x;
    const yDist = other.y - this.y;

    return [xDist, yDist] as const;
  }

  moveCloser(other: Knot) {
    const [xDist, yDist] = this.calculateDistance(other);
    const xDirection = this.getDistanceDirection("x", xDist);
    const yDirection = this.getDistanceDirection("y", yDist);
    const absXDist = Math.abs(xDist);
    const absYDist = Math.abs(yDist);

    if (absXDist && absYDist && absXDist + absYDist > 2) {
      this.move(xDirection, 1, false);
      this.move(yDirection, 1);

      this.moveCloser(other);
    } else if (absXDist > 1) {
      this.move(xDirection, absXDist - 1);
    } else if (absYDist > 1) {
      this.move(yDirection, absYDist - 1);
    }
  }

  getDistanceDirection(plane: "x" | "y", distance: number) {
    if (plane === "x") {
      return distance > 0 ? "R" : "L";
    }

    return distance > 0 ? "D" : "U";
  }

  getTotalVisited() {
    return this.visited.size;
  }
}

const lines = readInput(import.meta.url);

const head = new Knot(0, 0);
const tail = new Knot(0, 0);

for (const line of lines) {
  const [dir, positions] = line.split(" ");

  head.move(dir as Direction, Number(positions), false);
  tail.moveCloser(head);
}

console.log(tail.getTotalVisited());
