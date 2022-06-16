'use strict';

const pacmanLeft = 1.2;
const pacmanRight = 0.2;
const pacmanUp = 1.7;
const pacmanDown = 0.7;
const root = document.getElementById('root');
const score = document.getElementById('score');
let height = document.documentElement.clientHeight / 1.1;
let width =  document.documentElement.clientHeight / 1.05 / 1.1;
let render = new Render(root, width, height, 21, 20);
let game = new Game();
window.render  = render;
window.game = game;
let anim = 0;
const smooth = {
  pacmanX: 0,
  pacmanY: 0,
  ghostX: 0,
  ghostY: 0,
  ghost2X: 0,
  ghost2Y: 0
};
let pacmanRotation = pacmanRight;
let rememberWay = [];
let interval;
let mouth = true;


if (innerHeight > innerWidth) {
  const button = document.getElementById('MobileControl');
  width = document.documentElement.clientWidth;
  height =  document.documentElement.clientWidth * 1.05;
  render = new Render(root, width, height, 21, 20);
  const buttonRender = new MobileRender(button, width, height);
  buttonRender.renderButton();
}
const size = render.blockWidth;
const animationSpeed = size * 3 / 40;

const move = (direction, pacmanDirection) => {
  game.pacman.move(direction);
  pacmanRotation = pacmanDirection;
};
const rememberMove = () => {
  clearInterval(interval);
  interval = setInterval(rememberWay[2], 300);
  rememberWay = [];
};
setInterval(() => {
  if (game.pacman.killingMode) {
    render.renderLevel(game.LEVEL, pacmanRotation, anim, smooth, 'red');
    setTimeout(() => {
      game.pacman.killingMode = false;
    }, 10000);
  } else  render.renderLevel(game.LEVEL, pacmanRotation, anim, smooth);
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
  for (const index in smooth) {
    if (smooth[index] > 0) smooth[index] -= animationSpeed;
    if (smooth[index] < 0) smooth[index] += animationSpeed;
  }
  if (game.gameOver) {
    alert('GAME OVER');
    game = new Game();
    smooth.pacmanX = 0;
    smooth.pacmanY = 0;
    clearInterval(interval);
  }
  score.textContent = `Score:${game.score}`;
  if (game.score >= 18800) {
    alert('Congratulation!');
    game = new Game();
    smooth.pacmanX = 0;
    smooth.pacmanY = 0;
  }
}, 20);
const moveDown = () => {
  if (game.LEVEL[game.pacman.y + 1]) {
    if (game.LEVEL[game.pacman.y + 1][game.pacman.x] !== game.wallCode) {
      move([0, 1], pacmanDown);
      smooth.pacmanX = 0;
      smooth.pacmanY = size;
    }
  } else move([0, 1], pacmanDown);
};
const moveUp = () => {
  if (game.LEVEL[game.pacman.y - 1]) {
    if (game.LEVEL[game.pacman.y - 1][game.pacman.x] !== game.wallCode) {
      move([0, -1], pacmanUp);
      smooth.pacmanX = 0;
      smooth.pacmanY = -size;
    }
  } else move([0, -1], pacmanUp);
};
const moveRight = () => {
  if (game.LEVEL[game.pacman.y][game.pacman.x + 1] + 1) {
    if (game.LEVEL[game.pacman.y][game.pacman.x + 1] !== game.wallCode) {
      move([1, 0], pacmanRight);
      smooth.pacmanX = size;
      smooth.pacmanY = 0;
    }
  } else move([1, 0], pacmanRight);
};
const moveLeft = () => {
  if (game.LEVEL[game.pacman.y][game.pacman.x - 1] + 1) {
    if (game.LEVEL[game.pacman.y][game.pacman.x - 1] !== game.wallCode) {
      move([-1, 0], pacmanLeft);
      smooth.pacmanX = -size;
      smooth.pacmanY = 0;
    }
  } else move([-1, 0], pacmanLeft);
};

