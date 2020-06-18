import { Behavior } from '../game/Behavior'
import { Canvas } from '../game/Canvas'

export class BoxOutline extends Behavior {
  constructor() {
    super('boxOutline')
  }
  render(canvas: Canvas) {
    const { transform } = this.parent
    canvas.rect(transform.x, transform.y, transform.width, transform.height)
  }
}
