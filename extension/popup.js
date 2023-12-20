import { multiBrowser } from './constants/constants.js'
import { getData } from './util/storageActions.js';

// Get reference to DOM elements
const mainContainer = document.querySelector('.container');

const buttonAction = document.querySelector('.btn.action');
const logoutBtn = document.querySelector('.btn.logout');

const userInfo = document.querySelector('.user-info');
const form = document.querySelector('.form');

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
	sendMessageToBackground({
		message: 'login',
		userData: Object.fromEntries(new FormData(e.target))
	});
});

// Logout functionality
logoutBtn.addEventListener('click', () => sendMessageToBackground({ message: 'logout' }));

// Popup listen to background messages 
multiBrowser.runtime.onMessage.addListener(async function (message, sender, sendResponse) {
	try {
		switch (message.message) {
			case 'successfulLogin':
				const result = await getData(['userData']);
				const { email, extensionName } = result.userData;

				userInfo.querySelector('.email>span').textContent = email;
				userInfo.querySelector('.extension-name>span').textContent = extensionName;

				form.reset();

				form.remove();
				mainContainer.append(userInfo);
				break;

			case 'successfulLogout':
				mainContainer.append(form);
				userInfo.remove();
				break;
		}

	} catch (err) {
		console.error(err);
	}
});

// Initial state to popup extension
async function backgroundState() {
	try {

		const result = await getData(['isScriptRunning', 'userData']);
		// Set appropriate state on button depending on script running
		buttonAction.textContent = result.isScriptRunning ? 'Stop' : 'Start';
		// Set which section to be visible depending on user state
		result?.userData?.accessToken ? form.remove() : userInfo.remove();

		if (result?.userData) {
			const { email, extensionName } = result.userData;

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