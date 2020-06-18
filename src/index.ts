import player from './demo/Player'
import object from './demo/Object'
import { Game } from './game/Game'
import { Canvas } from './game/Canvas'

const game = new Game(new Canvas())

game.addGameObject(player)
game.addGameObject(object)
