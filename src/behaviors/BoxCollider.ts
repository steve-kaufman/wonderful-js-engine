import { Behavior, CollisionSide, GameObject, Vector } from '..'
import { Corner, Transform } from '.'

export class BoxCollider extends Behavior {
  private lastPos: Vector = new Vector()

  private collisions: Map<string, GameObject> = new Map()

  readonly isSolid: boolean

  constructor(options = { solid: true }) {
    super('boxCollider')
    this.isSolid = options.solid
  }

  // Override
  preUpdate() {
    this.lastPos.x = this.parent.transform.x
    this.lastPos.y = this.parent.transform.y

    this.collisions.forEach(gameObject => {
      if (
        !Transform.DetectCollision(
          this.parent.transform.getSides(),
          gameObject.transform.getSides()
        )
      ) {
        this.removeCollision(gameObject.id)
      }
    })
  }

  // Override
  postUpdate() {
    const { game } = this.parent
    game.getGameObjects().forEach((gameObject: GameObject) => {
      if (gameObject === this.parent) return

      if (gameObject.boxCollider === undefined) return

      const isColliding = Transform.DetectCollision(
        this.parent.transform.getSides(),
        gameObject.transform.getSides()
      )

      if (!isColliding) {
        const wasColliding = this.collisions.delete(gameObject.id)

        if (wasColliding) {
          this.parent.onCollisionExit({
            side: null,
            gameObject
          })
        }

        return
      }

      let side: CollisionSide

      if (!this.isCollidingWith(gameObject.id)) {
        side = this.getCollisionSide(
          gameObject as GameObject & { boxCollider: BoxCollider }
        )
        this.parent.onCollisionEnter({ side, gameObject })
        this.collisions.set(gameObject.id, gameObject)
      }

      this.parent.onCollision({ side: null, gameObject })
    })
  }

  // Override
  onAdd() {
    this.parent.boxCollider = this
  }

  getLastPos(): Vector {
    return { ...this.lastPos }
  }

  isCollidingWith(gameObjectId: string): boolean {
    return this.collisions.has(gameObjectId)
  }

  removeCollision(gameObjectId: string) {
    this.collisions.delete(gameObjectId)
  }

  private getCollisionSide(
    other: GameObject & { boxCollider: BoxCollider }
  ): CollisionSide {
    // Get velocity of parent GameObject
    const parentVelocity = new Vector(
      this.parent.transform.x - this.lastPos.x,
      this.parent.transform.y - this.lastPos.y
    )
    // Get velocity of other GameObject
    const otherVelocity = new Vector(
      other.transform.x - other.boxCollider.getLastPos().x,
      other.transform.y - other.boxCollider.getLastPos().y
    )

    // Subtract other velocity from parent velocity
    const netVelocity = new Vector(
      parentVelocity.x - otherVelocity.x,
      parentVelocity.y - otherVelocity.y
    )

    // If only moving in one direction, corners don't matter
    if (netVelocity.x === 0) {
      if (netVelocity.y < 0) {
        return CollisionSide.TOP
      } else if (netVelocity.y > 0) {
        return CollisionSide.BOTTOM
      }
      return CollisionSide.NONE
    } else if (netVelocity.y === 0) {
      if (netVelocity.x < 0) {
        return CollisionSide.LEFT
      } else if (netVelocity.x > 0) {
        return CollisionSide.RIGHT
      }
      return CollisionSide.NONE
    }

    // Find 'leading corners' of collision
    const corners = this.parent.transform.getCorners()
    const cornerIndex = this.getLeadingCorner(corners, netVelocity)
    const parentCorner = corners[cornerIndex]
    const otherCorner = other.transform.getCorners()[(cornerIndex + 2) % 4]

    const trajectory =
      (netVelocity.y / netVelocity.x) * (otherCorner.x - parentCorner.x) +
      parentCorner.y

    if (trajectory > otherCorner.y) {
      if (cornerIndex === Corner.TOP_LEFT || cornerIndex === Corner.TOP_RIGHT) {
        return CollisionSide.TOP
      }
      if (cornerIndex === Corner.BOTTOM_LEFT) return CollisionSide.LEFT
      return CollisionSide.RIGHT
    }
    if (
      cornerIndex === Corner.BOTTOM_LEFT ||
      cornerIndex === Corner.BOTTOM_RIGHT
    ) {
      return CollisionSide.BOTTOM
    }
    if (cornerIndex === Corner.TOP_LEFT) return CollisionSide.LEFT
    return CollisionSide.RIGHT
  }

  private getLeadingCorner(
    corners: [Vector, Vector, Vector, Vector],
    velocity: Vector
  ): Corner {
    if (velocity.y < 0) {
      if (velocity.x < 0) {
        return Corner.TOP_LEFT
      }
      return Corner.TOP_RIGHT
    }
    if (velocity.x < 0) {
      return Corner.BOTTOM_LEFT
    }
    return Corner.BOTTOM_RIGHT
  }
}
