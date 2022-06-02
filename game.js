class Game {
  LEVEL = [
    [1,1,1,1,1,1,1,1,3,1,1,3,1,1,1,1,1,1,1,1],
    [1,2,3,3,3,3,3,3,3,1,1,3,3,3,3,3,3,3,3,1],
    [1,3,1,1,3,1,1,1,3,1,1,3,1,1,1,3,1,1,3,1],
    [1,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,1],
    [1,3,1,1,3,1,3,1,1,1,1,1,1,3,1,3,1,1,3,1],
    [1,3,3,3,3,1,3,3,3,1,1,3,3,3,1,3,3,3,3,1],
    [1,1,1,1,3,1,1,1,3,1,1,3,1,1,1,3,1,1,1,1],
    [0,0,0,1,3,1,3,3,3,3,3,3,3,3,1,3,1,0,0,0],
    [1,1,1,1,3,1,3,1,1,0,0,1,1,3,1,3,1,1,1,1],
    [3,3,3,3,3,3,3,1,0,0,0,0,1,3,3,3,3,3,3,3],
    [1,1,1,1,3,1,3,1,1,1,1,1,1,3,1,3,1,1,1,1],
    [0,0,0,1,3,1,3,3,3,3,3,3,3,3,1,3,1,0,0,0],
    [1,1,1,1,3,1,3,1,1,1,1,1,1,3,1,3,1,1,1,1],
    [1,3,3,3,3,3,3,3,3,1,1,3,3,3,3,3,3,3,3,1],
    [1,3,1,1,3,1,1,1,3,1,1,3,1,1,1,3,1,1,3,1],
    [1,3,3,1,3,3,3,3,3,3,3,3,3,3,3,3,1,3,3,1],
    [1,1,3,1,3,1,3,1,1,1,1,1,1,3,1,3,1,3,1,1],
    [1,3,3,3,3,1,3,3,3,1,1,3,3,3,1,3,3,3,3,1],
    [1,3,1,1,1,1,1,1,3,1,1,3,1,1,1,1,1,1,3,1],
    [1,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,1],
    [1,1,1,1,1,1,1,1,3,1,1,3,1,1,1,1,1,1,1,1]
  ]
  
  pacman = {
    x: 1,
    y: 1,
  }
  
  moveRight () {
    if(this.LEVEL[this.pacman.y][this.pacman.x + 1] == undefined){
      this.LEVEL[this.pacman.y][this.pacman.x] = 0
      this.pacman.x = this.LEVEL[0].length - this.pacman.x - 1
      this.LEVEL[this.pacman.y][this.pacman.x] = 2
     return 0
    }
    if(this.LEVEL[this.pacman.y][this.pacman.x + 1] !== 1) {
      this.LEVEL[this.pacman.y][this.pacman.x] = 0
      this.pacman.x++
      this.LEVEL[this.pacman.y][this.pacman.x] = 2
    }
  }
  moveLeft () {
    if(this.LEVEL[this.pacman.y][this.pacman.x - 1] == undefined){
      this.LEVEL[this.pacman.y][this.pacman.x] = 0
      this.pacman.x = this.LEVEL[0].length - this.pacman.x - 1
      this.LEVEL[this.pacman.y][this.pacman.x] = 2
     return 0
    }
    if(this.LEVEL[this.pacman.y][this.pacman.x - 1] !== 1) {
      this.LEVEL[this.pacman.y][this.pacman.x] = 0
      this.pacman.x--
      this.LEVEL[this.pacman.y][this.pacman.x] = 2
    }
  }
  moveUp () {
    if(this.LEVEL[this.pacman.y - 1] == undefined){
      this.LEVEL[this.pacman.y][this.pacman.x] = 0
      this.pacman.y = this.LEVEL.length-this.pacman.y-1
      this.LEVEL[this.pacman.y][this.pacman.x] = 2
      return 0
    }
    if(this.LEVEL[this.pacman.y - 1][this.pacman.x] !== 1) {
      this.LEVEL[this.pacman.y][this.pacman.x] = 0
      this.pacman.y--
      this.LEVEL[this.pacman.y][this.pacman.x] = 2
    }
  }
  moveDown () {
    if(this.LEVEL[this.pacman.y + 1] == undefined){
      this.LEVEL[this.pacman.y][this.pacman.x] = 0
      this.pacman.y = this.LEVEL.length - this.pacman.y - 1
      this.LEVEL[this.pacman.y][this.pacman.x] = 2
      return 0
    }
    if(this.LEVEL[this.pacman.y + 1][this.pacman.x] !== 1) {
      this.LEVEL[this.pacman.y][this.pacman.x] = 0
      this.pacman.y++
      this.LEVEL[this.pacman.y][this.pacman.x] = 2
    }
  }

}