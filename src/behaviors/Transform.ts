import { Behavior, Vector, Box } from '../game'

export enum Corner {
  TOP_LEFT,
  TOP_RIGHT,
  BOTTOM_RIGHT,
  BOTTOM_LEFT
}

export class Transform extends Behavior {
  constructor(
    public x: number = 0,
    public y: number = 0,
    public width: number = 32,
    public height: number = 32
  ) {
    super('transform')
  }

  get(): [number, number, number, number] {
    return [this.x, this.y, this.width, this.height]
  }

  getSides(): Box {
    const [x, y, w, h] = this.get()
    const left = x
    const top = y
    const right = x + w
    const bottom = y + h

    return [left, top, right, bottom]
  }

  getCorners(): [Vector, Vector, Vector, Vector] {
    const [left, top, right, bottom] = this.getSides()

    const topLeft = new Vector(left, top)
    const topRight = new Vector(right, top)
    const bottomRight = new Vector(right, bottom)
    const bottomLeft = new Vector(left, bottom)

    return [topLeft, topRight, bottomRight, bottomLeft]
  }

  static DetectCollision(box1: Box, box2: Box): boolean {
    const [leftOf1, topOf1, rightOf1, bottomOf1] = box1
    const [leftOf2, topOf2, rightOf2, bottomOf2] = box2

    let verticalAlign: boolean, horizontalAlign: boolean

    if (rightOf1 > leftOf2 && leftOf1 < rightOf2) {
      horizontalAlign = true
    }
    if (bottomOf1 > topOf2 && topOf1 < bottomOf2) {
      verticalAlign = true
    }

    if (verticalAlign && horizontalAlign) {
      return true
    }

    return false
  }
}
