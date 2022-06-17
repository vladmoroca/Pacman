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
const winScore = 18900;
const root = document.getElementById('root');
const score = document.getElementById('score');
const height = document.documentElement.clientHeight / 1.1;
const width = height / 1.05;
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
let arrowsShown = false;
mobController.style.display = 'none';
if (document.documentElement.clientHeight > document.documentElement.clientWidth) {
  const width =  document.documentElement.clientWidth;
  const height = width * 1.05;
  arrowsShown = true;
  render = new Render(root, width, height, 21, 20);
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
  w: { id: 'w', direction: [0, -1], pacmanRotation: pacmanUp },
  s: { id: 's', direction: [0, 1], pacmanRotation: pacmanDown },
  a: { id: 'a', direction: [-1, 0], pacmanRotation: pacmanLeft },
  d: { id: 'd', direction: [1, 0], pacmanRotation: pacmanRight },
  up: { id: 'ArrowUp', direction: [0, -1], pacmanRotation: pacmanUp },
  down: { id: 'ArrowDown', direction: [0, 1], pacmanRotation: pacmanDown },
  left: { id: 'ArrowLeft', direction: [-1, 0], pacmanRotation: pacmanLeft },
  right: { id: 'ArrowRight', direction: [1, 0], pacmanRotation: pacmanRight },
};
const keyboardInput = coll => {
  onkeydown = el => {
    for (const key of Object.keys(coll)) {
      if (el.key === coll[key].id) {
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

const bonusInterval = setInterval(() => {
  game.bonus.randomSpawn();
}, bonusTimer);

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
, ghostsTimer);

