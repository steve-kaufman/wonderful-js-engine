import { v4 as uuidv4 } from 'uuid'
import { Behavior, Canvas, Collision, Game, Side, Box } from '..'
import { BoxOutline, BoxCollider } from '../behaviors'

/**
 * The GameObject class acts as a parent class for a variety of Behaviors.
 * Some Behaviors are built in to the engine, such as Box, BoxCollider,
 * etc.
 * Some are user-defined, e.x. a behavior called Move resposible for moving the
 * player.
 */

export class GameObject {
  readonly id: string

  public game!: Game

  private behaviors: Map<string, Behavior> = new Map()

  public box: Box

  // Behaviors with reserved names
  public boxOutline?: BoxOutline
  public boxCollider?: BoxCollider

  constructor(name?: string) {
    this.id = name || uuidv4()
    this.box = new Box()
  }

  private preUpdateBehaviors(dt: number) {
    this.behaviors.forEach(behavior => {
      behavior.preUpdate(dt)
    })
  }
  private updateBehaviors(dt: number) {
    this.behaviors.forEach(behavior => {
      behavior.update(dt)
    })
  }
  private postUpdateBehaviors(dt: number) {
    this.behaviors.forEach(behavior => {
      behavior.postUpdate(dt)
    })
  }

  update(dt: number) {
    this.preUpdateBehaviors(dt)
    this.updateBehaviors(dt)
    this.postUpdateBehaviors(dt)
  }

  render(canvas: Canvas) {
    this.behaviors.forEach(behavior => {
      behavior.render(canvas)
    })
  }

  onCollisionEnter(other: GameObject, side: Side) {
    this.behaviors.forEach(behavior => {
      behavior.onCollisionEnter(other, side)
    })
  }
  onCollision(other: GameObject) {
    this.behaviors.forEach(behavior => {
      behavior.onCollision(other)
    })
  }
  onCollisionExit(other: GameObject) {
    this.behaviors.forEach(behavior => {
      behavior.onCollisionExit(other)
    })
  }

  onAdd() {
    this.behaviors.forEach(behavior => {
      behavior.onAdd()
    })
  }

  addBehavior<T>(behavior: Behavior & T): T {
    // this.registerBehavior(behavior)
    this.behaviors.set(behavior.id, behavior)

    behavior.setParent(this)

    return behavior as T
  }

  getBehavior(behaviorId: string): Behavior {
    return this.behaviors.get(behaviorId) as Behavior
  }

  deleteBehavior(behavior: Behavior) {
    this.behaviors.delete(behavior.id)
  }
}
