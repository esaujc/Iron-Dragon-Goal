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
  self.distanciaInicial = 40000;
  self.distanciaActual = 40000;
  self.sentDragon = false;
  self.speedPlayer = 4;
  self.speedMinPlayer = 4;
  self.speedMaxPlayer = 20;
  self.end = false;
}


Screen.prototype.render = function(escenario) {
  var self = this;

  self.ctx.strokeStyle = self.color;
  self.ctx.strokeRect(self.xMin, self.yMin, self.xMax, self.yMax);
  self.distanciaActual -= self.speedPlayer; 

}


