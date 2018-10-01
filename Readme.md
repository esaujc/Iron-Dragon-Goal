# Project's name
**Dragon 'Goal'**

## Description
Goku and friends are flying trying to find the the sacred Dragon, dodging Kame-ha and picking Dragon Balls.



## MVP (DOM - CANVAS)
**CANVAS**
- 2 Players independent. Screen split in two parts.
- Collisions with 2 different elements:
  - First increase your speed.
  - Second, decrease your speed 
- Arrive to the goal and show winner.

## Backlog
- Add images to the Players and Items. 
- Show Distance to the Goal. 
- Select Player Character.
- Add new items.
- Add sound.
- Add cronometre.


## Data structure
### game.js
```

Game()

_init
_startLoop();
Game.prototype.buildDom();
Game.prototype._updateAll()
Game.prototype._renderAll()
Game.prototype._clearAll()
Game.prototype._spawnEnemy() 
Game.prototype._checkAllCollision()
Game.prototype.onOver()
Game.prototype.destroy()
Game.prototype._sendGoal();

```

```
Player.js

Player(canvas) {

  self.x 
  self.y
  self.vel 
  self.size
  self.direction
  self.ctx
}

Player.prototype.update()
Player.prototype.render()
Player.prototype.setDirection()
Player.prototype._checkLimits()
Player.prototype.checkCollision()
Player.prototype.collided()
Player.prototype.itemIncrease() //Incrementa la velocidad del player hacia la meta
Player.prototype.itemDecrease()

```



```
Item.js

Item(canvas, x, y, size, vel) {

  self.x 
  self.y 
  self.vel 
  self.size
  self.direction
  self.ctx
}

Item.prototype.update()
Item.prototype.render()
Item.prototype.isDeath()

//Herencia
function ItemSpeedUpDown(velocidad)
ItemSpeedUpDown.prototype = Object.create(Item.prototype);
ItemSpeedUpDown.prototype.constructor = ItemSpeedUpDown;

function ItemGoal(distancia)
ItemGoal.prototype = Object.create(Item.prototype);
ItemGoal.prototype.constructor = ItemGoal;

```


```
Screen.js

Screen(canvas,player,xMin,xMax,yMin,yMax ){
  self.xMin
  self.xMax
  self.yMin
  self.yMax
  self.ctx
  self.items
  self.player
  self.distanciaInicial
  self.distanciaActual
}

Screen.prototype.checkGoal(distanciaInicial, distanciaActual)

```

## States y States Transitions

- splashScreen
  - buildSplash();
  - destroyGameover();
  - buildGame();
  - buildInstructions();*
  - destroyInstructions();*
  - buildPlayerSelector();*
- gameScreen
  - destroySplash();
  - buildGameover();
  - destroyGameover();
  - destroyPlayerSelector();*
- gameoverScreen
  - destroyGame();
  - buildGame();
  - buildSplash();
- instructions *
- playerSelector *
  - destroySplash();
  - destroyGameover();
  - buildGame();



## Task
Task definition in order of priority
1. Create a new class called Screen that includes Player and Items.
  - Create a new file and define the structure.
  - Add the function checkGoal() - Not implemented. Check if it can be reached.
  - Check the Screen is creating the right structure.
  - Create a Player 2 and Items 2.
  - Create the screens in the Game()
  - Check if Screen() it is working properly.
2. Split the screen in two.
  - Check the screen size and make the map for Header, Players tracks and items tracks.
  - Control Player 1 is always inside its track (Screen Collition).
  - Control Player 2 is always inside its track. (Screen Collition)
  - Control Items Player 1 are always inside its track. (Player and Screen Collition)
  - Control Items Player 2 are always inside its track. (Player and Screen Collition)
  - Control the color of items.
3. Collition Control.
  - When a collition occurs with a player and and item:
    - Items that increase speed. - function ItemSpeedUpDown(velocidad)
    - Items that decrease speed. - function ItemSpeedUpDown(velocidad)
4. Arrive to the Goal and finish the game.
  - Check the distance and send the object Goal to the player.  - function ItemGoal(distancia)
  - Control that after Goal item is sent, no more Items are sent.
  - Control when the collition with this Goal item finish the game (function checkGoal())


## Links


### Trello
[Link url](https://trello.com)


### Git
URls for the project repo and deploy
[Link Repo](http://github.com)
[Link Deploy](http://github.com)


### Slides
URls for the project presentation (slides)
[Link Slides.com](http://slides.com)
