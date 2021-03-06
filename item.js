function Item(canvas, x, y, size, vel,type) {
  var self = this;

  self.x = x - 20;
  self.y = y;
  self.color = 'yellow';
  self.size = size;
  self.vel = vel;
  // self.currentVel = vel; // Se utilizará para reducir la meta
  self.ctx = canvas.getContext('2d');
  self.type = type; // 1 - Kame que resta vel, 2 - Dragon Ball, 3 - Final
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
    if (self.type === 1){
      img.src = "img/ball01.png";
      self.ctx.drawImage(img, self.x, self.y, 45,30);

    }
    if (self.type === 2){
      img.src = "img/Dragon_Ball_1-35x34.png";
      self.ctx.drawImage(img, self.x, self.y, 45,30);
    }
    if (self.type === 3){
      img.src = "img/dragol-goal.png";
      self.ctx.drawImage(img, self.x, self.y, 200,260);
    }
    if (self.type === 4){
      img.src = "img/kame-azul.png";
      self.ctx.drawImage(img, self.x, self.y, 55,40);
    }

  // }
  // self.ctx.drawImage(img, 0, 0, 57,55,self.x,self.y,10,7);


  
}

Item.prototype.isDeath = function () {
  var self = this;

  return (self.x + self.size) < 0;
}


Item.prototype.collided = function () {
  var self = this;

  self.vel += 5;
  
}