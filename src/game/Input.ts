export class Input {
  private keysJustPressed: Map<number, boolean> = new Map()
  private keysJustReleased: Map<number, boolean> = new Map()
  private keysDown: Map<number, boolean> = new Map()

  constructor() {
    document.addEventListener('keydown', this.handleKeyDown.bind(this))
    document.addEventListener('keyup', this.handleKeyUp.bind(this))
  }

  clear() {
    this.keysJustPressed = new Map()
    this.keysJustReleased = new Map()
  }

  isKeyDown(keyCode: number) {
    return this.keysDown.get(keyCode)
  }

  isKeyPressed(keyCode: number) {
    return this.keysJustPressed.get(keyCode)
  }

  isKeyReleased(keyCode: number) {
    return this.keysJustReleased.get(keyCode)
  }

  private handleKeyDown(e: KeyboardEvent) {
    const { keyCode } = e
    if (this.keysDown.get(keyCode)) return
    this.keysJustPressed.set(keyCode, true)
    this.keysDown.set(keyCode, true)
  }

  private handleKeyUp(e: KeyboardEvent) {
    const { keyCode } = e
    this.keysJustReleased.set(keyCode, true)
    this.keysDown.delete(keyCode)
  }
}
