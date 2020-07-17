import { GameObject } from '..'

export class Behavior {
  private static count = 1

  private parent: GameObject | null = null

  readonly id: string

  constructor(id?: string) {
    this.id = id || String(Behavior.count++)
  }

  update(dt: number) {}

  preUpdate(dt: number) {}

  postUpdate(dt: number) {}

  render() {}

  onCollisionEnter() {}

  onCollision() {}

  onCollisionExit() {}

  onAdd() {}

  getParent(): GameObject | null {
    return this.parent
  }

  setParent(gameObject: GameObject) {
    this.parent = gameObject
  }
}
