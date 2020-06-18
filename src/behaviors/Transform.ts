import { Behavior, Vector } from '../game'

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

  getCorners(): [Vector, Vector, Vector, Vector] {
    const [x, y, w, h] = this.get()

    const topLeft = new Vector(x, y)
    const topRight = new Vector(x + w, y)
    const bottomLeft = new Vector(x, y + h)
    const bottomRight = new Vector(x + w, y + h)

    return [topLeft, topRight, bottomLeft, bottomRight]
  }

  static DetectCollision(
    transform1: Transform,
    transform2: Transform
  ): boolean {
    const [x1, y1, w1, h1] = transform1.get()
    const [x2, y2, w2, h2] = transform2.get()

    const leftOf1 = x1
    const topOf1 = y1
    const rightOf1 = x1 + w1
    const bottomOf1 = y1 + h1

    const leftOf2 = x2
    const topOf2 = y2
    const rightOf2 = x2 + w2
    const bottomOf2 = y2 + h2

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
