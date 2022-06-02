'use strict'

class Render {
  constructor(element, width, height, rows, columns) {
    this.element = element
    this.width = width
    this. height = height

    this.blockWidth = this.width / columns
    this.blockHeight = this.height / rows

    this.canvas = document.getElementById('canvas')
    this.canvas.width = this.width
    this.canvas.height = this.height
    this.canvas.context = this.canvas.getContext('2d')

  }
  renderLevel(Level, pos) {
    this.canvas.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    for(let y = 0; y < Level.length; y++){
      const row = Level[y]
      for(let x = 0; x < row.length; x++){
        const block = row[x]
        switch(block){
          case 1:
            this.canvas.context.fillStyle = 'navy'
            this.canvas.context.fillRect(x * this.blockWidth, y * this.blockHeight, this.blockWidth, this.blockHeight)
            break            
          case 2:
            this.canvas.context.beginPath();
            this.canvas.context.arc(x * this.blockWidth + this.blockWidth / 2, y * this.blockHeight + this.blockHeight / 2, 20, pos * Math.PI, (pos-0.4) * Math.PI)
            this.canvas.context.lineTo(x * this.blockWidth + this.blockWidth / 2, y * this.blockHeight + this.blockWidth / 2)
            this.canvas.context.fillStyle = "yellow"
            this.canvas.context.fill()
            break
          case 3:
            this.canvas.context.beginPath();
            this.canvas.context.arc(x * this.blockWidth + this.blockWidth / 2, y * this.blockHeight + this.blockHeight / 2, 4, 0, 2 * Math.PI)
            this.canvas.context.lineTo(x * this.blockWidth + this.blockWidth / 2, y * this.blockHeight + this.blockWidth / 2)
            this.canvas.context.fillStyle = "black"
            this.canvas.context.fill()
            break
        }
      }
    }
  }
}

