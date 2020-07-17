import { Behavior } from '..'

export class GameObject {
  private static count = 1

  readonly id: number

  private behaviors: Map<string, Behavior> = new Map()

  constructor() {
    this.id = GameObject.count++
  }

  update() {
    this.behaviors.forEach(behavior => {
      behavior.update()
    })
  }

  render() {
    this.behaviors.forEach(behavior => {
      behavior.render()
    })
  }

  addBehavior(behavior: Behavior) {
    this.behaviors.set(behavior.id, behavior)
  }

  getBehavior(behaviorId: string): Behavior | undefined {
    return this.behaviors.get(behaviorId)
  }
}
