'use strict'

const root = document.querySelector('#root')
const render = new Render(root, 800, 840, 21, 20)
const game = new Game()
window.render  = render
window.game = game
document.addEventListener('keydown', event => {
  switch(event.key){
    case 's':
    case 'ArrowDown': 
      game.moveDown()
      render.renderLevel(game.LEVEL, 0.7)
      break
    case 'w':
    case 'ArrowUp': 
      game.moveUp()
      render.renderLevel(game.LEVEL, 1.7)
      break
    case 'a':
    case 'ArrowLeft': 
      game.moveLeft()
      render.renderLevel(game.LEVEL, 1.2)
      break
    case 'd':
    case 'ArrowRight': 
      game.moveRight()
      render.renderLevel(game.LEVEL,0.2)
      break
  }
})

render.renderLevel(game.LEVEL, 0.2)
