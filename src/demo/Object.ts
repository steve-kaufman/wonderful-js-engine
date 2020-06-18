import { GameObject } from '../game/GameObject'
import { BoxCollider } from '../behaviors/BoxCollider'

const object = new GameObject('object')

object.addBehavior(new BoxCollider())

export default object
