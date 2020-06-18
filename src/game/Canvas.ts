import { Sprite } from '../behaviors/Sprite'

export class Canvas {
  readonly canvas: HTMLCanvasElement
  readonly ctx: CanvasRenderingContext2D

  constructor(readonly width = 500, readonly height = 300) {
    this.canvas = document.createElement('canvas')
    this.canvas.width = width
    this.canvas.height = height
    this.ctx = this.canvas.getContext('2d')

    document.body.insertBefore(this.canvas, null)
  }

  rect(
    x: number,
    y: number,
    w: number,
    h: number,
    options = { filled: false }
  ) {
    x = Math.floor(x)
    y = Math.floor(y)
    w = Math.floor(w)
    h = Math.floor(h)
    if (options.filled) {
      this.ctx.fillRect(x, y, w, h)
    } else {
      this.ctx.strokeRect(x, y, w, h)
    }
  }

  drawSprite(sprite: Sprite) {}
}
