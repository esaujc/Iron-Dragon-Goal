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
//  self.distanciaInicial = 10000;
//  self.distanciaActual = 10000;
}

Screen.prototype.checkGoal = function(distanciaInicial, distanciaActual){

}

Screen.prototype.render = function() {
  var self = this;

  self.ctx.strokeStyle = self.color;
  self.ctx.strokeRect(self.xMin, self.yMin, self.xMax, self.yMax);

}
// Render
//Collitions -> Player- >Screen Sacamos las coordenadas
//GetCoordenate()

