function Item(canvas, x, y, size, vel) {
  var self = this;

  self.x = x - 20;
  self.y = y;
  self.color = 'yellow';
  self.size = size;
  self.vel = vel;
  self.ctx = canvas.getContext('2d');
}

Item.prototype.update = function () {
  var self = this;

  self.x -= self.vel;
}


Item.prototype.render = function () {
  var self = this;

  // self.ctx.fillStyle = self.color;
  // self.ctx.fillRect(self.x, self.y, self.size, self.size);

  var img = new Image();

  // if (numberPlayer === 1){
    img.src = "img/ball01.png";
  // }
  // self.ctx.drawImage(img, 0, 0, 57,55,self.x,self.y,10,7);

   self.ctx.drawImage(img, self.x, self.y, 45,30);

  
}

Item.prototype.isDeath = function () {
  var self = this;

  return (self.x + self.size) < 0;
}
