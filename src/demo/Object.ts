import { GameObject } from '../game/GameObject'
import { BoxCollider } from '../behaviors/BoxCollider'
import { Behavior, Canvas } from '../game'

const object = new GameObject('object')

object.transform.x = 100
object.transform.y = 100
object.transform.width = 8
object.transform.height = 8
object.addBehavior(new BoxCollider({ solid: false }))

export class ObjectBehavior extends Behavior {
  constructor() {
    super('objectBehavior')
  }
  render(canvas: Canvas) {
    canvas.ctx.save()
    canvas.ctx.fillStyle = 'red'
    canvas.ctx.fillRect(...this.parent.transform.get())
    canvas.ctx.restore()
  }
  relocate() {
    const { transform, game } = this.parent
    const padding = 100
    const newX =
      Math.random() * (game.canvas.width - padding) +
      (padding - transform.width) / 2
    const newY =
      Math.random() * (game.canvas.height - padding) +
      (padding - transform.height) / 2

    transform.x = newX
    transform.y = newY
  }
}

object.addBehavior(new ObjectBehavior())

export default object
