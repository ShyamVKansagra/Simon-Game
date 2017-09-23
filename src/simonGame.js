class SimonGame {
  constructor(
    renderFunction = console.log
  ) {
    const PATTERN_lENGTH = 20;
    const possibleChars = "RGBY";
    let textPattern = "";

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
    this.getGameState = () => this.gameInfo;

    this.setGameState = (gameInfo) => {
      this.gameInfo = Object.assign({},this.gameInfo,gameInfo);
      renderFunction(this.gameInfo);
    };

    this.startRegularMode = () => {
      textPattern = "";
      this.setGameState({newGame: true,lockStatus: "unlocked",gameMode: "regular",playerWin: false, userInput: "", currentPattern: "",generatedRandomPattern: "",showPattern: false,wrongClickByUser: false,steps: 0});
    };

    this.startStrictMode = () => {
      textPattern = "";
      this.setGameState({newGame: true,lockStatus: "unlocked",gameMode: "strict",playerWin: false, userInput: "", currentPattern: "",generatedRandomPattern: "",showPattern: false,wrongClickByUser: false,steps: 0});
    };   

    this.createPattern = () => {
      if(this.gameInfo.lockStatus === "unlocked") {
        for (let i = 0; i < PATTERN_lENGTH; i++) {
            textPattern += possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));
          }
          //alert(textPattern);
        this.setGameState({generatedRandomPattern: textPattern, newGame: true, lockStatus: "unlocked"});  
      }
    };

    this.showPattern = (repeatation = "") => {
      if(this.gameInfo.lockStatus === "unlocked") {
        this.gameInfo.steps = this.gameInfo.steps==="!!"?0:this.gameInfo.steps;
        this.gameInfo.steps = parseInt(this.gameInfo.steps);
        if(repeatation !== "repeat") {
          this.gameInfo.steps += 1; 
        }
        //alert(this.gameInfo.steps);
        let slicedPattern = this.gameInfo.generatedRandomPattern.slice(0,this.gameInfo.steps);
        this.setGameState({currentPattern: slicedPattern, showPattern: true, lockStatus: "unlocked", steps: this.gameInfo.steps, userInput: "", newGame: false, wrongClickByUser: false});
      }
    };

    this.appendUserInput = (clickedSlice) => {
      let lockValue = this.gameInfo.lockStatus;
      if(lockValue === "unlocked") {
        let latestUserInput = this.gameInfo.userInput+clickedSlice;
        //alert("latestUserInput"+latestUserInput);
        this.setGameState({lockStatus: "unlocked",userInput: latestUserInput,showPattern: false, newGame: false});
      }
    };

    this.validateUserInput = () => {
      const patternToMatch = this.gameInfo.generatedRandomPattern.slice(0,this.gameInfo.userInput.length);
      //alert(this.gameInfo.userInput);
      if(this.gameInfo.userInput !== patternToMatch) {
        this.setGameState({wrongClickByUser: true, lockStatus: "unlocked", gameMode: this.gameInfo.gameMode, showPattern: false});
      }
      else {
        //this.setGameState({lockStatus: "unlocked"});
        if(!this.gameInfo.playerWin) {
          this.checkForWinningState();
        }
      }
    };

    this.checkForWinningState = () => {
      if(this.gameInfo.userInput === this.gameInfo.generatedRandomPattern && this.gameInfo.userInput.length === 20) {
        this.setGameState({playerWin: true,lockStatus: "locked"});
      }
    };
  } 
}