const bonusInterval = setInterval(() => {
  game.bonus.randomSpawn();
}, 50000);
if (innerHeight > innerWidth) {
  const button = document.getElementById('MobileControl');
  button.addEventListener('touchstart', e => {
    const touchX = e.changedTouches[0].clientX;
    const touchY = e.changedTouches[0].clientY;
    if ((touchX > width * 3 / 7) && (touchX < width * 4 / 7) && (touchY < height * 1.24)) {
      if (game.LEVEL[game.pacman.y - 1][game.pacman.x] !== game.wallCode) {
        clearInterval(interval);
        {
          interval = setInterval(moveUp, 300);
        }
      } else rememberWay = [-1, 0, moveUp];
    }
    if ((touchX > width * 3 / 7) && (touchX < width * 4 / 7) && (touchY < height * 1.6) && (touchY > height * 1.45)) {
      if (game.LEVEL[game.pacman.y + 1][game.pacman.x] !== game.wallCode) {
        clearInterval(interval);
        {
          interval = setInterval(moveDown, 300);
        }
      } else rememberWay = [1, 0, moveDown];
    }
    if ((touchX > width * 9 / 14) && (touchX < width * 11 / 14) && (touchY < height * 1.4) && (touchY > height * 1.24)) {
      if (game.LEVEL[game.pacman.y ][game.pacman.x + 1] !== game.wallCode) {
        clearInterval(interval);
        {
          interval = setInterval(moveRight, 300);
        }
      } else rememberWay = [0, 1, moveRight];
    }
    if ((touchX > width * 3 / 14) && (touchX < width * 5 / 14) && (touchY < height * 1.4) && (touchY > height * 1.24)) {
      if (game.LEVEL[game.pacman.y ][game.pacman.x - 1] !== game.wallCode) {
        clearInterval(interval);
        {
          interval = setInterval(moveLeft, 300);
        }
      } else rememberWay = [0, -1, moveLeft];
    }
  });
}

document.addEventListener('keydown', event => {
  switch (event.key) {
  case 'ArrowDown':
  case 's':
    if (game.LEVEL[game.pacman.y + 1][game.pacman.x] !== game.wallCode) {
      clearInterval(interval);
      {
        interval = setInterval(moveDown, 300);
      }
    } else rememberWay = [1, 0, moveDown];
    break;
  case 'w':
  case 'ArrowUp':
    if (game.LEVEL[game.pacman.y - 1][game.pacman.x] !== game.wallCode) {
      clearInterval(interval);
      {
        interval = setInterval(moveUp, 300);
      }
    } else rememberWay = [-1, 0, moveUp];
    break;
  case 'a':
  case 'ArrowLeft':
    if (game.LEVEL[game.pacman.y ][game.pacman.x - 1] !== game.wallCode) {
      clearInterval(interval);
      {
        interval = setInterval(moveLeft, 300);
      }
    } else rememberWay = [0, -1, moveLeft];
    break;
  case 'd':
  case 'ArrowRight':
    if (game.LEVEL[game.pacman.y ][game.pacman.x + 1] !== game.wallCode) {
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
  if (game.ghost.pastPosition[0] > game.ghost.x) smooth.ghostX = -size;
  if (game.ghost.pastPosition[0] < game.ghost.x) smooth.ghostX = size;
  if (game.ghost.pastPosition[1] > game.ghost.y) smooth.ghostY = -size;
  if (game.ghost.pastPosition[1] < game.ghost.y) smooth.ghostY = size;
  game.ghost2.move(game.ghost2.x, game.ghost2.y, game.pacman.x, game.pacman.y);
  if (game.ghost2.pastPosition[0] > game.ghost2.x) smooth.ghost2X = -size;
  if (game.ghost2.pastPosition[0] < game.ghost2.x) smooth.ghost2X = size;
  if (game.ghost2.pastPosition[1] > game.ghost2.y) smooth.ghost2Y = -size;
  if (game.ghost2.pastPosition[1] < game.ghost2.y) smooth.ghost2Y = size;
}
, 400);

