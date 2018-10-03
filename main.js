
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
  var audio = new Audio("audio/game.mp3");  
  var audio2 = new Audio("audio/end.mp3");




  var handleSplashClick = function () {
  
  //  var audio = new Audio("audio/goku.wav");
  //  audio.play();
   
    // audio.muted = true;
    audio.msPlayToDisabled = true;
    
    window.setTimeout(function() {
      destroySplash();  
      buildGame();
    }, 1000);
    
    
  }

  function buildSplash() {
    splashElement = buildDom(`
      <main class="background">
        <div class="splash container">
          <h1 class="splash__title">Dragon 'Goal'</h1>
          <button>Start</button>
          
          <button id="modal-instructions">How to Play</button>
          <div id="myModal" class="modal">
            <div class="modal-content">
              <span class="close">&times;</span>
              <p>Some text in the Modal..</p>
            </div>

          </div>


          <audio src="audio/intro.mp3" autoplay></audio>

        </div>
      </main>
    `)

    // <audio src="audio/chalaheadchala.mp3" autoplay></audio>
    mainContainerElement.appendChild(splashElement);
    
    splashButton = document.querySelector('button');
    splashButton.addEventListener('click', handleSplashClick);
    
    // Get the modal
    var modal = document.getElementById('myModal');

    // Get the button that opens the modal
    var btn = document.getElementById("modal-instructions");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on the button, open the modal 
    btn.onclick = function() {
        modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
}


  }
  function destroySplash() {
    splashButton.removeEventListener('click', handleSplashClick);
    splashElement.remove();
  }

  // -- Game
  var game = null;
  var handleGameOver = function () {
   
    window.setTimeout(function() {
      destroyGame();
      buildGameover(game.winner, game.totalDragonBalls);
      audio.pause();
      audio.currentTime = 0;
      audio2.play();
    }, 300)

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
    audio2.pause();
    audio2.currentTime = 0;
    destroyGameover();
    buildSplash();
    
  }

  function buildGameover(winnerPlayer, totalDragonBalls) {
    gameoverElement = buildDom(`
      <main class="background-gameoverP1">
       <div class="gameover">
        <h1>Winner Player<span class="winner"></span></h1>
        <p>Dragon Balls Collected: <span class="dragonBalls"></span></p>
        <button>Restart</button>
      </div>
      </main>
    `);
    mainContainerElement.appendChild(gameoverElement);

    //Que fuerte!!!!! Cambio de clase en CSS mediante JS
    var player1WinnerElement = document.querySelector('main');
    if (winnerPlayer === 2){
      // player1WinnerElement.classList.remove("background-gameoverP1");
      // player1WinnerElement.classList.add("background-gameoverP2");
      player1WinnerElement.classList.replace("background-gameoverP1", "background-gameoverP2");

    }

    // Mirar esto: div.classList.replace("foo", "bar");



    gameoverButton = document.querySelector('button');
    gameoverButton.addEventListener('click', handleGameoverClick);

    var winnerElement = document.querySelector('.winner');
    winnerElement.innerText = winnerPlayer;
    var dragonBallElement = document.querySelector('.dragonBalls');
    dragonBallElement.innerText = totalDragonBalls;
    // var player1WinnerElement = document.querySelector('main .background-gameover');
    // var imagen = player1WinnerElement[0];
    // imagen.style = ('.background-gameoverP2');

    // self.canvasElement.setAttribute('height', self.height);
    
    // div.classList.add("anotherclass");

  }

  function destroyGameover() {
    gameoverButton.removeEventListener('click', handleGameoverClick);
    gameoverElement.remove();
  }

  buildSplash();
}

document.addEventListener('DOMContentLoaded', main);