const PATTERN_lENGTH = 20;

let createPattern = (mode) => {
	  document.getElementById("gameMode").value = mode.id;
  	document.getElementById("stepCount").innerHTML = "!!";
  	document.getElementById("dashText").innerHTML = "New Game!";
  	
  	let textPattern = "";
  	const possibleChars = "RGBY";

  	let patternData = generateRandomPattern(textPattern,PATTERN_lENGTH,possibleChars);
  	
  	document.getElementById("pattern").value = patternData;
  	showSteps();
};

let showSteps = (repeatation = "") => {
  let pattern = document.getElementById("pattern").value; 
  let steps = document.getElementById("stepCount").textContent;

  let newStepValue = stepsUpdation(steps,repeatation);

  document.getElementById("stepCount").innerHTML = newStepValue;
  document.getElementById("dashText").innerHTML = "Remember the pattern shown!";
  document.getElementById("lockStatus").value = "unlocked";
  document.getElementById("userInput").value = "";
  alert("Pattern: "+pattern.slice(0,newStepValue));
};

let appendClicks = (divisionId) => {
  let lockStatus = document.getElementById("lockStatus").value;
  let oldUserInputVal = document.getElementById("userInput").value;

  let newUserInputVal = latestUserInput(oldUserInputVal,divisionId.id);
  document.getElementById("userInput").value = newUserInputVal;

  let noOfSteps = document.getElementById("stepCount").value;
  let pattern = document.getElementById("pattern").value;
  let rightPattern = pattern.slice(0,parseInt(newUserInputVal.length));

  if(newUserInputVal != rightPattern) {
      alert("Wrong slice clicked!!");
      if(document.getElementById("gameMode").value == "Regular") {
        showSteps("repeat");
        return "Repeat Step!";
      }
      else {
        document.getElementById("stepCount").innerHTML = "!!";
        createPattern({"id":"Strict"});
        return "New Game!";
      }
    }

    noOfSteps = document.getElementById("stepCount").textContent;
    if(newUserInputVal.length == parseInt(noOfSteps)) {
      if(newUserInputVal.length == 20) {
        alert("Congratulations! You Won!!");
        document.getElementById("dashText").innerHTML = "!!Winner!!";
        document.getElementById("lockStatus").value = "locked";
        document.getElementById("stepCount").innerHTML = "!!";
      }
      else {
        showSteps();
      }
    }
};
