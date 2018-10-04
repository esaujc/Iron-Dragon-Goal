
function Player(canvas) {
  var self = this;

  self.x = 0;
  self.y = 0;
  self.xMin;
  self.yMin;
  self.xMax;
  self.yMin;
  self.vel = 5;
  self.size = 60;
  self.direction = 0;
  self.directionX = 0;
  self.lives = 5;
  self.screen = 1;
  self.color;
  self.dragonBalls = 0;
  self.kamesRecieved = 0;
  self.ctx = canvas.getContext('2d');
}

Player.prototype.update = function () {
  var self = this;

  self.y += (self.vel * self.direction);
  self.x += (self.vel * self.directionX);

  self._checkLimits();
}

Player.prototype.render = function (numberPlayer) {
  var self = this;
  //var randomIdx = Math.floor(Math.random() * globalColors.length);

  // self.ctx.fillStyle = self.color;
  // self.ctx.fillRect(self.x, self.y, self.size, self.size);

  var img = new Image();

  if (numberPlayer === 1){
    img.src = "img/goku57x55.png";
  }
  if (numberPlayer === 2){
    img.src = "img/piccolo57x55.png";
  }
  


  self.ctx.drawImage(img, 0, 0, 57,55,self.x,self.y,57,55);
}

Player.prototype.setDirection = function (direction) {
  var self = this;

  self.direction = direction;
}
Player.prototype.setDirectionX = function (direction) {
  var self = this;

  self.directionX = direction;
}


Player.prototype._checkLimits = function () {
  var self = this;
  if (self.y < self.yMin) {
    self.setDirection(1);
  }
  else if (self.y > self.yMax - self.size) {
    self.setDirection(-1);
  }

  if (self.x < self.xMin) {
    self.setDirectionX(0);
  }
  else if (self.x > self.xMax - 300) {
    self.setDirectionX(-1);
  }
}


Player.prototype.checkCollision = function (object) {
  var self = this;

  var crashRight = self.x + self.size > object.x;
  var crashBottom = self.y + self.size > object.y;
  var crashTop = self.y < object.y + object.size;
  var crashLeft = self.x < object.x + object.size;

  if (crashLeft && crashRight && crashTop && crashBottom) {
    return true;
  }

  return false;
}
