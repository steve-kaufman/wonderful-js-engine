import { GameObject } from './GameObject'

export enum CollisionSide {
  LEFT,
  TOP,
  RIGHT,
  BOTTOM,
  NONE
}

export interface Collision {
  side: CollisionSide | null
  gameObject: GameObject
}
