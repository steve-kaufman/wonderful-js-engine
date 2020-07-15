export enum Direction {
  LEFT,
  UP,
  RIGHT,
  DOWN,
  UP_LEFT,
  UP_RIGHT,
  DOWN_LEFT,
  DOWN_RIGHT,
  NONE
}

export class Vector {
  constructor(public x: number = 0, public y: number = 0) {}

  toDirection(): Direction {
    if (this.x == 0 && this.y == 0) {
      return Direction.NONE
    }

    // Single Directions
    if (this.x == 0) {
      return this.y > 0 ? Direction.DOWN : Direction.UP
    }
    if (this.y == 0) {
      return this.x > 0 ? Direction.RIGHT : Direction.LEFT
    }

    // Diagonal Directions
    if (this.x > 0) {
      return this.y > 0 ? Direction.DOWN_RIGHT : Direction.UP_RIGHT
    }

    return this.y > 0 ? Direction.DOWN_LEFT : Direction.UP_LEFT
  }
}
