import { Behavior, Collision, CollisionSide, GameObject, Vector } from '../game'
import { Transform } from './Transform'

export class BoxCollider extends Behavior {
  private lastPos: Vector = new Vector()

  constructor() {
    super('boxCollider')
  }

  // Override
  preUpdate() {
    this.lastPos.x = this.parent.transform.x
    this.lastPos.y = this.parent.transform.y
  }

  // Override
  postUpdate() {
    const { game } = this.parent
    game.getGameObjects().forEach((gameObject: GameObject) => {
      if (gameObject === this.parent) return

      const isColliding = Transform.DetectCollision(
        this.parent.transform,
        gameObject.transform
      )

      if (!isColliding) return

      const collision: Collision = {
        side: CollisionSide.LEFT,
        gameObject
      }

      this.parent.onCollision(collision)
    })
  }

  // Override
  onAdd() {
    this.parent.boxCollider = this
  }

  getLastPos(): Vector {
    return { ...this.lastPos }
  }

  private getCollisionSide(other: GameObject): CollisionSide {
    const parentVelocity = new Vector(
      this.parent.transform.x - this.lastPos.x,
      this.parent.transform.y - this.lastPos.y
    )
    const otherVelocity = new Vector(
      other.transform.x - other.boxCollider.getLastPos().x,
      other.transform.y - other.boxCollider.getLastPos().y
    )

    const netVelocity = new Vector(
      parentVelocity.x - otherVelocity.x,
      parentVelocity.y - otherVelocity.y
    )

    const corners = this.parent.transform.getCorners()

    const corner = this.getLeadingCorner(corners, netVelocity)

    // const trajectory = (netVelocity.y / netVelocity.x) * ()

    return CollisionSide.LEFT
  }

  private getLeadingCorner(
    corners: [Vector, Vector, Vector, Vector],
    velocity: Vector
  ): Vector {
    const [topLeft, topRight, bottomLeft, bottomRight] = corners

    if (velocity.y < 0) {
      if (velocity.x < 0) {
        return topLeft
      }
      return topRight
    }
    if (velocity.x < 0) {
      return bottomLeft
    }
    return bottomRight
  }
}
