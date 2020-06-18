import { GameObject } from '../game/GameObject'
import { Behavior } from '../game/Behavior'
import { Sprite } from '../behaviors/Sprite'
import { BoxCollider } from '../behaviors/BoxCollider'
import { Collision } from '../game/Collision'

const player = new GameObject('player')

player.transform.x = 100

class Move extends Behavior {
  private speed = 3
  private gravity = 1.5

  constructor() {
    super('playerMove')
  }

  update() {
    const { game, transform } = this.parent
    const { input } = game

    const velocity = { x: 0, y: 0 }

    if (input.isKeyDown(37)) {
      velocity.x -= this.speed
    }
    if (input.isKeyDown(38)) {
      velocity.y -= this.speed
    }
    if (input.isKeyDown(39)) {
      velocity.x += this.speed
    }
    if (input.isKeyDown(40)) {
      velocity.y += this.speed
    }

    transform.x += velocity.x
    transform.y += velocity.y

    if (transform.y > game.canvas.height - transform.height) {
      transform.y = game.canvas.height - transform.height
    }
  }

  onCollision(collision: Collision) {
    console.log(collision.side)
  }
}

player.addBehavior(new Move())
player.addBehavior(new BoxCollider())
// player.addBehavior(new Sprite('/assets/sprites/bird.png'))

export default player
