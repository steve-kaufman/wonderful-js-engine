import { v4 as uuidv4 } from 'uuid'
import { GameObject } from './GameObject'
import { Canvas } from './Canvas'
import { Collision } from './Collision'
import { Side } from '..'

export abstract class Behavior {
  protected parent!: GameObject

  readonly id: string

  constructor(name?: string) {
    // Use given name or generate a uuid
    this.id = name || uuidv4()
  }

  preUpdate(dt: number) {}
  update(dt: number) {}
  postUpdate(dt: number) {}

  render(canvas: Canvas) {}

  onAdd() {}

  onCollisionEnter(other: GameObject, side: Side) {}
  onCollision(other: GameObject) {}
  onCollisionExit(other: GameObject) {}

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
