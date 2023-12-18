import { multiBrowser } from './constants/constants.js'
import { getData } from './util/storageActions.js';

const buttonAction = document.querySelector('.btn.action');
const form = document.querySelector('.form');

//  Depending on the background state show the initial button;
backgroundState();

//  Send message to start the background, change the buttons;
buttonAction.addEventListener('click', () => {
	if (buttonAction.textContent === 'Start') {
		sendMessageToBackground({ message: 'start' });
		buttonAction.textContent = 'Stop';
	} else {
		sendMessageToBackground({ message: 'stop' });
		buttonAction.textContent = 'Start';
	}
});

async function backgroundState() {
	const result = await getData(['isScriptRunning']);
	buttonAction.textContent = result.isScriptRunning ? 'Stop' : 'Start';
}

// Message function;
async function sendMessageToBackground(message) {
	return multiBrowser.runtime.sendMessage(message);
}

form.addEventListener(
	'submit',
	(e) => sendMessageToBackground({
		message: 'login',
		userData: Object.fromEntries(new FormData(e.target))
	})
);


