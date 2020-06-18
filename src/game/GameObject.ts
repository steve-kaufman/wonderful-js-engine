import { v4 as uuidv4 } from 'uuid'
import { Behavior } from './Behavior'
import { Canvas } from './Canvas'
import { Transform } from '../behaviors/Transform'
import { BoxOutline } from '../behaviors/BoxOutline'
import Game from './Game'
import { Collision } from './Collision'

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
  private collisionHandlers: Map<string, Behavior> = new Map()

  // Member behaviors
  public transform: Transform
  public boxOutline: BoxOutline
  public boxCollider: BoxCollider

  constructor(name?: string) {
    this.id = name || uuidv4()
    this.transform = this.addBehavior(new Transform())
    this.boxOutline = this.addBehavior(new BoxOutline())
  }

  // Update loop (fixed time)
  update() {
    this.preUpdaters.forEach(behavior => {
      behavior.preUpdate()
    })
    this.updaters.forEach(behavior => {
      behavior.update()
    })
    this.postUpdaters.forEach(behavior => {
      behavior.postUpdate()
    })
  }

  // Render loop (flux time)
  render(canvas: Canvas) {
    this.renderers.forEach(behavior => {
      behavior.render(canvas)
    })
  }

  onCollision(collision: Collision) {
    this.collisionHandlers.forEach(behavior => {
      behavior.onCollision(collision)
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

    this.behaviors.set(behavior.id, behavior)

    behavior.setParent(this)

    if (behavior.onAdd) {
      behavior.onAdd()
    }

    return behavior as T
  }

  deleteBehavior(behavior: Behavior) {
    this.preUpdaters.delete(behavior.id)
    this.updaters.delete(behavior.id)
    this.postUpdaters.delete(behavior.id)
    this.renderers.delete(behavior.id)
  }
}
