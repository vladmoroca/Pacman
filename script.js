'use strict';

const pacmanLeft = 1.2;
const pacmanRight = 0.2;
const pacmanUp = 1.7;
const pacmanDown = 0.7;
const root = document.querySelector('#root');
const render = new Render(root, 800, 840, 21, 20);
let game = new Game();
window.render  = render;
window.game = game;
let pacmanRotation = pacmanRight;
document.addEventListener('keydown', event => {
  switch (event.key) {
  case 's':
  case 'ArrowDown':
    game.moveDown('pacman');
    render.renderLevel(game.LEVEL, pacmanDown);
    pacmanRotation = pacmanDown;
    break;
  case 'w':
  case 'ArrowUp':
    game.moveUp('pacman');
    render.renderLevel(game.LEVEL, pacmanUp);
    pacmanRotation = pacmanUp;
    break;
  case 'a':
  case 'ArrowLeft':
    game.moveLeft('pacman');
    render.renderLevel(game.LEVEL, pacmanLeft);
    pacmanRotation = pacmanLeft;
    break;
  case 'd':
  case 'ArrowRight':
    game.moveRight('pacman');
    render.renderLevel(game.LEVEL, pacmanRight);
    pacmanRotation = pacmanRight;
    break;
  }
});

render.renderLevel(game.LEVEL, pacmanRight);
setInterval(() => {
  if (game.ghost.gameOver) {
    alert('game Over');
    game = new Game();
  }
  game.ghost.move(game.ghost.x, game.ghost.y, game.pacman.x, game.pacman.y);
  render.renderLevel(game.LEVEL, pacmanRotation);
}
, 500);

