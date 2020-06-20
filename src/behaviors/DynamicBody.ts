import { Behavior, Collision, CollisionSide } from '..'

export class DynamicBody extends Behavior {
  constructor() {
    super('dynamicBody')
  }

  onCollisionEnter(collision: Collision) {
    if (!collision.gameObject.boxCollider!.isSolid) return
    console.log('handling collision')
    const { side, gameObject } = collision
    const { transform } = this.parent
    const [
      leftOfOther,
      topOfOther,
      rightOfOther,
      bottomOfOther
    ] = gameObject.transform.getSides()
    switch (side) {
      case CollisionSide.LEFT:
        transform.x = rightOfOther + 1
        break
      case CollisionSide.TOP:
        transform.y = bottomOfOther
        break
      case CollisionSide.RIGHT:
        transform.x = leftOfOther - transform.width
        break
      case CollisionSide.BOTTOM:
        transform.y = topOfOther - transform.height
    }
  }
}
