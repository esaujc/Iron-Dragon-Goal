# Project's name
**Dragon 'Goal'**

## Description
Goku and Piccolo are flying trying to find the the sacred Dragon, dodging Kame-ha and picking Dragon Balls.



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

Game.prototype._init
Game.prototype._initGameElements
Game.prototype._startLoop();
Game.prototype.buildDom;

Game.prototype._updateAll
Game.prototype._renderAll
Game.prototype._clearAll
Game.prototype._lanzarItems
Game.prototype._checkAllCollision
Game.prototype._speedUp
Game.prototype._speedDown
Game.prototype._playerNotArrivedP1
Game.prototype._playerNotArrivedP2
Game.prototype._updateUI
Game.prototype.onOver
Game.prototype.destroy


```

```
Player.js

Player(canvas) {

  self.x
  self.y
  self.xMin
  self.yMin
  self.xMax
  self.yMin
  self.vel
  self.size
  self.direction
  self.directionX
  self.color;
  self.dragonBalls
  self.kamesRecieved
  self.ctx
}

Player.prototype.update
Player.prototype.render
Player.prototype.setDirection
Player.prototype.setDirectionX
Player.prototype._checkLimits
Player.prototype.checkCollision


```



```
Item.js

Item(canvas, x, y, size, vel, type) {

  self.x 
  self.y 
  self.color
  self.vel 
  self.size
  self.direction
  self.ctx
  self.type
}

Item.prototype.update
Item.prototype.render
Item.prototype.isDeath
Item.prototype.collided


```


```
Screen.js

Screen(canvas,player,xMin,xMax,yMin,yMax ){
  self.xMin
  self.xMax
  self.yMin
  self.yMax
  self.color
  self.ctx
  self.distanciaInicial
  self.distanciaActual
  self.sentDragon 
  self.speedPlayer
  self.speedMinPlayer
  self.speedMaxPlayer
  self.end
}

Screen.prototype.render

```

## States y States Transitions

- splashScreen
  - buildSplash();
  - destroyGameover();
  - buildGame();
  - buildInstructions();* Implemented in different way
  - destroyInstructions();*
  - buildPlayerSelector();* Not implemented
- gameScreen
  - destroySplash();
  - buildGameover();
  - destroyGameover();
  - destroyPlayerSelector();* Not implemented
- gameoverScreen
  - destroyGame();
  - buildGame();
  - buildSplash();
- instructions *
  - Modal used.
- playerSelector * Not implemented
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
  - Add movement in both screens separately.
3. Collition Control.
  - When a collition occurs with a player and and item:
    - Items that increase speed.  _SpeedDown()
    - Items that decrease speed.  _SpeedDown()
4. Arrive to the Goal and finish the game.
  - Check the distance and send the object Goal to the player when distance to the finish is close.  
  - Control that after Goal item is sent, no more Items are sent.
  - Control when the collition with this Goal item finish the game.
5. 3 types of items:
  - Dragon Ball - Increase speed.
  - Yellow Kame - Decrease speed.
  - Kame hame ha! - ??? Try it.

After that:
6. Add separate backgrounds with movement.
7. Add sound and music.


### Git
URls for the project repo and deploy
[Link Repo](https://github.com/esaujc)
[Link Deploy](https://esaujc.github.io/Iron-Dragon-Goal/)


### Slides
URls for the project presentation (slides)
[Link Slides.com](https://slides.com/esaujc/deck/fullscreen)
