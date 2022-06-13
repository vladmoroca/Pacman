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
      [1, 0, 0, 1, 3, 1, 3, 3, 3, 3, 3, 3, 3, 3, 1, 3, 1, 0, 0, 1],
      [1, 1, 1, 1, 3, 1, 3, 1, 1, 0, 0, 1, 1, 3, 1, 3, 1, 1, 1, 1],
      [3, 3, 3, 3, 3, 3, 3, 1, 0, 4, 0, 0, 1, 3, 3, 3, 3, 3, 3, 3],
      [1, 1, 1, 1, 3, 1, 3, 1, 1, 1, 1, 1, 1, 3, 1, 3, 1, 1, 1, 1],
      [1, 0, 0, 1, 3, 1, 3, 3, 3, 3, 3, 3, 3, 3, 1, 3, 1, 0, 0, 1],
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
      // 0 - void
    ];
    this.score = 0;
    this.gameOver = false;
    this.pacman = {
      x: 1,
      y: 1
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
        let way = [];
        for (let i = y - 1; i <= y + 1; i++) {
          const startX = x - 1 + ((y + i) % 2);
          for (let j = startX; j <= x + 1; j += 2) {
            if (this.temp.LEVEL[i]) {
              if (this.temp.LEVEL[i][j] !== 1 && this.temp.LEVEL[i][j] !== 5) {
                const thisWayLenght = ((j - pacmanX) * (j - pacmanX)) + ((i - pacmanY) * (i - pacmanY));
                const noBack = !((j === this.pastPosition[0]) && (i === this.pastPosition[1]));
                if ((thisWayLenght < min) && noBack) {
                  min = thisWayLenght;
                  way = [j, i];
                }
              }
            }
          }
        }
        this.temp.LEVEL[this.y][this.x] = this.on;
        this.pastPosition = [this.x, this.y];
        if (this.pastPosition[0] === 9 && this.pastPosition[1] === 8) {
          this.temp.LEVEL[8][9] = 1;
          this.temp.LEVEL[8][10] = 1;
        }
        if (way.length === 0) way = this.pastPosition;
        this.x = way[0];
        this.y = way[1];
        this.on = this.temp.LEVEL[this.y][this.x];
        if (this.on === 2) this.temp.gameOver = true;
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
        for (let i = y - 1; i <= y + 1; i++) {
          const startX = x - 1 + ((y + i) % 2);
          for (let j = startX; j <= x + 1; j += 2) {
            if (this.temp.LEVEL[i]) {
              if (this.temp.LEVEL[i][j] !== 1 && this.temp.LEVEL[i][j] !== 4) {
                const thisWayLenght = ((j - pacmanX) * (j - pacmanX)) + ((i - pacmanY) * (i - pacmanY));
                const noBack = !((j === this.pastPosition[0]) && (i === this.pastPosition[1]));
                if ((thisWayLenght < min) && noBack) {
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
        if (this.on === 2)  this.temp.gameOver = true;
        this.temp.LEVEL[this.y][this.x] = 5;
      }
    };
  }

  moveRight(obj) {
    if (this.LEVEL[this[obj].y][this[obj].x + 1] === undefined) {
      this.LEVEL[this[obj].y][this[obj].x] = 0;
      this[obj].x = this.LEVEL[0].length - this[obj].x - 1;
      this.LEVEL[this[obj].y][this[obj].x] = 2;
      return 0;
    }
    if (this.LEVEL[this[obj].y][this[obj].x + 1] !== 1) {
      if (this.LEVEL[this[obj].y][this[obj].x + 1] === 4 || this.LEVEL[this[obj].y][this[obj].x + 1] === 5) {
        this.gameOver = true;
      }
      if (this.LEVEL[this[obj].y][this[obj].x + 1] === 3) {
        this.score += 100;
      }
      this.LEVEL[this[obj].y][this[obj].x] = 0;
      this[obj].x++;
      this.LEVEL[this[obj].y][this[obj].x] = 2;
    }
  }
  moveLeft(obj) {
    if (this.LEVEL[this[obj].y][this[obj].x - 1] === undefined) {
      this.LEVEL[this[obj].y][this[obj].x] = 0;
      this[obj].x = this.LEVEL[0].length - this[obj].x - 1;
      this.LEVEL[this[obj].y][this[obj].x] = 2;
      return 0;
    }
    if (this.LEVEL[this[obj].y][this[obj].x - 1] !== 1) {
      if (this.LEVEL[this[obj].y][this[obj].x - 1] === 4 || this.LEVEL[this[obj].y][this[obj].x - 1] === 5) {
        this.gameOver = true;
      }
      if (this.LEVEL[this[obj].y][this[obj].x - 1] === 3) {
        this.score += 100;
      }
      this.LEVEL[this[obj].y][this[obj].x] = 0;
      this[obj].x--;
      this.LEVEL[this[obj].y][this[obj].x] = 2;
    }
  }
  moveUp(obj) {
    if (this.LEVEL[this[obj].y - 1] === undefined) {
      this.LEVEL[this[obj].y][this[obj].x] = 0;
      this[obj].y = this.LEVEL.length - this[obj].y - 1;
      this.LEVEL[this[obj].y][this[obj].x] = 2;
      return 0;
    }
    if (this.LEVEL[this[obj].y - 1][this[obj].x] !== 1) {
      if (this.LEVEL[this[obj].y - 1][this[obj].x ] === 4 || this.LEVEL[this[obj].y - 1][this[obj].x ] === 5) {
        this.gameOver = true;
      }
      if (this.LEVEL[this[obj].y - 1][this[obj].x ] === 3) {
        this.score += 100;
      }
      this.LEVEL[this[obj].y][this[obj].x] = 0;
      this[obj].y--;
      this.LEVEL[this[obj].y][this[obj].x] = 2;
    }
  }
  moveDown(obj) {
    if (this.LEVEL[this[obj].y + 1] === undefined) {
      this.LEVEL[this[obj].y][this[obj].x] = 0;
      this[obj].y = this.LEVEL.length - this[obj].y - 1;
      this.LEVEL[this[obj].y][this[obj].x] = 2;
      return 0;
    }
    if (this.LEVEL[this[obj].y + 1][this[obj].x] !== 1) {
      if (this.LEVEL[this[obj].y + 1][this[obj].x] === 4 || this.LEVEL[this[obj].y + 1][this[obj].x] === 5) {
        this.gameOver = true;
      }
      if (this.LEVEL[this[obj].y + 1][this[obj].x ] === 3) {
        this.score += 100;
      }
      this.LEVEL[this[obj].y][this[obj].x] = 0;
      this[obj].y++;
      this.LEVEL[this[obj].y][this[obj].x] = 2;
    }
  }
}
