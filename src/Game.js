'use strict';

class Game {
  constructor() {
    this.LEVEL = [
      [1, 1, 1, 1, 1, 1, 1, 1, 3, 1, 1, 3, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 2, 3, 3, 3, 3, 3, 3, 3, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 1],
      [1, 3, 1, 1, 3, 1, 1, 1, 3, 1, 1, 3, 1, 1, 1, 3, 1, 1, 3, 1],
      [1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1],
      [1, 3, 1, 1, 3, 1, 3, 1, 1, 1, 1, 1, 1, 3, 1, 3, 1, 1, 3, 1],
      [1, 3, 3, 3, 3, 1, 3, 3, 3, 1, 1, 3, 3, 3, 1, 3, 3, 3, 3, 1],
      [1, 1, 1, 1, 3, 1, 1, 1, 3, 1, 1, 3, 1, 1, 1, 3, 1, 1, 1, 1],
      [1, 7, 7, 1, 3, 1, 3, 3, 3, 3, 3, 3, 3, 3, 1, 3, 1, 7, 7, 1],
      [1, 1, 1, 1, 3, 1, 3, 1, 1, 0, 0, 1, 1, 3, 1, 3, 1, 1, 1, 1],
      [3, 3, 3, 3, 3, 3, 3, 1, 0, 4, 0, 6, 1, 3, 3, 3, 3, 3, 3, 3],
      [1, 1, 1, 1, 3, 1, 3, 1, 1, 0, 0, 1, 1, 3, 1, 3, 1, 1, 1, 1],
      [1, 7, 7, 1, 3, 1, 3, 3, 3, 3, 3, 3, 3, 3, 1, 3, 1, 7, 7, 1],
      [1, 1, 1, 1, 3, 1, 3, 1, 1, 1, 1, 1, 1, 3, 1, 3, 1, 1, 1, 1],
      [1, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 1],
      [1, 3, 1, 1, 3, 1, 1, 1, 3, 1, 1, 3, 1, 1, 1, 3, 1, 1, 3, 1],
      [1, 3, 3, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 3, 3, 1],
      [1, 1, 3, 1, 3, 1, 3, 1, 1, 1, 1, 1, 1, 3, 1, 3, 1, 3, 1, 1],
      [1, 3, 3, 3, 3, 1, 3, 3, 3, 1, 1, 3, 3, 3, 1, 3, 3, 3, 3, 1],
      [1, 3, 1, 1, 1, 1, 1, 1, 3, 1, 1, 3, 1, 1, 1, 1, 1, 1, 3, 1],
      [1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 3, 1, 1, 3, 1, 1, 1, 1, 1, 1, 1, 1]
      // 1 - wall
      // 2 - pacman
      // 3 - score ball
      // 4 - ghost
      // 5 - ghost2
      // 6 - bonus
      // 0 - void
    ];

    this.wallCode = 1;
    this.pacmanCode = 2;
    this.scoreBallCode = 3;
    this.ghostCode = 4;
    this.ghost2Code = 5;
    this.bonusCode = 6;
    this.score = 0;
    this.gameOver = false;

    this.pacman = {
      temp: this,
      x: 1,
      y: 1,
      killingMode: false,
      move(direction = [0, 0]) {
        const temp = this.temp;
        if (temp.LEVEL[this.y + direction[1]] === undefined) {
          temp.LEVEL[this.y][this.x] = 0;
          this.y = temp.LEVEL.length - this.y - 1;
          temp.LEVEL[this.y][this.x] = temp.pacmanCode;
        } else if (temp.LEVEL[this.y + direction[1]][this.x + direction[0]] === undefined) {
          temp.LEVEL[this.y][this.x] = 0;
          this.x = temp.LEVEL[0].length - this.x - 1;
          temp.LEVEL[this.y][this.x] = temp.pacmanCode;
          return 0;
        }
        const nextPosition = temp.LEVEL[this.y + direction[1]][this.x + direction[0]];
        if (nextPosition !== temp.wallCode) {
          if (this.killingMode) {
            if (nextPosition === temp.ghostCode) {
              temp.score += 1000;
              temp.LEVEL[temp.ghost.y][temp.ghost.x] = temp.ghost.on;
              temp.ghost.x = 9;
              temp.ghost.y = 9;
              temp.ghost.on = 0;
            }
            if (nextPosition === temp.ghost2Code) {
              temp.score += 1000;
              temp.LEVEL[temp.ghost2.y][temp.ghost2.x] = temp.ghost2.on;
              temp.ghost2.x = 18;
              temp.ghost2.y = 19;
              temp.ghost2.on = 0;
            }
          } else if (nextPosition === temp.ghostCode || nextPosition === temp.ghost2Code) {
            temp.gameOver = true;
          }
          if (nextPosition === temp.scoreBallCode) {
            temp.score += 100;
          }
          if (nextPosition === temp.bonusCode) {
            this.killingMode = true;
            temp.score += 500;
          }
          temp.LEVEL[this.y][this.x] = 0;
          this.x += direction[0];
          this.y += direction[1];
          temp.LEVEL[this.y][this.x] = 2;
        }
      }
    };

    this.bonus = {
      temp: this,
      x: 11,
      y: 9,
      pastPosition: [],
      randomSpawn() {
        const x = this.x;
        const y = this.y;
        while (this.temp.LEVEL[this.y][this.x] !== 0 ||
          ((this.x === x) && (this.y === y))) {
          this.x = Math.floor(Math.random() * 21);
          this.y = Math.floor(Math.random() * 21);
        }
        this.temp.LEVEL[y][x] = 0;
        this.temp.LEVEL[this.y][this.x] = this.temp.bonusCode;
      }
    };

    this.ghost = {
      temp: this,
      x: 9,
      y: 9,
      on: 0,
      num: 0,
      pastPosition: [],
      move(x, y, pacmanX, pacmanY) {
        const temp = this.temp;
        let min = 500;
        let max = 0;
        let way = [];
        const isWall = (y, x) => temp.LEVEL[y][x] === temp.wallCode;
        const isGhost2 = (y, x) => temp.LEVEL[y][x] === temp.ghost2Code;
        for (let i = y - 1; i <= y + 1; i++) {
          const startX = x - 1 + ((y + i) % 2);
          for (let j = startX; j <= x + 1; j += 2) {
            if (temp.LEVEL[i]) {
              if (!isWall(i, j) && !isGhost2(i, j)) {
                const thisWayLenght = ((j - pacmanX) * (j - pacmanX)) + ((i - pacmanY) * (i - pacmanY));
                const noBack = !((j === this.pastPosition[0]) && (i === this.pastPosition[1]));
                if (temp.pacman.killingMode) {
                  if ((thisWayLenght > max) && noBack) {
                    max = thisWayLenght;
                    way = [j, i];
                  }
                } else if ((thisWayLenght < min) && noBack) {
                  min = thisWayLenght;
                  way = [j, i];
                }
              }
            }
          }
        }
        temp.LEVEL[this.y][this.x] = this.on;
        this.pastPosition = [this.x, this.y];
        if (way.length === 0) way = this.pastPosition;
        this.x = way[0];
        this.y = way[1];
        this.on = temp.LEVEL[this.y][this.x];
        if (this.on === temp.pacmanCode && !temp.pacman.killingMode) {
          temp.gameOver = true;
        }
        temp.LEVEL[this.y][this.x] = 4;
      }
    };

    this.ghost2 = {
      temp: this,
      x: 18,
      y: 19,
      on: 0,
      gameOver: false,
      num: 0,
      pastPosition: [],
      move(x, y, pacmanX, pacmanY) {
        const temp = this.temp;
        let min = 500;
        let way = [];
        let max = 0;
        const isWall = (y, x) => temp.LEVEL[y][x] === temp.wallCode;
        const isGhost = (y, x) => temp.LEVEL[y][x] === temp.ghostCode;
        for (let i = y - 1; i <= y + 1; i++) {
          const startX = x - 1 + ((y + i) % 2);
          for (let j = startX; j <= x + 1; j += 2) {
            if (temp.LEVEL[i]) {
              if (!isGhost(i, j) && !isWall(i, j)) {
                const thisWayLenght = ((j - pacmanX) * (j - pacmanX)) + ((i - pacmanY) * (i - pacmanY));
                const noBack = !((j === this.pastPosition[0]) && (i === this.pastPosition[1]));
                if (temp.pacman.killingMode) {
                  if ((thisWayLenght > max) && noBack) {
                    max = thisWayLenght;
                    way = [j, i];
                  }
                } else if ((thisWayLenght < min) && noBack) {
                  min = thisWayLenght;
                  way = [j, i];
                }
              }
            }
          }
        }
        temp.LEVEL[this.y][this.x] = this.on;
        this.pastPosition = [this.x, this.y];
        if (way.length === 0) way = this.pastPosition;
        this.x = way[0];
        this.y = way[1];
        this.on = temp.LEVEL[this.y][this.x];
        if (this.on === temp.pacmanCode && !temp.pacman.killingMode) {
          temp.gameOver = true;
        }
        temp.LEVEL[this.y][this.x] = temp.ghost2Code;
      }
    };
  }
}
