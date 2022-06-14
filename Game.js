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
      x: 1,
      y: 1,
      killingMode: false
    };

    this.bonus = {
      temp: this,
      x: 11,
      y: 9,
      randomSpawn() {
        const x = this.x;
        const y = this.y;
        while (this.temp.LEVEL[this.y][this.x] !== 0) {
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
        let min = 500;
        let max = 0;
        let way = [];
        const isWall = (y, x) => this.temp.LEVEL[y][x] === this.temp.wallCode;
        const isGhost2 = (y, x) => this.temp.LEVEL[y][x] === this.temp.ghost2Code;
        for (let i = y - 1; i <= y + 1; i++) {
          const startX = x - 1 + ((y + i) % 2);
          for (let j = startX; j <= x + 1; j += 2) {
            if (this.temp.LEVEL[i]) {
              if (!isWall(i, j) && !isGhost2(i, j)) {
                const thisWayLenght = ((j - pacmanX) * (j - pacmanX)) + ((i - pacmanY) * (i - pacmanY));
                const noBack = !((j === this.pastPosition[0]) && (i === this.pastPosition[1]));
                if (this.temp.pacman.killingMode) {
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
        this.temp.LEVEL[this.y][this.x] = this.on;
        this.pastPosition = [this.x, this.y];
        if (way.length === 0) way = this.pastPosition;
        this.x = way[0];
        this.y = way[1];
        this.on = this.temp.LEVEL[this.y][this.x];
        if (this.on === this.temp.pacmanCode && !this.temp.pacman.killingMode) {
          this.temp.gameOver = true;
        }
        this.temp.LEVEL[this.y][this.x] = 4;
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
        let min = 500;
        let way = [];
        let max = 0;
        const isWall = (y, x) => this.temp.LEVEL[y][x] === this.temp.wallCode;
        const isGhost = (y, x) => this.temp.LEVEL[y][x] === this.temp.ghostCode;
        for (let i = y - 1; i <= y + 1; i++) {
          const startX = x - 1 + ((y + i) % 2);
          for (let j = startX; j <= x + 1; j += 2) {
            if (this.temp.LEVEL[i]) {
              if (!isGhost(i, j) && !isWall(i, j)) {
                const thisWayLenght = ((j - pacmanX) * (j - pacmanX)) + ((i - pacmanY) * (i - pacmanY));
                const noBack = !((j === this.pastPosition[0]) && (i === this.pastPosition[1]));
                if (this.temp.pacman.killingMode) {
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
        this.temp.LEVEL[this.y][this.x] = this.on;
        this.pastPosition = [this.x, this.y];
        if (way.length === 0) way = this.pastPosition;
        this.x = way[0];
        this.y = way[1];
        this.on = this.temp.LEVEL[this.y][this.x];
        if (this.on === this.temp.pacmanCode && !this.temp.pacman.killingMode) this.temp.gameOver = true;
        this.temp.LEVEL[this.y][this.x] = this.temp.ghost2Code;
      }
    };
  }

  move(direction = [0, 0]) {
    if (this.LEVEL[this.pacman.y + direction[1]] === undefined) {
      this.LEVEL[this.pacman.y][this.pacman.x] = 0;
      this.pacman.y = this.LEVEL.length - this.pacman.y - 1;
      this.LEVEL[this.pacman.y][this.pacman.x] = this.pacmanCode;
    } else if (this.LEVEL[this.pacman.y + direction[1]][this.pacman.x + direction[0]] === undefined) {
      this.LEVEL[this.pacman.y][this.pacman.x] = 0;
      this.pacman.x = this.LEVEL[0].length - this.pacman.x - 1;
      this.LEVEL[this.pacman.y][this.pacman.x] = this.pacmanCode;
      return 0;
    }
    const nextPosition = this.LEVEL[this.pacman.y + direction[1]][this.pacman.x + direction[0]];
    if (nextPosition !== this.wallCode) {
      if (this.pacman.killingMode) {
        if (nextPosition === this.ghostCode) {
          this.ghost.x = 9;
          this.ghost.y = 9;
        }
        if (nextPosition === this.ghost2Code) {
          this.ghost2.x = 18;
          this.ghost2.y = 19;
        }
      } else if (nextPosition === this.ghostCode || nextPosition === this.ghost2Code) {
        this.gameOver = true;
      }
      if (nextPosition === this.scoreBallCode) {
        this.score += 100;
      }
      if (nextPosition === this.bonusCode) {
        this.pacman.killingMode = true;
      }
      this.LEVEL[this.pacman.y][this.pacman.x] = 0;
      this.pacman.x += direction[0];
      this.pacman.y += direction[1];
      this.LEVEL[this.pacman.y][this.pacman.x] = 2;
    }
  }
}
