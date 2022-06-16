'use strict';

class Render {
  constructor(element, width, height, rows, columns) {
    this.element = element;
    this.width = width;
    this.height = height;
    this.blockWidth = this.width / columns;
    this.blockHeight = this.height / rows;

    this.canvas = document.getElementById('canvas');
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.canvas.context = this.canvas.getContext('2d');

  }
  renderLevel(Level, pos, anim, smooth, pacmanColor = 'yellow') {
    this.canvas.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (let y = 0; y < Level.length; y++) {
      const row = Level[y];
      for (let x = 0; x < row.length; x++) {
        const centrX = x * this.blockWidth + this.blockWidth / 2;
        const centrY = y * this.blockHeight + this.blockHeight / 2;
        const block = row[x];
        const retreatX = x * this.blockWidth + this.blockWidth / 2;
        const retreatY = y * this.blockHeight + this.blockHeight / 2;
        const radius = this.blockWidth * 9 / 20;
        const feet = 4;
        const headRadius = radius * 0.8;
        const footRadius = headRadius / feet;
        switch (block) {
        case 1:
          this.canvas.context.fillStyle = 'navy';
          this.canvas.context.fillRect(x * this.blockWidth,
            y * this.blockHeight, this.blockWidth, this.blockHeight);
          break;
        case 2:
          this.canvas.context.beginPath();
          this.canvas.context.arc(centrX - smooth.pacmanX,
            centrY - smooth.pacmanY,
            radius, (pos - anim) * Math.PI, (pos - 0.4 + anim) * Math.PI);
          this.canvas.context.lineTo(centrX - smooth.pacmanX, centrY - smooth.pacmanY);
          this.canvas.context.fillStyle = pacmanColor;
          this.canvas.context.fill();
          break;
        case 3:
          this.canvas.context.beginPath();
          this.canvas.context.arc(centrX, centrY, this.blockWidth / 10, 0, 2 * Math.PI);
          this.canvas.context.lineTo(centrX, centrY);
          this.canvas.context.fillStyle = 'black';
          this.canvas.context.fill();
          break;
        case 4:
          this.canvas.context.strokeStyle =  'black';
          this.canvas.context.fillStyle =  'red';
          this.canvas.context.lineWidth = radius * 0.05;
          this.canvas.context.beginPath();
          for (let foot = 0; foot < feet; foot++) {
            this.canvas.context.arc(
              (2 * footRadius * (feet - foot)) - headRadius - footRadius + retreatX - smooth.ghostX,
              radius - footRadius + retreatY - smooth.ghostY,
              footRadius, 0, Math.PI
            );
          }
          this.canvas.context.lineTo(-headRadius + retreatX - smooth.ghostX,
            radius - footRadius + retreatY - smooth.ghostY);
          this.canvas.context.arc(retreatX - smooth.ghostX,
            headRadius - radius + retreatY - smooth.ghostY, headRadius, Math.PI, 2 * Math.PI);
          this.canvas.context.closePath();
          this.canvas.context.fill();
          this.canvas.context.stroke();

          this.canvas.context.fillStyle = 'white';
          this.canvas.context.beginPath();
          this.canvas.context.arc(-headRadius / 2.5 + retreatX - smooth.ghostX,
            -headRadius / 2 + retreatY - smooth.ghostY,
            headRadius / 3, 0, 2 * Math.PI);
          this.canvas.context.fill();
          this.canvas.context.beginPath();
          this.canvas.context.arc(headRadius / 3.5 + retreatX - smooth.ghostX,
            -headRadius / 2 + retreatY - smooth.ghostY,
            headRadius / 3, 0, 2 * Math.PI);
          this.canvas.context.fill();

          this.canvas.context.fillStyle = 'black';
          this.canvas.context.beginPath();
          this.canvas.context.arc(-headRadius / 2 + retreatX - smooth.ghostX,
            -headRadius / 2.2 + retreatY - smooth.ghostY,
            headRadius / 8, 0, 2 * Math.PI);
          this.canvas.context.fill();
          this.canvas.context.beginPath();
          this.canvas.context.arc(headRadius / 4 + retreatX - smooth.ghostX,
            -headRadius / 2.2 + retreatY - smooth.ghostY,
            headRadius / 8, 0, 2 * Math.PI);
          this.canvas.context.fill();
          break;
        case 5:
          this.canvas.context.strokeStyle =  'black';
          this.canvas.context.fillStyle =  'green';
          this.canvas.context.lineWidth = radius * 0.05;
          this.canvas.context.beginPath();
          for (let foot = 0; foot < feet; foot++) {
            this.canvas.context.arc(
              (2 * footRadius * (feet - foot)) - headRadius - footRadius + retreatX - smooth.ghost2X,
              radius - footRadius + retreatY - smooth.ghost2Y,
              footRadius, 0, Math.PI
            );
          }
          this.canvas.context.lineTo(-headRadius + retreatX - smooth.ghost2X,
            radius - footRadius + retreatY - smooth.ghost2Y);
          this.canvas.context.arc(retreatX - smooth.ghost2X,
            headRadius - radius + retreatY - smooth.ghost2Y, headRadius, Math.PI, 2 * Math.PI);
          this.canvas.context.closePath();
          this.canvas.context.fill();
          this.canvas.context.stroke();

          this.canvas.context.fillStyle = 'white';
          this.canvas.context.beginPath();
          this.canvas.context.arc(-headRadius / 2.5 + retreatX - smooth.ghost2X,
            -headRadius / 2 + retreatY - smooth.ghost2Y,
            headRadius / 3, 0, 2 * Math.PI);
          this.canvas.context.fill();
          this.canvas.context.beginPath();
          this.canvas.context.arc(headRadius / 3.5 + retreatX - smooth.ghost2X,
            -headRadius / 2 + retreatY - smooth.ghost2Y,
            headRadius / 3, 0, 2 * Math.PI);
          this.canvas.context.fill();

          this.canvas.context.fillStyle = 'black';
          this.canvas.context.beginPath();
          this.canvas.context.arc(-headRadius / 2 + retreatX - smooth.ghost2X,
            -headRadius / 2.2 + retreatY - smooth.ghost2Y,
            headRadius / 8, 0, 2 * Math.PI);
          this.canvas.context.fill();
          this.canvas.context.beginPath();
          this.canvas.context.arc(headRadius / 4 + retreatX - smooth.ghost2X,
            -headRadius / 2.2 + retreatY - smooth.ghost2Y,
            headRadius / 8, 0, 2 * Math.PI);
          this.canvas.context.fill();
          break;
        case 6:
          this.canvas.context.beginPath();
          this.canvas.context.arc(centrX, centrY, this.blockWidth * 3 / 8, 0, 2 * Math.PI);
          this.canvas.context.lineTo(centrX, centrY);
          this.canvas.context.fillStyle = 'red';
          this.canvas.context.fill();
        }
      }
    }
  }
}

