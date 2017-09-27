class SimonGame {
  constructor(
    renderFunction = console.log
  ) {
    this.gameState = {
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

    this.gameInfo = this.gameState;

    this.setGameState = (gameInfo) => {
      this.gameInfo = Object.assign({},this.gameInfo,gameInfo);
      renderFunction(this.gameInfo);
    };

    this.startGame = (gameMode) => {
      this.gameInfo = {
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

    const showPattern = (repeatation = "") => {
      if (this.gameInfo.lockStatus === "unlocked") {
        if (repeatation !== "repeat") {
          this.gameInfo.steps += 1; 
        }
        let slicedPattern = this.gameInfo.generatedRandomPattern.slice(0,this.gameInfo.steps);
        this.setGameState({
          currentPattern: slicedPattern, 
          showPattern: true, 
          userInput: "", 
        });
      }
    };

    this.processUserInput = (sliceColor) => {
      if (this.gameInfo.lockStatus === "unlocked") {
        const latestUserInput = this.gameInfo.userInput+sliceColor;
        this.gameInfo.userInput = latestUserInput;
        this.gameInfo.showPattern = false;
        this.gameInfo.newGame = false;
      }
      validateUserInput();
    };

    const validateUserInput = () => {
      const patternToMatch = this.gameInfo.generatedRandomPattern.slice(0,this.gameInfo.userInput.length);
      if (this.gameInfo.userInput !== patternToMatch) {
        this.setGameState({
          wrongClickByUser: true, 
        });
      } else {  //correct input, so check for win
          if (!this.gameInfo.playerWin && this.gameInfo.userInput.length === 20) {
            this.setGameState({playerWin: true, lockStatus: "locked"});
          } else {
            this.gameInfo.userInput.length === this.gameInfo.steps && showPattern();
          }
      }
    };

    this.resetGame = () => {
      this.gameInfo.wrongClickByUser = false;
      if (this.gameInfo.gameMode === 'regular') {
        showPattern('repeat');
      } else {
        this.startGame('strict');
      }
    };
  } 
}
