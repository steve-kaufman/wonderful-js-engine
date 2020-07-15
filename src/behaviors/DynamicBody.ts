import { Behavior, Collision, GameObject, Side } from '..'

export class DynamicBody extends Behavior {
  constructor() {
    super('dynamicBody')
  }

  private fixCollision(other: GameObject, side: Side) {
    const { box } = this.parent
    switch (side) {
      case Side.LEFT:
        box.x = other.box.right()
      case Side.TOP:
        box.y = other.box.bottom()
      case Side.RIGHT:
        box.x = other.box.left() - box.w
      case Side.BOTTOM:
        box.y = other.box.top() - box.h
    }
  }

  onCollisionEnter(other: GameObject, side: Side) {
    if (!other.boxCollider!.isSolid) return

    this.fixCollision(other, side)
  }
}
