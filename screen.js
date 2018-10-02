function Screen(canvas,xMin,xMax,yMin,yMax){
  var self = this;

  self.xMin = xMin;
  self.xMax = xMax;
  self.yMin = yMin;
  self.yMax = yMax;
  self.ctx = canvas.getContext('2d');
  self.color;
  //self.items = items; //Esto es un array
  //self.player = player;
  self.distanciaInicial = 5000;
  self.distanciaActual = 5000;
  self.sentDragon = false;
  self.speedPlayer = 6;
  self.speedMinPlayer = 3;
  self.speedMaxPlayer = 10;
  self.end = false;
}

Screen.prototype.checkGoal = function(distanciaInicial, distanciaActual){

}

Screen.prototype.render = function(escenario) {
  var self = this;

  self.ctx.strokeStyle = self.color;
  self.ctx.strokeRect(self.xMin, self.yMin, self.xMax, self.yMax);
  self.distanciaActual -= self.speedPlayer; 

  var img = new Image();
  if (escenario === 1){
    img.src ="./img/landscapebig.jpg";
  }
  if (escenario === 2){
    img.src ="./img/Kame_House.jpg";
  }
  self.ctx.drawImage(img, self.xMin+200, self.yMin+200, self.xMax+200,self.yMax+200,self.xMin, self.yMin, self.xMax,self.yMax);

}
// Render
//Collitions -> Player- >Screen Sacamos las coordenadas
//GetCoordenate()

