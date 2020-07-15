import { Canvas, Behavior } from '..'

export class Sprite extends Behavior {
  image: HTMLCanvasElement

  constructor(src: string) {
    super('sprite')

    // Create canvas image for sprite
    this.image = document.createElement('canvas')
    const ctx = this.image.getContext('2d') as CanvasRenderingContext2D

    // Create HTML Image Element
    const htmlImage = new Image()
    htmlImage.onload = () => {
      // Draw HTML Image onto sprite canvas
      this.image.width = htmlImage.width
      this.image.height = htmlImage.height

      ctx.drawImage(htmlImage, 0, 0)
    }
    htmlImage.src = src
  }

  render(canvas: Canvas) {
    const { box } = this.parent
    canvas.ctx.drawImage(this.image, Math.floor(box.x), Math.floor(box.y))
  }

  onAdd() {
    if (this.parent.boxOutline) {
      this.parent.deleteBehavior(this.parent.boxOutline)
    }
  }
}
