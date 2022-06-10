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
const move = (direction, pacmanDirection) => {
  game[direction]('pacman');
  render.renderLevel(game.LEVEL, pacmanDirection);
  pacmanRotation = pacmanDirection;
};
const moveDown = () => {
  move('moveDown', pacmanDown);
};
const moveUp = () => {
  move('moveUp', pacmanUp);
};
const moveRight = () => {
  move('moveRight', pacmanRight);
};
const moveLeft = () => {
  move('moveLeft', pacmanLeft);
};
let interval;
document.addEventListener('keydown', event => {
  switch (event.key) {
  case 's':
  case 'ArrowDown':
    clearInterval(interval)
    {
      interval = setInterval(moveDown, 300);
    }
    break;
  case 'w':
  case 'ArrowUp':
    clearInterval(interval)
    {
      interval = setInterval(moveUp, 300);
    }
    break;
  case 'a':
  case 'ArrowLeft':
    clearInterval(interval)
    {
      interval = setInterval(moveLeft, 300);
    }
    break;
  case 'd':
  case 'ArrowRight':
    clearInterval(interval)
    {
      interval = setInterval(moveRight, 300);
    }
    break;
  }
});

render.renderLevel(game.LEVEL, pacmanRight);
setInterval(() => {
  if (game.gameOver) {
    alert('GAME OVER');
    game = new Game();
  }
  game.ghost.move(game.ghost.x, game.ghost.y, game.pacman.x, game.pacman.y);
  game.ghost2.move(game.ghost2.x, game.ghost2.y, game.pacman.x, game.pacman.y);
  render.renderLevel(game.LEVEL, pacmanRotation);
}
, 400);

