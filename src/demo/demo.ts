import player from './Player'
import object from './Object'
import { Game } from '../game/Game'
import { Canvas } from '../game/Canvas'

const game = new Game(new Canvas())

game.addGameObject(player)
game.addGameObject(object)
