function Game(parent) {
  var self = this;

  self.winner = 1;

  self.parentElement = parent;
  self.gameElement = null
  self.onGameOverCallback = null;

  self._init();
  self._initGameElements();
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

// Inicializa los Screen, players and Items
Game.prototype._initGameElements = function() {

    var self = this;

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



}

Game.prototype._startLoop = function () {
  var self = this;

  self.score = 0;
  

  // // Dibujo los Screen
  // self.screen = new Screen(self.canvasElement,1,self.canvasElement.width-5,1,(self.canvasElement.height/2)-5);
  // self.screen2 = new Screen(self.canvasElement,1,self.canvasElement.width-5,(self.canvasElement.height/2)+5,self.canvasElement.height-5);
  // self.screen.color = 'blue';
  // self.screen2.color = 'green';

  // // Creo el array de items, el jugador y le asigno Screen y límites del screen
  // self.items = [];
 
  // self.player = new Player(self.canvasElement);
  // self.player.screen = 1;


  // self.player.xMin = self.screen.xMin; 
  // self.player.yMin = self.screen.yMin;
  // self.player.xMax = self.screen.xMax;
  // self.player.yMax = self.screen.yMax;
  // self.player.color = 'red';
  


  // self.items2 = [];
  // self.items2.xMin = self.screen.xMin; 
  // self.items2.yMin = self.screen.yMin;
  // self.items2.xMax = self.screen.xMax;
  // self.items2.yMax = self.screen.yMax;
  

  // self.player2 = new Player(self.canvasElement);
  // self.player2.screen = 2;
  
  // self.player2.x = self.screen2.xMin; 
  // self.player2.y = self.screen2.yMin;
  // self.player2.xMin = self.screen2.xMin; 
  // self.player2.yMin = self.screen2.yMin;
  // self.player2.xMax = self.screen2.xMax;
  // self.player2.yMax = self.screen2.yMax;
  // self.player2.color = 'yellow';
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
    self._playerNotArrived();

    if (self.screen.end === false) {
      requestAnimationFrame(loop);
    } else {
      self.onGameOverCallback();
    }
  }

  requestAnimationFrame(loop);
}

Game.prototype._updateAll = function ()  {
  var self = this;

  self._lanzarItems(1);
  self._lanzarItems(2);

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

  // self.items.forEach(function(item) {
  //   item.render();
  // })

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

Game.prototype._lanzarItems = function (screen)  {
  var self = this;

  // Lanzamiento de Items typo 1 - Bolas de Energía
  if (screen === 1 && self.screen.sentDragon === false){
    if (Math.random() > 0.97) {
      var randomY = Math.random() * self.screen.yMax * 0.8;
      var newItem = new Item(self.canvasElement, self.width, randomY,10,self.screen.speedPlayer,1);
      self.items.push(newItem);
      
    }
      // Lanzamiento de Items typo 2 - Dragon Ball
    if (Math.random() > 0.99) {   
      var randomY = Math.random() * self.screen.yMax * 0.8;
      var newItem = new Item(self.canvasElement, self.width, randomY,10,self.screen.speedPlayer,2);
      self.items.push(newItem);

    }



  }

  //    self.screen       self.canvasElement,1,self.canvasElement.width-5,(self.canvasElement.height/2)+5,self.canvasElement.height-5);
        //function Screen(canvas,xMin,xMax,yMin,yMax){
// function Item(canvas, x, y, size, vel,type) {

  // Lanzamiento de Items typo 1 - Bolas de Energía
  if (screen === 2 && self.screen2.sentDragon === false){
    if (Math.random() > 0.97) {
      var randomY = Math.random() * ((self.screen2.yMax - self.screen2.yMin)+ self.screen2.yMin) * 0.8;
      var newItem = new Item(self.canvasElement, self.screen2.xMax, randomY,10,self.screen2.speedPlayer,1);
      self.items2.push(newItem);
      
    }
      // Lanzamiento de Items typo 2 - Dragon Ball
    if (Math.random() > 0.99) {   
      var randomY = Math.random() * self.screen2.yMax * 0.8;
      var newItem = new Item(self.canvasElement, self.width, randomY,10,self.screen2.speedPlayer,2);
      self.items2.push(newItem);

    }

  
  }
}

Game.prototype._checkAllCollision = function() {
  var self = this;
  
  // Check del Screen 1
  self.items.forEach(function(item, idx) {
    if(self.player.checkCollision(item)) {
      self.items.splice(idx, 1);
        // Si el Item es de tipo X, aumenta o disminuye velocidad
        if (item.type === 1)  {
          self._speedDown();
        }else if (item.type === 2){
          self._speedUp();
        } else if (item.type === 3){
          self.screen.end = true;
        }
    }
  });

  // Check del Screen 2
  self.items2.forEach(function(item, idx) {
    if(self.player2.checkCollision(item)) {
      self.items2.splice(idx, 1);
        // Si el Item es de tipo X, aumenta o disminuye velocidad
        if (item.type === 1)  {
          self._speedDown();
        }else if (item.type === 2){
          self._speedUp();
        } else if (item.type === 3){
          self.screen2.end = true;
        }
    }
  });

}

Game.prototype._speedUp = function(){
  var self = this;

  if (self.screen.speedPlayer < self.screen.speedMaxPlayer){
    self.items.forEach(function(element,idx){
      self.items[idx].vel += 1;
    });
    self.screen.speedPlayer += 1;
  }
  console.log(self.screen.speedPlayer);
  console.log(self.screen.distanciaActual);

}
Game.prototype._speedDown = function(){
  var self = this;

  // Controls the speed is not 0
  if (self.screen.speedPlayer > self.screen.speedMinPlayer){
    self.items.forEach(function(element,idx){
      self.items[idx].vel -= 1;
    });
    self.screen.speedPlayer -= 1;
    
  }
  // console.log(self.screen.speedPlayer);
  // console.log(self.screen.distanciaActual);

}


Game.prototype._playerNotArrived = function () {
  var self = this;
  
  if (self.screen.distanciaActual < 1000 && self.screen.sentDragon == false){
    var newItem = new Item(self.canvasElement, self.width, 10,self.canvasElement.height/3,self.screen.speedPlayer,3);
    self.items.push(newItem);
    self.screen.sentDragon = true;
  }

  if (self.screen.distanciaActual <= 0){
    return false;
  }


  return true;
}

Game.prototype._updateUI = function() {
  var self = this;

  self.scoreElement.innerText = self.score;
  self.livesElement.innerText = self.screen.distanciaActual;
  // self.livesElement.innerText = self.player.lives;
  
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

