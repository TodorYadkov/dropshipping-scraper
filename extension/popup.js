import { getData } from './util/storageActions.js';
import { multiBrowser, tokenName } from './constants/constants.js'
import { checkUserInput } from './util/validateUserInput.js';

// Get reference to DOM elements
const mainContainer = document.querySelector('.container');

const buttonAction = document.querySelector('.btn.action');
const logoutBtn = document.querySelector('.btn.logout');

const userInfo = document.querySelector('.user-info');
const form = document.querySelector('.form');

const serverError = form.querySelector('.server-error');

// Depending on the background state show the initial state
backgroundState();

// Start/stop extension
buttonAction.addEventListener('click', () => {
	if (buttonAction.textContent === 'Start') {
		sendMessageToBackground({ message: 'start' });
		buttonAction.textContent = 'Stop';
	} else {
		sendMessageToBackground({ message: 'stop' });
		buttonAction.textContent = 'Start';
	}
});

// Send login form data to the background
form.addEventListener('submit', (e) => {
	e.preventDefault();

	const userInput = Object.fromEntries(new FormData(e.target));
	const { verifiedInput, hasError } = checkUserInput(userInput, form);

	if (hasError === false) {
		sendMessageToBackground({
			message: 'login',
			userData: verifiedInput
		});
	}
});

// Logout functionality
logoutBtn.addEventListener('click', () => sendMessageToBackground({ message: 'logout' }));

// Popup listen to background messages 
multiBrowser.runtime.onMessage.addListener(async function (message, sender, sendResponse) {
	try {
		switch (message.message) {
			case 'successfulLogin':
				const { email, extensionName } = message.userData;

				userInfo.querySelector('.email>span').textContent = email;
				userInfo.querySelector('.extension-name>span').textContent = extensionName;

				form.reset();

				form.remove();
				mainContainer.append(userInfo);

				serverError.textContent = '';
				serverError.style.display = 'none';
				break;

			case 'successfulLogout':
				mainContainer.append(form);
				userInfo.remove();
				break;

			case 'errorServerLogin':
				serverError.textContent = message.error;
				serverError.style.display = 'block';
				break;
		}

	} catch (err) {
		console.error(err);
	}
});

// Initial state to popup extension
async function backgroundState() {
	try {
		const result = await getData(['isScriptRunning', tokenName]);
		// Set appropriate state on button depending on script running
		buttonAction.textContent = result.isScriptRunning ? 'Stop' : 'Start';

		// Set which section to be visible depending on user state
		result[tokenName]?.accessToken ? form.remove() : userInfo.remove();

		if (result[tokenName]) {
			const { email, extensionName } = result[tokenName];

			userInfo.querySelector('.email>span').textContent = email;
			userInfo.querySelector('.extension-name>span').textContent = extensionName;
		}

	} catch (err) {
		console.error(err);
	}
}

async function sendMessageToBackground(message) {
	return await multiBrowser.runtime.sendMessage(message);
}