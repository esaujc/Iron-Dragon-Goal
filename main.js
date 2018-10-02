
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
    audio.msPlayToDisabled = true;
    destroySplash();
    buildGame();
  }

  function buildSplash() {
    splashElement = buildDom(`
      <main class="splash container">
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
    buildGameover(game.score);
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

  function buildGameover(score) {
    gameoverElement = buildDom(`
      <main class="gameover container">
        <h1>Game over</h1>
        <p>Your score: <span class="score"></span></p>
        <button>Restart</button>
      </main>
    `);
    mainContainerElement.appendChild(gameoverElement);

    gameoverButton = document.querySelector('button');
    gameoverButton.addEventListener('click', handleGameoverClick);

    var scoreElement = document.querySelector('.score');
    scoreElement.innerText = score;
  }

  function destroyGameover() {
    gameoverButton.removeEventListener('click', handleGameoverClick);
    gameoverElement.remove();
  }

  buildSplash();
}

document.addEventListener('DOMContentLoaded', main);