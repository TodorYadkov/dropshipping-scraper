import { multiBrowser } from './constants/constants.js'
import { getData } from './util/storageActions.js';

const buttonAction = document.querySelector('.btn.action');
const form = document.querySelector('.form');
const formContainer = document.querySelector('.login-form');
const userInfoContainer = document.querySelector('.user-info');
const logoutBtn = document.querySelector('.logout');

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
	const result = await getData(['isScriptRunning', 'accessToken']);
	buttonAction.textContent = result.isScriptRunning ? 'Stop' : 'Start';
	// result.accessToken ? formContainer.style.display = 'none' : userInfoContainer.style.display = 'none';
}

// Message function;
async function sendMessageToBackground(message) {
	return multiBrowser.runtime.sendMessage(message);
}

// Send login form data to the backgroundScript
form.addEventListener('submit', submitHandler);

logoutBtn.addEventListener('click', () => sendMessageToBackground({ message: 'logout' }));


function submitHandler(e) {
	e.preventDefault();
	sendMessageToBackground({
		message: 'login',
		userData: Object.fromEntries(new FormData(e.target))
	});
}

multiBrowser.runtime.onMessage.addListener(async function (message, sender, sendResponse) {
	console.log('---------');
	try {
		switch (message.message) {
			// TODO: after successful login use the new user info for popup html 
			case 'loginSuccessful':
				console.log(message.user);
				break;
			case 'successfulLogout':
				console.log('logout');
				formContainer.style.display = '';
				userInfoContainer.style.display = 'none';
				break;
		}
	} catch (err) {
		console.log(err);
	}
});
