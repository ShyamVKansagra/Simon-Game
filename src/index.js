  const getParamsFromInputs = () => {
	const noOfSessions = document.getElementById('sessions').value;
	const minutesPerPomodoro = document.getElementById('minutes-per-pomodoro').value;
	const minutesPerBreak = document.getElementById('minutes-per-break').value;
	return { noOfSessions, minutesPerPomodoro, minutesPerBreak };
};

const addEventListeners = () => {
	document.getElementById('Regular').addEventListener('click', createPattern);
	document.getElementById('Strict').addEventListener('click', createPattern;
	document.getElementById('B').addEventListener('click', appendClicks;
	document.getElementById('R').addEventListener('click', appendClicks);
	document.getElementById('G').addEventListener('click', appendClicks;
	document.getElementById('Y').addEventListener('click', appendClicks);
};

addEventListeners();