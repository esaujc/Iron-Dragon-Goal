function Game(parent) {
  var self = this;

  self.winner = 0;
  self.totalDragonBalls = 0;

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
       <div class="player1">
          <img src="img/goku57x55.png" alt="Goku">
          <div>
            <div class="distance1">
              <span class="label">Remaining:</span>
              <span class="value"></span>
            </div>
            <div class="dragonBalls1">
            <span class="label">Total Balls: </span>
              <span class="value"></span>
            </div>     
          </div>
        </div>

        <div class="player2">
        <img src="img/piccolo57x55.png" alt="Piccolo">
        <div>
          <div class="distance2">
            <span class="label">Remaining:</span>
            <span class="value"></span>
          </div>
          <div class="dragonBalls2">
          <span class="label">Total Balls: </span>
            <span class="value"></span>
          </div>     
        </div>
      </div>



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

  self.distance1Element = self.gameElement.querySelector('.distance1 .value');
  self.dragonBalls1Element = self.gameElement.querySelector('.dragonBalls1 .value');

  self.distance2Element = self.gameElement.querySelector('.distance2 .value');
  self.dragonBalls2Element = self.gameElement.querySelector('.dragonBalls2 .value');


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
    // self.screen2 = new Screen(self.canvasElement,1,self.canvasElement.width - 10, self.canvasElement.height / 2 + 5, 400);
    // function Screen(canvas,xMin,xMax,yMin,yMax){

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
    self.items2.xMin = self.screen2.xMin; 
    self.items2.yMin = self.screen2.yMin;
    self.items2.xMax = self.screen2.xMax;
    self.items2.yMax = self.screen2.yMax;


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

  self.dragonBalls1 = 0;
  self.dragonBalls2 = 0;

  
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
    self._playerNotArrivedP1();
    self._playerNotArrivedP2();

    if ((self.screen.end === false) && (self.screen2.end === false)) {
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

  self._checkAllCollision();

  self._updateUI();

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

Game.prototype._lanzarItems = function (screen)  {
  var self = this;

  // Lanzamiento de Items typo 1 - Bolas de Energía
  if (screen === 1 && self.screen.sentDragon === false){
    var randomY = Math.random() * self.screen.yMax * 0.8;
    if (Math.random() > 0.97) {
     
      var newItem = new Item(self.canvasElement, self.width, randomY,10,self.screen.speedPlayer,1);
      self.items.push(newItem);
      
    }
      // Lanzamiento de Items typo 2 - Dragon Ball
    if (Math.random() > 0.99) {   
      // var randomY = Math.random() * self.screen.yMax * 0.8;
      var newItem = new Item(self.canvasElement, self.width, randomY,10,self.screen.speedPlayer,2);
      self.items.push(newItem);

    }
  }

  //    self.screen       self.canvasElement,1,self.canvasElement.width-5,(self.canvasElement.height/2)+5,self.canvasElement.height-5);
        //function Screen(canvas,xMin,xMax,yMin,yMax){
// function Item(canvas, x, y, size, vel,type) {

  // Lanzamiento de Items typo 1 - Bolas de Energía
  if (screen === 2 && self.screen2.sentDragon === false){
    var minY = self.canvasElement.height / 2 + 5;
      var maxY = self.canvasElement.height - 55;
      var randomY = Math.floor(Math.random() * (maxY - minY)) + minY; 
    if (Math.random() > 0.97) {
        //  return Math.floor(Math.random() * (max - min)) + min;
      // var randomY = Math.floor(Math.random() * ((self.canvasElement.height+50 - (self.canvasElement.height/2)+5))+ (self.canvasElement.height/2)) * 0.8;
      // console.log(randomY);
      // var minY = self.canvasElement.height / 2 + 5;
      // var maxY = self.canvasElement.height - 55;
      // var randomY = Math.floor(Math.random() * (maxY - minY)) + minY; 

      var newItem = new Item(self.canvasElement, self.screen2.xMax, randomY,10,self.screen2.speedPlayer,1);
      self.items2.push(newItem);
      
    }
      // Lanzamiento de Items typo 2 - Dragon Ball
    if (Math.random() > 0.99) {   
   //   var randomY = Math.floor(Math.random() * ((self.canvasElement.height +50 - (self.canvasElement.height/2)+5))+ (self.canvasElement.height/2)) * 0.8;
      // console.log(randomY);
      var newItem = new Item(self.canvasElement, self.screen2.xMax, randomY,10,self.screen2.speedPlayer,2);
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
          self._speedDown(1);
        }else if (item.type === 2){
          self._speedUp(1);
          self.player.dragonBalls++;
        } else if (item.type === 3){
          self.screen.end = true;  // con esto hay contacto con el objeto
          //if (self.winner === 0)
            self.winner = 1; // Se utiliza para saber quien ha llegado primero 
            self.totalDragonBalls = self.player.dragonBalls;
        }
    }
  });

  // Check del Screen 2
  self.items2.forEach(function(item, idx) {
    if(self.player2.checkCollision(item)) {
      self.items2.splice(idx, 1);
        // Si el Item es de tipo X, aumenta o disminuye velocidad
        if (item.type === 1)  {
          self._speedDown(2);
        }else if (item.type === 2){
          self._speedUp(2);
          self.player2.dragonBalls++;
        } else if (item.type === 3){
          self.screen2.end = true;
          self.winner = 2;
          self.totalDragonBalls = self.player2.dragonBalls;

        }
    }
  });

}

