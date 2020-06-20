import { Behavior, Collision, GameObject } from '../game'
import { BoxCollider, DynamicBody, BoxOutline } from '../behaviors'
import { ObjectBehavior } from './Object'

const player = new GameObject('player')

player.transform.x = 100

class Move extends Behavior {
  private speed = 8
  private gravity = 1.5

  constructor() {
    super('playerMove')
  }

  update(dt: number) {
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

    velocity.x *= dt
    velocity.y *= dt

    transform.x += velocity.x
    transform.y += velocity.y

    if (transform.y > game.canvas.height - transform.height) {
      transform.y = game.canvas.height - transform.height
    }
  }

  onCollisionEnter(collision: Collision) {
    if (collision.gameObject.id !== 'object') return

    const objectBehavior = collision.gameObject.getBehavior(
      'objectBehavior'
    ) as ObjectBehavior

    objectBehavior.relocate()
  }
}

player.addBehavior(new Move())
player.addBehavior(new BoxCollider())
player.addBehavior(new DynamicBody())
player.addBehavior(new BoxOutline())
// player.addBehavior(new Sprite('/assets/sprites/bird.png'))

console.log(player)

export default player
