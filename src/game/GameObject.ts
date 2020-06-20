import { v4 as uuidv4 } from 'uuid'
import { Behavior, Canvas, Collision, Game } from '.'
import { BoxCollider, BoxOutline, Transform } from '../behaviors'

export class GameObject {
  // UUID
  readonly id: string

  // Game
  public game: Game

  // Map of behaviors
  private behaviors: Map<string, Behavior> = new Map()
  // Callbacks for update and render loops
  private preUpdaters: Map<string, Behavior> = new Map()
  private updaters: Map<string, Behavior> = new Map()
  private postUpdaters: Map<string, Behavior> = new Map()
  private renderers: Map<string, Behavior> = new Map()
  // Callbacks for collision event
  private collisionEnterHandlers: Map<string, Behavior> = new Map()
  private collisionHandlers: Map<string, Behavior> = new Map()
  private collisionExitHandlers: Map<string, Behavior> = new Map()

  // Member behaviors
  public transform: Transform
  public boxOutline: BoxOutline
  public boxCollider: BoxCollider

  constructor(name?: string) {
    this.id = name || uuidv4()
    this.transform = this.addBehavior(new Transform())
  }

  // Update loop (fixed time)
  update(dt: number) {
    this.preUpdaters.forEach(behavior => {
      behavior.preUpdate(dt)
    })
    this.updaters.forEach(behavior => {
      behavior.update(dt)
    })
    this.postUpdaters.forEach(behavior => {
      behavior.postUpdate(dt)
    })
  }

  // Render loop (flux time)
  render(canvas: Canvas) {
    this.renderers.forEach(behavior => {
      behavior.render(canvas)
    })
  }

  onCollisionEnter(collision: Collision) {
    this.collisionEnterHandlers.forEach(behavior => {
      behavior.onCollisionEnter(collision)
    })
  }
  onCollision(collision: Collision) {
    this.collisionHandlers.forEach(behavior => {
      behavior.onCollision(collision)
    })
  }
  onCollisionExit(collision: Collision) {
    this.collisionExitHandlers.forEach(behavior => {
      behavior.onCollisionExit(collision)
    })
  }

  addBehavior<T>(behavior: Behavior & T): T {
    if (behavior.preUpdate) {
      this.preUpdaters.set(behavior.id, behavior)
    }
    if (behavior.update) {
      this.updaters.set(behavior.id, behavior)
    }
    if (behavior.postUpdate) {
      this.postUpdaters.set(behavior.id, behavior)
    }
    if (behavior.render) {
      this.renderers.set(behavior.id, behavior)
    }

    if (behavior.onCollision) {
      this.collisionHandlers.set(behavior.id, behavior)
    }
    if (behavior.onCollisionEnter) {
      this.collisionEnterHandlers.set(behavior.id, behavior)
    }
    if (behavior.onCollisionExit) {
      this.collisionExitHandlers.set(behavior.id, behavior)
    }

    this.behaviors.set(behavior.id, behavior)

    behavior.setParent(this)

    if (behavior.onAdd) {
      behavior.onAdd()
    }

    return behavior as T
  }

  getBehavior(behaviorId: string): Behavior {
    return this.behaviors.get(behaviorId)
  }

  deleteBehavior(behavior: Behavior) {
    this.preUpdaters.delete(behavior.id)
    this.updaters.delete(behavior.id)
    this.postUpdaters.delete(behavior.id)
    this.renderers.delete(behavior.id)
  }
}