Game.prototype._speedUp = function(escenario){
  var self = this;

  if (escenario === 1){
    if (self.screen.speedPlayer < self.screen.speedMaxPlayer){
      self.items.forEach(function(element,idx){
        self.items[idx].vel += 1;
      });
      self.screen.speedPlayer += 1;
    }
  }
  if (escenario === 2){
      if (self.screen2.speedPlayer < self.screen2.speedMaxPlayer){
        self.items2.forEach(function(element,idx){
          self.items2[idx].vel += 1;
        });
        self.screen2.speedPlayer += 1;
      }
  }
  // console.log(self.screen.speedPlayer);
  // console.log(self.screen.distanciaActual);

}
Game.prototype._speedDown = function(escenario){
  var self = this;
  
  if (escenario === 1){
    // Controls the speed is not 0
    if (self.screen.speedPlayer > self.screen.speedMinPlayer){
      self.items.forEach(function(element,idx){
        self.items[idx].vel -= 1;
      });
      self.screen.speedPlayer -= 1;
     
    }
  }
  if (escenario === 2){
    if (self.screen2.speedPlayer > self.screen2.speedMinPlayer){
      self.items2.forEach(function(element,idx){
        self.items2[idx].vel -= 1;
      });
      self.screen2.speedPlayer -= 1;   
    }
  }


  // console.log(self.screen.speedPlayer);
  // console.log(self.screen.distanciaActual);

}


Game.prototype._playerNotArrivedP1 = function () {
  var self = this;
  
  if (self.screen.distanciaActual < 1000 && self.screen.sentDragon === false){
    var newItem = new Item(self.canvasElement, self.width, 10,self.canvasElement.height/3,self.screen.speedPlayer,3);
    self.items.push(newItem);
    console.log(self.items);
    self.screen.sentDragon = true;
  }

  if (self.screen.distanciaActual <= 0){
    return false;
  }


  return true;
}

Game.prototype._playerNotArrivedP2 = function () {
  var self = this;
  
  var minY = self.canvasElement.height / 2 + 5;
  var maxY = self.canvasElement.height - 55;

  if (self.screen2.distanciaActual < 1000 && self.screen2.sentDragon === false){
   // var newItem = new Item(self.canvasElement, 300, 500,self.screen2.speedPlayer,3);
    var newItem = new Item(self.canvasElement, self.width, self.canvasElement.height- 300, self.canvasElement.height/3,self.screen2.speedPlayer, 3);
    self.items2.push(newItem);
    console.log(self.items2)
    self.screen2.sentDragon = true;
    console.log("Crea el dragon 2");
  }

  if (self.screen2.distanciaActual <= 0){
    console.log("Distancia negativa")
    return false;
  }


  return true;
}


Game.prototype._updateUI = function() {
  var self = this;

  self.dragonBalls1Element.innerText = self.player.dragonBalls;
  self.dragonBalls2Element.innerText = self.player2.dragonBalls;

  self.distance1Element.innerText = self.screen.distanciaActual;
  // self.livesElement.innerText = self.player.lives;
  self.distance2Element.innerText = self.screen2.distanciaActual;

  
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

