const button = document.getElementById('btn');

//  Depending on the background state show the initial button;
backgroundState();

//  Send message to start the background, change the buttons;
button.addEventListener('click', () => {
	if (button.textContent === 'Start') {
		sendMessageToBackground({ message: 'start' });
		button.textContent = 'Stop';
	} else {
		sendMessageToBackground({ message: 'stop' });
		button.textContent = 'Start';
	}
});

async function backgroundState() {
	chrome.storage.session.get(['isScriptRunning']).then((result) => {
		button.textContent = result.isScriptRunning ? 'Stop' : 'Start';
	});
}

// Message function;
async function sendMessageToBackground(message) {
	return chrome.runtime.sendMessage(message);
}
