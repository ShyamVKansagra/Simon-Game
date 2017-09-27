class SimonGame {
  constructor(
    renderFunction = console.log
  ) {
    const initialState = {
      playerWin: false,
      newGame: false,
      lockStatus: "locked", //possible values 'locked' and 'unlocked'
      userInput: "", //Input chars from user
      currentPattern: "",
      generatedRandomPattern: "",
      showPattern: false,
      gameMode: "", //Possible values 'regular' and 'strict' 
      wrongClickByUser: false,
      steps: 0
    };

    let gameState = initialState;

    this.setState = (newGameState) => {
      gameState = Object.assign({}, gameState, newGameState);
      renderFunction(gameState);
    };

    this.startGame = (gameMode) => {
      gameState = {
        playerWin: false,
        newGame: true,
        lockStatus: "unlocked",
        userInput: "",
        currentPattern: "",
        generatedRandomPattern: createPattern(),
        showPattern: false,
        gameMode,
        wrongClickByUser: false,
        steps: 0
      };

      showPattern();
    }

    const createPattern = () => {
        const PATTERN_lENGTH = 20;
        const possibleChars = "RGBY";
        let textPattern = "";

        for (let i = 0; i < PATTERN_lENGTH; i++) {
          textPattern += possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));
        }
        return textPattern;
    };

    const showPattern = (repetition = "") => {
      if (gameState.lockStatus === "unlocked") {
        if (repetition !== "repeat") {
          gameState.steps += 1; 
        }

        const slicedPattern = gameState.generatedRandomPattern.slice(0, gameState.steps);
        
        this.setState({
          currentPattern: slicedPattern, 
          showPattern: true, 
          userInput: "", 
        });
      }
    };

    this.processUserInput = (sliceColor) => {
      if (gameState.lockStatus === "unlocked") {
        const latestUserInput = gameState.userInput+sliceColor;
        gameState.userInput = latestUserInput;
        gameState.showPattern = false;
        gameState.newGame = false;
      }
      validateUserInput();
    };

    const validateUserInput = () => {
      const patternToMatch = gameState.generatedRandomPattern.slice(0, gameState.userInput.length);
      if (gameState.userInput !== patternToMatch) {
        this.setState({
          wrongClickByUser: true, 
        });
      } else {  //correct input, so check for win
          if (!gameState.playerWin && gameState.userInput.length === 20) {
            this.setState({ playerWin: true, lockStatus: "locked" });
          } else {
            gameState.userInput.length === gameState.steps && showPattern();
          }
      }
    };

    this.resetGame = () => {
      gameState.wrongClickByUser = false;
      if (gameState.gameMode === 'regular') {
        showPattern('repeat');
      } else {
        this.startGame('strict');
      }
    };
  } 
}
