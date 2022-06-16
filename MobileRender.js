'use strict';

class MobileRender {
  constructor(element, width, height) {
    this.element = element;
    this.width = width;
    this.height = height;

    this.canvas = document.getElementById('canvas2');
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.canvas.context = this.canvas.getContext('2d');
  }
  renderButton() {

    this.canvas.context.fillStyle = 'navy';
    this.canvas.context.fillRect(this.width * 4 / 9,
      0, this.width / 9, this.width / 9);
    this.canvas.context.fillRect(this.width * 2 / 9,
      this.height * 3 / 18, this.width / 9, this.width / 9);
    this.canvas.context.fillRect(this.width * 6 / 9,
      this.height * 3 / 18, this.width / 9, this.width / 9);
    this.canvas.context.fillRect(this.width * 4 / 9,
      this.height * 6 / 18, this.width / 9, this.width / 9);
  }
}
