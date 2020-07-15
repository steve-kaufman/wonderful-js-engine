import { Canvas, Behavior } from '..'

export class BoxOutline extends Behavior {
  constructor() {
    super('boxOutline')
  }
  render(canvas: Canvas) {
    canvas.rect(this.parent.box)
  }
}
