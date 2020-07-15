import { Vector } from '..'

export enum Side {
  LEFT,
  TOP,
  RIGHT,
  BOTTOM,
  NONE
}

export enum Corner {
  TOP_LEFT,
  TOP_RIGHT,
  BOTTOM_RIGHT,
  BOTTOM_LEFT,
  NONE
}

export type Corners = {
  topLeft: Vector
  topRight: Vector
  bottomRight: Vector
  bottomLeft: Vector
}

export class Box {
  constructor(
    public x: number = 0,
    public y: number = 0,
    public w: number = 32,
    public h: number = 32
  ) {}

  get(): [number, number, number, number] {
    return [this.x, this.y, this.w, this.h]
  }

  getSides(): [number, number, number, number] {
    return [this.left(), this.top(), this.right(), this.bottom()]
  }

  left(): number {
    return this.x
  }
  top(): number {
    return this.y
  }
  right(): number {
    return this.x + this.w
  }
  bottom(): number {
    return this.y + this.h
  }

  getCorners(): Corners {
    const [left, top, right, bottom] = this.getSides()

    const topLeft = new Vector(left, top)
    const topRight = new Vector(right, top)
    const bottomRight = new Vector(right, bottom)
    const bottomLeft = new Vector(left, bottom)

    return { topLeft, topRight, bottomRight, bottomLeft }
  }

  getFloored(): [number, number, number, number] {
    const x = Math.floor(this.x)
    const y = Math.floor(this.y)
    const w = Math.floor(this.w)
    const h = Math.floor(this.h)

    return [x, y, w, h]
  }

  isCollidingWith(other: Box): boolean {
    if (other.left() > this.right()) {
      return false
    }
    if (other.right() < this.left()) {
      return false
    }
    if (other.top() > this.bottom()) {
      return false
    }
    if (other.bottom() < this.top()) {
      return false
    }
    return true
  }
}
