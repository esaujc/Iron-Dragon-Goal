
function buildDom(html) {
  var div = document.createElement('div');
  div.innerHTML = html;
  return div.children[0];
}

function main() {

  var mainContainerElement = document.querySelector('#main-container');

  // -- Splash
  var splashElement = null;
  var splashButton = null;
  var audio = new Audio("audio/dragon_ball_z_escenas_de_batalla.mp3");



  var handleSplashClick = function () {
  
  //  var audio = new Audio("audio/goku.wav");
  //  audio.play();
   
    // audio.muted = true;
    //audio.msPlayToDisabled = true;
    destroySplash();
    buildGame();
  }

  function buildSplash() {
    splashElement = buildDom(`
      <main class="splash container background">
        <h1 class="splash__title">Dragon 'Goal'</h1>
        <button>Start</button>
        
      </main>
    `)

    // <audio src="audio/chalaheadchala.mp3" autoplay></audio>
    mainContainerElement.appendChild(splashElement);
    
    splashButton = document.querySelector('button');
    splashButton.addEventListener('click', handleSplashClick);
    

  }
  function destroySplash() {
    splashButton.removeEventListener('click', handleSplashClick);
    splashElement.remove();
  }

  // -- Game
  var game = null;
  var handleGameOver = function () {
    destroyGame();
    buildGameover(game.winner, game.totalDragonBalls);
  };

  function buildGame() {
    game = new Game(mainContainerElement);
   audio.play();
    game.onOver(handleGameOver);
  }
  function destroyGame() {
    game.destroy();
  }

  // -- Gameover
  var gameoverElement = null;
  var gameoverButton = null;

  var handleGameoverClick = function () {
    destroyGameover();
    buildSplash();
  }

  function buildGameover(winnerPlayer, totalDragonBalls) {
    gameoverElement = buildDom(`
      <main class="gameover container">
        <h1>Winner Player<span class="winner"></span></h1>
        <p>Dragon Balls Collected: <span class="dragonBalls"></span></p>
        <button>Restart</button>
      </main>
    `);
    mainContainerElement.appendChild(gameoverElement);

    gameoverButton = document.querySelector('button');
    gameoverButton.addEventListener('click', handleGameoverClick);

    var winnerElement = document.querySelector('.winner');
    winnerElement.innerText = winnerPlayer;
    var dragonBallElement = document.querySelector('.dragonBalls');
    dragonBallElement.innerText = totalDragonBalls;
  }

  function destroyGameover() {
    gameoverButton.removeEventListener('click', handleGameoverClick);
    gameoverElement.remove();
  }

  buildSplash();
}

document.addEventListener('DOMContentLoaded', main);