const PATTERN_lENGTH = 20;

const addEventListeners = () => {
	document.getElementById('Regular').addEventListener('click', createPattern(this));
	document.getElementById('Strict').addEventListener('click', createPattern(this));
	document.getElementById('B').addEventListener('click', appendClicks(this));
	document.getElementById('R').addEventListener('click', appendClicks(this));
	document.getElementById('G').addEventListener('click', appendClicks(this));
	document.getElementById('Y').addEventListener('click', appendClicks(this));
};

let createPattern = (mode) => {
	document.getElementById("gameMode").value = mode.id;
  	document.getElementById("stepCount").innerHTML = "!!";
  	document.getElementById("dashText").innerHTML = "New Game!";
  	
  	let text = "";
  	const possibleChars = "RGBY";

  	let patternText = generateRandomPattern(text, PATTERN_lENGTH, possibleChars);
  	
  	document.getElementById("pattern").value = text;
  	showSteps();
};


addEventListeners();
