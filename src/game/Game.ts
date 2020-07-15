import { GameObject } from './GameObject'
import { Canvas } from './Canvas'
import { Input } from './Input'

export class Game {
  private gameObjects: Map<string, GameObject> = new Map()

  private isRunning: boolean = false

  private lastTime: number

  readonly input: Input = new Input()

  constructor(readonly canvas: Canvas) {
    this.lastTime = Date.now()
    this.start()
  }

  private getDeltaTime(): number {
    const currentTime = Date.now()
    const dt = (currentTime - this.lastTime) / 100
    return dt
  }

  private updateGameObjects(dt: number) {
    this.gameObjects.forEach(gameObject => {
      gameObject.update(dt)
    })
  }

  private update() {
    const dt = this.getDeltaTime()

    this.updateGameObjects(dt)

    this.input.clear()

    this.lastTime = Date.now()
  }

  private renderGameObjects() {
    this.gameObjects.forEach(gameObject => {
      gameObject.render(this.canvas)
    })
  }

  // Render loop (flux time)
  private render() {
    this.canvas.clear()

    this.renderGameObjects()
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

  // Retrieves all GameObjects
  getGameObjects(): Map<string, GameObject> {
    return this.gameObjects
  }
}
