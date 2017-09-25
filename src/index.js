let simon = null;

const addEventListeners = () => {
  document.getElementById('Regular').addEventListener('click', startRegular);
  document.getElementById('Strict').addEventListener('click', startStrict);
  document.getElementById('B').addEventListener('click', clickedB);
  document.getElementById('R').addEventListener('click', clickedR);
  document.getElementById('G').addEventListener('click', clickedG);
  document.getElementById('Y').addEventListener('click', clickedY);
};

let simonGameController = () => {
  return new SimonGame(
    (gameState) => {
      if(gameState.newGame && gameState.generatedRandomPattern !== "") {
        document.getElementById("stepCount").innerHTML = "!!";
        document.getElementById("dashText").innerHTML = "New Game!";
      }
      if(gameState.showPattern) {
        document.getElementById("stepCount").innerHTML = gameState.steps;
        document.getElementById("dashText").innerHTML = "Remember the pattern shown!";
        alert("Pattern: "+gameState.currentPattern);
      }
      if(gameState.wrongClickByUser) {
        alert("Wrong slice clicked!!");
        if (gameState.gameMode === "strict") {
          document.getElementById('stepCount').innerHTML = "!!";
        }
      }
      if(gameState.playerWin) {
        alert("Congratulations! You Won!!");
        document.getElementById("dashText").innerHTML = "!!Winner!!";
        document.getElementById("stepCount").innerHTML = "!!";
      }
    }
  );
};

simon = simonGameController();

const startRegular = () => {
  simon.startRegularMode();
  initiateGame();
};

const startStrict = () => {
  simon.startStrictMode();
  initiateGame();
};

const initiateGame = () => {
  simon.createPattern();
  simon.showPattern();
};

const clickedB = () => {
  simon.appendUserInput('B');
  finishComputerMove();
};

const clickedR = () => {
  simon.appendUserInput('R');
  finishComputerMove();
};

const clickedG = () => {
  simon.appendUserInput('G');
  finishComputerMove();
};

const clickedY = () => {
  simon.appendUserInput('Y');
  finishComputerMove();
};

const finishComputerMove = () => {
  simon.validateUserInput();
  let gameState = simon.getGameState();
  if(gameState.wrongClickByUser) {
    if(gameState.gameMode === 'regular') {
      simon.showPattern('repeat');
    }
    else {
      simon.startStrictMode();
      simon.createPattern();
      simon.showPattern();
    }
  }
  else { //User Input is correct
    gameState = simon.getGameState();
    if(gameState.userInput.length === gameState.steps) {
      let gameWon = gameState.playerWin;
      if(!gameWon) {
        simon.showPattern();
      }
    }
  }
};

addEventListeners();
