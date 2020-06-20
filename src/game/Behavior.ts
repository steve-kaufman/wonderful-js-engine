import { v4 as uuidv4 } from 'uuid'
import { GameObject } from './GameObject'
import { Canvas } from './Canvas'
import { Collision } from './Collision'

export abstract class Behavior {
  protected parent!: GameObject

  readonly id: string

  constructor(name?: string) {
    // Use given name or generate a uuid
    this.id = name || uuidv4()
  }

  preUpdate?(dt: number): void
  update?(dt: number): void
  postUpdate?(dt: number): void

  render?(canvas: Canvas): void

  onAdd?(): void

  onCollisionEnter?(collision: Collision): void
  onCollision?(collision: Collision): void
  onCollisionExit?(collision: Collision): void

  delete() {
    if (!this.parent) return

    this.parent.deleteBehavior(this)
  }

  getParent() {
    return this.parent
  }

  setParent(gameObject: GameObject) {
    this.parent = gameObject
  }
}
