import { Canvas, Behavior } from '..'

export class BoxOutline extends Behavior {
  constructor() {
    super('boxOutline')
  }
  render(canvas: Canvas) {
    const { transform } = this.parent
    canvas.rect(transform.x, transform.y, transform.width, transform.height)
  }
}
