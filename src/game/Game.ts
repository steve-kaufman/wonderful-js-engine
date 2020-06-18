import { GameObject } from './GameObject'
import { Canvas } from './Canvas'
import { Input } from './Input'

export class Game {
  // Callbacks for update and render loops
  private gameObjects: Map<string, GameObject>

  // This value controls whether the game is updating/rendering
  private isRunning: boolean

  // Ticks per second for update loop
  public updateRate: number

  readonly input: Input

  constructor(readonly canvas: Canvas) {
    this.updateRate = 30
    this.gameObjects = new Map()
    this.input = new Input()
    this.start()
  }

  // Update loop (fixed time)
  private update() {
    if (!this.isRunning) return

    this.gameObjects.forEach(gameObject => {
      gameObject.update()
    })

    this.input.clear()

    setTimeout(this.update.bind(this), 1000 / this.updateRate)
  }

  // Render loop (flux time)
  private render() {
    if (!this.isRunning) return

    this.canvas.ctx.clearRect(
      0,
      0,
      this.canvas.canvas.width,
      this.canvas.canvas.height
    )

    this.gameObjects.forEach(gameObject => {
      gameObject.render(this.canvas)
    })

    requestAnimationFrame(this.render.bind(this))
  }

  // Starts update and render loops
  start() {
    if (this.isRunning) return

    this.isRunning = true
    this.update()
    this.render()
  }
  // Stops update and render loops
  stop() {
    this.isRunning = false
  }

  // Subscribes a GameObject to the update and render loops
  addGameObject(gameObject: GameObject) {
    this.gameObjects.set(gameObject.id, gameObject)
    gameObject.game = this
  }
  // Unsubscribes a GameObject to the update and render loops
  removeGameObject(gameObject: GameObject) {
    this.gameObjects.delete(gameObject.id)
  }

  // Retrieves a GameObject by id/name
  getGameObject(id: string): GameObject | false {
    if (!this.gameObjects.has(id)) {
      return false
    }

    return this.gameObjects.get(id)
  }

  getGameObjects(): Map<string, GameObject> {
    return this.gameObjects
  }
}
