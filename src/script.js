/* eslint-disable no-loop-func */
'use strict';

const mobController = document.getElementById('mobController');
const arrows = document.querySelectorAll('.arrow');

const pacmanLeft = 1.2;
const pacmanRight = 0.2;
const pacmanUp = 1.7;
const pacmanDown = 0.7;
const bonusTimer = 50000;
const pacmanTimer = 300;
const ghostsTimer = 400;
const killingModeTimer = 10000;
const renderTimer = 20;
const winScore = 18800;
const smooth = {
  pacmanX: 0,
  pacmanY: 0,
  ghostX: 0,
  ghostY: 0,
  ghost2X: 0,
  ghost2Y: 0
};
let anim = 0;
let pacmanRotation = pacmanRight;
let rememberWay = [];
let interval;
let mouth = true;
let arrowsShown = false;

const root = document.getElementById('root');
const score = document.getElementById('score');
const height = document.documentElement.clientHeight / 1.1;
const width = height / 1.05;
let game = new Game();
const rows = game.LEVEL.length;
const columns = game.LEVEL[0].length;
let render = new Render(root, width, height, rows, columns);
window.render  = render;
window.game = game;
mobController.style.display = 'none';

if (document.documentElement.clientHeight > document.documentElement.clientWidth) {
  const width =  document.documentElement.clientWidth;
  const height = width * 1.05;
  arrowsShown = true;
  render = new Render(root, width, height, rows, columns);
}

const size = render.blockWidth;
const animationSpeed = size * 3 / 40;
const isWall = (x, y) => game.LEVEL[y][x] === game.wallCode;

const move = (direction, pacmanDirection) => {
  if (game.LEVEL[game.pacman.y + direction[1]]) {
    if (!isWall(game.pacman.x + direction[0], game.pacman.y + direction[1])) {
      smooth.pacmanX = size * direction[0];
      smooth.pacmanY = size * direction[1];
    }
  }
  game.pacman.move(direction);
  pacmanRotation = pacmanDirection;
};

const keys = {
  w: { direction: [0, -1], pacmanRotation: pacmanUp },
  s: { direction: [0, 1], pacmanRotation: pacmanDown },
  a: { direction: [-1, 0], pacmanRotation: pacmanLeft },
  d: { direction: [1, 0], pacmanRotation: pacmanRight },
  ArrowUp: { direction: [0, -1], pacmanRotation: pacmanUp },
  ArrowDown: { direction: [0, 1], pacmanRotation: pacmanDown },
  ArrowLeft: { direction: [-1, 0], pacmanRotation: pacmanLeft },
  ArrowRight: { direction: [1, 0], pacmanRotation: pacmanRight },
};
const keyboardInput = coll => {
  onkeydown = el => {
    for (const key of Object.keys(coll)) {
      if (el.key === key) {
        const direct = coll[key].direction;
        const rotate = coll[key].pacmanRotation;
        if (!isWall(game.pacman.x + direct[0], game.pacman.y + direct[1])) {
          clearInterval(interval);
          interval = setInterval(move, pacmanTimer, direct, rotate);
        } else rememberWay = [direct[0], direct[1], move, direct, rotate];
      }
    }
  };
};
keyboardInput(keys);

const mobileArrows = {
  up: { id: 'up', direction: [0, -1], pacmanRotation: pacmanUp },
  down: { id: 'down', direction: [0, 1], pacmanRotation: pacmanDown },
  left: { id: 'left', direction: [-1, 0], pacmanRotation: pacmanLeft },
  right: { id: 'right', direction: [1, 0], pacmanRotation: pacmanRight },
};
const mobileInput = coll => {
  for (const arrow of arrows) {
    arrow.onclick = () => {
      for (const key of Object.keys(coll)) {
        if (coll[key].id === arrow.id) {
          const direct = coll[key].direction;
          const rotate = coll[key].pacmanRotation;
          if (!isWall(game.pacman.x + direct[0], game.pacman.y + direct[1])) {
            clearInterval(interval);
            interval = setInterval(move, pacmanTimer, direct, rotate);
          } else rememberWay = [direct[0], direct[1], move, direct, rotate];
        }
      }
    };
  }
};
if (arrowsShown) {
  mobController.style.display = '';
  mobileInput(mobileArrows);
}

const rememberMove = () => {
  clearInterval(interval);
  interval = setInterval(rememberWay[2], pacmanTimer, rememberWay[3], rememberWay[4]);
  rememberWay = [];
};

const bonusInterval = setInterval(() => {
  game.bonus.randomSpawn();
}, bonusTimer);

setInterval(() => {
  if (game.pacman.killingMode) {
    render.renderLevel(game.LEVEL, pacmanRotation, anim, smooth, 'red');
    setTimeout(() => {
      game.pacman.killingMode = false;
    }, killingModeTimer);
  } else  render.renderLevel(game.LEVEL, pacmanRotation, anim, smooth);
  if (anim < 0.19 && mouth) {
    anim += 0.015;
    anim = +anim.toFixed(3);
  } else if (anim >= 0) {
    mouth = false;
    anim -= 0.015;
    anim = +anim.toFixed(3);
  } else mouth = true;
  if (rememberWay[1] + 2) {
    if (!isWall(game.pacman.x + rememberWay[0], game.pacman.y + rememberWay[1])) {
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
  if (game.score >= winScore) {
    alert('Congratulation!');
    game = new Game();
    smooth.pacmanX = 0;
    smooth.pacmanY = 0;
  }
}, renderTimer);

const ghostAnim = (ghost, string) => {
  const dx = ghost.x - ghost.pastPosition[0];
  const dy = ghost.y - ghost.pastPosition[1];
  smooth[string + 'X'] = dx * size;
  smooth[string + 'Y'] = dy * size;
};
setInterval(() => {
  game.ghost.move(game.ghost.x, game.ghost.y, game.pacman.x, game.pacman.y);
  ghostAnim(game.ghost, 'ghost');
  game.ghost2.move(game.ghost2.x, game.ghost2.y, game.pacman.x, game.pacman.y);
  ghostAnim(game.ghost2, 'ghost2');
}
, ghostsTimer);

