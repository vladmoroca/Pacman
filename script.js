'use strict';

const pacmanLeft = 1.2;
const pacmanRight = 0.2;
const pacmanUp = 1.7;
const pacmanDown = 0.7;
const root = document.getElementById('root');
const score = document.getElementById('score');
const render = new Render(root, 800, 840, 21, 20);
let game = new Game();
window.render  = render;
window.game = game;
let anim = 0;
let smooth = [0, 0];
let pacmanRotation = pacmanRight;
let rememberWay = [];
let interval;
let mouth = true;
const move = (direction, pacmanDirection) => {
  game[direction]('pacman');
  pacmanRotation = pacmanDirection;
};
const rememberMove = () => {
  clearInterval(interval);
  interval = setInterval(rememberWay[2], 300);
  rememberWay = [];
};
setInterval(() => {
  render.renderLevel(game.LEVEL, pacmanRotation, anim, smooth);
  if (anim < 0.19 && mouth) {
    anim += 0.015;
    anim = +anim.toFixed(3);
  } else if (anim >= 0) {
    mouth = false;
    anim -= 0.015;
    anim = +anim.toFixed(3);
  } else mouth = true;
  if (rememberWay[0] + 2) {
    if (game.LEVEL[game.pacman.y + rememberWay[0]][game.pacman.x + rememberWay[1]] !== 1) {
      rememberMove();
    }
  }
  if (smooth[0] > 0) {
    smooth[0] -= 3;
  }
  if (smooth[0] < 0) {
    smooth[0] += 3;
  }
  if (smooth[1] > 0) {
    smooth[1] -= 3;
  }
  if (smooth[1] < 0) {
    smooth[1] += 3;
  }
  if (game.gameOver) {
    alert('GAME OVER');
    game = new Game();
    smooth = [0, 0];
    clearInterval(interval);
  }
  score.textContent = `Score:${game.score}`;
  if (game.score >= 18900) {
    alert('Congratulation!');
    game = new Game();
    smooth = [0, 0];
  }
}, 20);
const moveDown = () => {
  if (game.LEVEL[game.pacman.y + 1]) {
    if (game.LEVEL[game.pacman.y + 1][game.pacman.x] !== 1) {
      move('moveDown', pacmanDown);
      smooth = [0, 40];
    }
  } else move('moveDown', pacmanDown);
};
const moveUp = () => {
  if (game.LEVEL[game.pacman.y - 1]) {
    if (game.LEVEL[game.pacman.y - 1][game.pacman.x] !== 1) {
      move('moveUp', pacmanUp);
      smooth = [0, -40];
    }
  } else move('moveUp', pacmanUp);
};
const moveRight = () => {
  if (game.LEVEL[game.pacman.y][game.pacman.x + 1] + 1) {
    if (game.LEVEL[game.pacman.y][game.pacman.x + 1] !== 1) {
      move('moveRight', pacmanRight);
      smooth = [40, 0];
    }
  } else move('moveRight', pacmanRight);
};
const moveLeft = () => {
  if (game.LEVEL[game.pacman.y][game.pacman.x - 1] + 1) {
    if (game.LEVEL[game.pacman.y][game.pacman.x - 1] !== 1) {
      move('moveLeft', pacmanLeft);
      smooth = [-40, 0];
    }
  } else move('moveLeft', pacmanLeft);
};
document.addEventListener('keydown', event => {
  switch (event.key) {
  case 'ArrowDown':
  case 's':
    if (game.LEVEL[game.pacman.y + 1][game.pacman.x] !== 1) {
      clearInterval(interval);
      {
        interval = setInterval(moveDown, 300);
      }
    } else rememberWay = [1, 0, moveDown];
    break;
  case 'w':
  case 'ArrowUp':
    if (game.LEVEL[game.pacman.y - 1][game.pacman.x] !== 1) {
      clearInterval(interval);
      {
        interval = setInterval(moveUp, 300);
      }
    } else rememberWay = [-1, 0, moveUp];
    break;
  case 'a':
  case 'ArrowLeft':
    if (game.LEVEL[game.pacman.y ][game.pacman.x - 1] !== 1) {
      clearInterval(interval);
      {
        interval = setInterval(moveLeft, 300);
      }
    } else rememberWay = [0, -1, moveLeft];
    break;
  case 'd':
  case 'ArrowRight':
    if (game.LEVEL[game.pacman.y ][game.pacman.x + 1] !== 1) {
      clearInterval(interval);
      {
        interval = setInterval(moveRight, 300);
      }
    } else rememberWay = [0, 1, moveRight];
    break;
  }
});
setInterval(() => {
  game.ghost.move(game.ghost.x, game.ghost.y, game.pacman.x, game.pacman.y);
  game.ghost2.move(game.ghost2.x, game.ghost2.y, game.pacman.x, game.pacman.y);
}
, 400);

