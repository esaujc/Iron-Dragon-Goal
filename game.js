function Game(parent) {
  var self = this;

  self.parentElement = parent;
  self.gameElement = null
  self.onGameOverCallback = null;

  self._init();
  self._startLoop();
}

Game.prototype._init = function () {
  var self = this;

  self.gameElement = buildDom(`
    <main class="game container">
      <header class="game__header">
        <div class="lives">
          <span class="label">Lives:</span>
          <span class="value"></span>
        </div>
        <div class="score">
          <span class="label">Score:</span>
          <span class="value"></span>
        </div>
      </header>
      <div class="game__canvas">
        <canvas class="canvas"></canvas>
      </div>
    </main>
  `)
  self.parentElement.appendChild(self.gameElement);

  self.canvasParentElement = document.querySelector('.game__canvas');
  self.canvasElement = document.querySelector('.canvas');

  self.livesElement = self.gameElement.querySelector('.lives .value');
  self.scoreElement = self.gameElement.querySelector('.score .value');

  self.width = self.canvasParentElement.clientWidth;
  self.height = self.canvasParentElement.clientHeight;

  self.canvasElement.setAttribute('width', self.width);
  self.canvasElement.setAttribute('height', self.height);

  self.ctx = self.canvasElement.getContext('2d');
  
  
  
}

Game.prototype._startLoop = function () {
  var self = this;

  self.score = 0;
  

  // Dibujo los Screen
  self.screen = new Screen(self.canvasElement,1,self.canvasElement.width-5,1,(self.canvasElement.height/2)-5);
  self.screen2 = new Screen(self.canvasElement,1,self.canvasElement.width-5,(self.canvasElement.height/2)+5,self.canvasElement.height-5);
  self.screen.color = 'blue';
  self.screen2.color = 'green';

  // Creo el array de items, el jugador y le asigno Screen y límites del screen
  self.items = [];
 
  self.player = new Player(self.canvasElement);
  self.player.screen = 1;


  self.player.xMin = self.screen.xMin; 
  self.player.yMin = self.screen.yMin;
  self.player.xMax = self.screen.xMax;
  self.player.yMax = self.screen.yMax;
  self.player.color = 'red';
  


  self.items2 = [];
  self.items2.xMin = self.screen.xMin; 
  self.items2.yMin = self.screen.yMin;
  self.items2.xMax = self.screen.xMax;
  self.items2.yMax = self.screen.yMax;
  

  self.player2 = new Player(self.canvasElement);
  self.player2.screen = 2;
  
  self.player2.x = self.screen2.xMin; 
  self.player2.y = self.screen2.yMin;
  self.player2.xMin = self.screen2.xMin; 
  self.player2.yMin = self.screen2.yMin;
  self.player2.xMax = self.screen2.xMax;
  self.player2.yMax = self.screen2.yMax;
  self.player2.color = 'yellow';
  // console.log(self.player2);

  
 // self.screen3 = new Screen(self.canvasElement,1,self.canvasElement.width-1,1,(self.canvasElement.height-1));
 // self.screen2.color = 'green';
  //self.screen = new Screen(canvas,xMin,xMax,yMin,yMax);
 // self.screen2 = new Screen(canvas,player2,items2,xMin,xMax,yMin,yMax);

  //console.log(screen.player);

  // NUEVO
  self.goal = [];
  self.__createGoal();

  self.handleKeyDown = function (evt) {
    if (evt.key === "ArrowDown") {
      self.player2.setDirection(1);
    }
    if (evt.key === "ArrowUp") {
      self.player2.setDirection(-1)
    }
    if (evt.key === "a") {
      self.player.setDirection(1);
    }
    if (evt.key === "q") {
      self.player.setDirection(-1)
   }
  //  console.log(evt.key);
  }

  document.addEventListener('keydown', self.handleKeyDown);

  function loop() {
    self._clearAll();
    self._updateAll();
    self._renderAll();

    if (self._isPlayerAlive()) {
      requestAnimationFrame(loop);
    } else {
      self.onGameOverCallback();
    }
  }

  requestAnimationFrame(loop);
}

Game.prototype._updateAll = function ()  {
  var self = this;

  self._spawnItem(1);
  self._spawnItem(2);

  self.items.forEach(function(item) {
    item.update();
  })

  self.items = self.items.filter(function(item) {
    if (item.isDeath()) {
      self.score += 1;
      return false;
    }
    return true;
  })

  self.items2.forEach(function(item) {
    item.update();
  })

  self.items2 = self.items2.filter(function(item) {
    if (item.isDeath()) {
      self.score += 1;
      return false;
    }
    return true;
  })


  self.player.update();
  self.player2.update();

  //NUEVO
  
  self.goal.forEach(function(item) {
    item.update();
  })

  // self.goal.update();

  self._checkAllCollision();

  self._updateUI();

}

Game.prototype.__createGoal = function(){
  var self = this;

  self.items.push(new Item(self.canvasElement,1500,20,30,10));


}

Game.prototype._renderAll = function ()  {
  var self = this;

  self.items.forEach(function(item) {
    item.render();
  })

  self.items2.forEach(function(item) {
    item.render();
  })

   self.screen.render();
   self.screen2.render();
  //self.screen3.render();

  self.player.render(1);
  self.player2.render(2);
  
  //NUEVO
  // self.screen.render('blue');
  // self.screen2.render('red');


}

Game.prototype._clearAll = function ()  {
  var self = this;

  self.ctx.clearRect(0, 0, self.width, self.height);
}

Game.prototype._spawnItem = function (screen)  {
  var self = this;

  if (screen === 1){
    if (Math.random() > 0.97) {
      
      var randomY = Math.random() * self.screen.yMax * 0.8;
      var newItem = new Item(self.canvasElement, self.width, randomY,10,5);

      //newItem.color = 'yellow';
  //    console.log(newItem.color);
      self.items.push(newItem);
      //self.items.push(new Item(self.canvasElement, self.width, randomY,10,5));
    }
  }
  if (screen === 2){
    if (Math.random() > 0.97) {

      var randomY = (Math.random() * ((self.screen2.yMax) - (self.screen2.yMin)) + self.screen2.yMin );
      // var randomY = Math.random() * ((self.screen2.yMax - self.screen2.yMin) + self.screen2.yMin ) * 0.8;

      var newItem = new Item(self.canvasElement, self.width, randomY,10,5);


      newItem.color = 'blue';
     // console.log(newItem.color);
      self.items2.push(newItem);
      //self.items.push(new Item(self.canvasElement, self.width, randomY,10,5));
    }
  }

  
}

Game.prototype._checkAllCollision = function() {
  var self = this;

  self.items.forEach(function(item, idx) {
    if(self.player.checkCollision(item)) {
      self.items.splice(idx, 1);
      self.player.collided();
    }
  });
}

Game.prototype._isPlayerAlive = function () {
  var self = this;

  return self.player.lives > 0;
}

Game.prototype._updateUI = function() {
  var self = this;

  self.scoreElement.innerText = self.score;
  self.livesElement.innerText = self.player.lives;
}

Game.prototype.onOver = function (callback) {
  var self = this;

  self.onGameOverCallback = callback;
}

Game.prototype.destroy = function () {
  var self = this;

  self.gameElement.remove();
  document.removeEventListener('keydown', self.handleKeyDown);
  //Remove setInterval if you have one
}

