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
    this.canvas.context.fillRect(this.width * 3 / 7,
      0, this.width / 7, this.width / 7);
    this.canvas.context.fillRect(this.width * 3 / 14,
      this.height * 2.5 / 14, this.width / 7, this.width / 7);
    this.canvas.context.fillRect(this.width * 9 / 14,
      this.height * 2.5 / 14, this.width / 7, this.width / 7);
    this.canvas.context.fillRect(this.width * 3 / 7,
      this.height * 5 / 14, this.width / 7, this.width / 7);
  }
}
