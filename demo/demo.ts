import player from './Player'
import object from './Object'
import { Canvas, Game } from '../src/game'

const game = new Game(new Canvas())

game.addGameObject(player)
game.addGameObject(object)
