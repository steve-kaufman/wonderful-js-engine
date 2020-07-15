import { Sprite } from '../behaviors/Sprite'
import { Box } from '..'

export class Canvas {
  readonly canvas: HTMLCanvasElement
  readonly ctx: CanvasRenderingContext2D

  constructor(readonly width = 500, readonly height = 300) {
    this.canvas = document.createElement('canvas')
    this.canvas.width = width
    this.canvas.height = height
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D

    document.body.insertBefore(this.canvas, null)
  }

  rect(box: Box, options = { filled: false }) {
    const [x, y, w, h] = box.getFloored()

    if (options.filled) {
      this.ctx.fillRect(x, y, w, h)
    } else {
      this.ctx.strokeRect(x, y, w, h)
    }
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }

  drawSprite(sprite: Sprite) {}
}
