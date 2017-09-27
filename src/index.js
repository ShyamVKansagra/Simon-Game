let simon = null;

const addEventListeners = () => {
  const gameModes = ['regular' , 'strict'];
  gameModes.forEach((gameMode) => 
    document.getElementById(gameMode).addEventListener('click',function() {
    simon.startGame(gameMode);
  }));

  const sliceColors = ['B', 'R', 'G', 'Y'];
  sliceColors.forEach((sliceColor) => 
    document.getElementById(sliceColor).addEventListener('click',function() {
    simon.processUserInput(sliceColor);
  }));
};

let simonGameController = () => {
  return new SimonGame(
    (gameState) => {
      if(gameState.showPattern) {
        document.getElementById("stepCount").innerHTML = gameState.steps;
        document.getElementById("dashText").innerHTML = "Remember the pattern shown!";
        alert("Pattern: "+gameState.currentPattern);
      }
      if(gameState.wrongClickByUser) {
        alert("Wrong slice clicked!!");
        simon.resetGame();
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

addEventListeners();
