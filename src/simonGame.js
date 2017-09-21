let generateRandomPattern = (textPattern, PATTERN_lENGTH, possibleChars) => {
	for (let i = 0; i < PATTERN_lENGTH; i++) {
    	textPattern += possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));
    }
    return textPattern;
};

let stepsUpdation = (steps,repeatation) => {
	steps = steps=="!!"?0:steps;
  	steps = parseInt(steps);
  	if(repeatation != "repeat") {
    	steps += 1; 
  	}
  	return steps;
};

let latestUserInput = (oldVal,divisionId) => {
	oldVal = oldVal+divisionId;
	return oldVal;
};
