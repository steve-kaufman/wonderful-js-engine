import { Behavior, GameObject, Vector, Side, Corner, Box } from '..'
import { Collision, GameObjectWithBoxCollider } from '../game/Collision'
import { Direction } from '../game/Vector'

export class BoxCollider extends Behavior {
  private collisions: Map<string, Collision> = new Map()

  private lastPos: Vector = new Vector()

  private velocity: Vector = new Vector(0, 0)

  private trajectory?: number

  private leadingCorner?: Vector

  constructor(readonly isSolid: boolean) {
    super('boxCollider')
  }

  preUpdate() {
    this.lastPos.x = this.parent.box.x
    this.lastPos.y = this.parent.box.y
  }

  private setVelocity() {
    this.velocity = new Vector(
      this.parent.box.x - this.lastPos.x,
      this.parent.box.y - this.lastPos.y
    )
  }

  private setTrajectory() {
    this.trajectory = this.velocity.y / this.velocity.x
  }

  private setLeadingCorner() {
    const direction = this.velocity.toDirection()
    const corners = this.parent.box.getCorners()

    if (direction == Direction.UP_LEFT) {
      this.leadingCorner = corners.topLeft
    }
    if (direction == Direction.UP_RIGHT) {
      this.leadingCorner = corners.topRight
    }
    if (direction == Direction.DOWN_RIGHT) {
      this.leadingCorner = corners.bottomRight
    }
    if (direction == Direction.DOWN_LEFT) {
      this.leadingCorner = corners.bottomLeft
    }

    this.leadingCorner = undefined
  }

  private updateCollisions() {
    this.collisions.forEach(collision => {
      collision.update()
    }, this)
  }

  addCollision(gameObject: GameObject) {
    if (gameObject == this.parent) return

    this.collisions.set(
      gameObject.id,
      new Collision(
        this.parent as GameObjectWithBoxCollider,
        gameObject as GameObjectWithBoxCollider
      )
    )
  }

  deleteCollision(gameObject: GameObject) {
    this.collisions.delete(gameObject.id)
  }

  private addNewCollisions() {
    const { game, box } = this.parent

    game.getGameObjects().forEach(gameObject => {
      if (box.isCollidingWith(gameObject.box)) {
        this.addCollision(gameObject)
      }
    }, this)
  }

  postUpdate() {
    const { game, box } = this.parent
    this.setVelocity()
    this.setTrajectory()
    this.setLeadingCorner()
    this.addNewCollisions()
    this.updateCollisions()
  }

  onAdd() {
    this.parent.boxCollider = this
  }

  getLastPos(): Vector {
    return new Vector(this.lastPos.x, this.lastPos.y)
  }

  isCollidingWith(gameObjectId: string): boolean {
    return this.collisions.has(gameObjectId)
  }

  removeCollision(gameObjectId: string) {
    this.collisions.delete(gameObjectId)
  }

  getVelocity(): Vector {
    return new Vector(this.velocity.x, this.velocity.y)
  }

  getTrajectory(): number | undefined {
    return this.trajectory
  }

  getLeadingCorner(): Vector | undefined {
    if (!this.leadingCorner) {
      return undefined
    }

    return new Vector(this.leadingCorner.x, this.leadingCorner.y)
  }
}
