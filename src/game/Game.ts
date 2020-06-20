import { GameObject } from './GameObject'
import { Canvas } from './Canvas'
import { Input } from './Input'

export class Game {
  // Callbacks for update and render loops
  private gameObjects: Map<string, GameObject>

  // This value controls whether the game is updating/rendering
  private isRunning: boolean = false

  private lastTime: number

  // Ticks per second for update loop
  public updateRate: number

  readonly input: Input

  constructor(readonly canvas: Canvas) {
    this.updateRate = 30
    this.gameObjects = new Map()
    this.input = new Input()
    this.lastTime = Date.now()
    this.start()
  }

  // Update loop (fixed time)
  private update() {
    const currentTime = Date.now()
    const dt = (currentTime - this.lastTime) / 100

    this.gameObjects.forEach(gameObject => {
      gameObject.update(dt)
    })

    this.input.clear()

    this.lastTime = currentTime
  }

  // Render loop (flux time)
  private render() {
    this.canvas.ctx.clearRect(
      0,
      0,
      this.canvas.canvas.width,
      this.canvas.canvas.height
    )

    this.gameObjects.forEach(gameObject => {
      gameObject.render(this.canvas)
    })
  }

  private loop() {
    if (!this.isRunning) return

    this.update()
    this.render()

    requestAnimationFrame(this.loop.bind(this))
  }

  // Starts update and render loops
  start() {
    if (this.isRunning) return

    this.isRunning = true
    this.loop()
  }
  // Stops update and render loops
  stop() {
    this.isRunning = false
  }

  // Subscribes a GameObject to the update and render loops
  addGameObject(gameObject: GameObject) {
    this.gameObjects.set(gameObject.id, gameObject)
    gameObject.game = this
    gameObject.onAdd()
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

    return this.gameObjects.get(id) as GameObject
  }

  getGameObjects(): Map<string, GameObject> {
    return this.gameObjects
  }
}
