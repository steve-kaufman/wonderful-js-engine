import { Corner, GameObject, Side, Vector } from '..'
import { BoxCollider } from '../behaviors'
import { Direction } from './Vector'

export type GameObjectWithBoxCollider = GameObject & {
  boxCollider: BoxCollider
}

/**
 * A Collision instance keeps track of whether the 'other' GameObject is
 * colliding with its 'parent' GameObject.
 *
 * It calls the parent's onCollisionEnter() method on initialization,
 * continuously calls the parent's onCollision() method in update(),
 * and calls the parent's onCollisionExit() and deletes itself when the two
 * GameObjects are no longer colliding.
 */
export class Collision {
  readonly side: Side

  private directionToCollisionSide = new Map<Direction, (arg: boolean) => Side>(
    [
      [Direction.NONE, () => Side.NONE],
      [Direction.LEFT, () => Side.LEFT],
      [Direction.UP, () => Side.TOP],
      [Direction.RIGHT, () => Side.RIGHT],
      [Direction.DOWN, () => Side.BOTTOM],
      [
        Direction.UP_LEFT,
        (hitAbove: boolean) => (hitAbove ? Side.LEFT : Side.TOP)
      ]
    ]
  )

  constructor(
    readonly parent: GameObjectWithBoxCollider,
    readonly other: GameObjectWithBoxCollider
  ) {
    this.side = this.getCollisionSide()

    this.parent.onCollisionEnter(this.other, this.side)
  }

  private getLeadingCorners(): [Vector, Vector] {
    const parentCorner = this.parent.boxCollider.getLeadingCorner()
    const otherCorner = this.other.boxCollider.getLeadingCorner()

    if (!parentCorner || !otherCorner) {
      throw new Error(
        `Leading corners don't exist on ${this.parent.id} or ${this.other.id}!`
      )
    }

    return [parentCorner, otherCorner]
  }

  private didParentCornerHitAboveOtherCorner(): boolean {
    const trajectory = this.parent.boxCollider.getTrajectory()
    const [parentCorner, otherCorner] = this.getLeadingCorners()

    if (!trajectory) {
      throw new Error(`No trajectory on ${this.parent.id}`)
    }

    const hitY = trajectory * (otherCorner.x - parentCorner.x) + parentCorner.y

    return hitY < otherCorner.y
  }

  private getCollisionSide(): Side {
    const direction = this.parent.boxCollider.getVelocity().toDirection()

    const sideFromDirection = this.directionToCollisionSide.get(direction)

    if (sideFromDirection) {
      return sideFromDirection
    }

    switch (direction) {
      case Direction.NONE:
        return Side.NONE
      case Direction.LEFT:
        return Side.LEFT
      case Direction.RIGHT:
        return Side.RIGHT
      case Direction.UP:
        return Side.TOP
      case Direction.DOWN:
        return Side.BOTTOM
    }

    // Parent must be moving diagonally

    const hitAbove = this.didParentCornerHitAboveOtherCorner()

    switch (direction) {
      case Direction.UP_LEFT:
        return hitAbove ? Side.LEFT : Side.TOP
      case Direction.UP_RIGHT:
        return hitAbove ? Side.RIGHT : Side.TOP
      case Direction.DOWN_LEFT:
        return hitAbove ? Side.BOTTOM : Side.LEFT
      case Direction.DOWN_RIGHT:
        return hitAbove ? Side.BOTTOM : Side.RIGHT
    }
  }

  private didCollisionExit() {
    return !this.parent.box.isCollidingWith(this.other.box)
  }

  private handleCollisionExit() {
    this.parent.onCollisionExit(this.other)
    this.delete()
  }

  update() {
    if (this.didCollisionExit()) {
      this.handleCollisionExit()
      return
    }

    this.parent.onCollision(this.other)
  }

  delete() {
    this.parent.boxCollider.deleteCollision(this.parent)
  }
}
