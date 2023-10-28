const startScript = document.getElementById('start-script');
const stopScript = document.getElementById('stop-script');

//  Depending on the background state show the initial button;
backgroundState();

//  Send message to start the background, change the buttons;
startScript.addEventListener('click', () => {
    sendMessageToBackground({ message: 'start' });
    startScript.style.display = 'none';
    stopScript.style.display = 'block';
});

//  Send message to stop the background, change the buttons;
stopScript.addEventListener('click', () => {
    sendMessageToBackground({ message: 'stop' });
    startScript.style.display = 'block';
    stopScript.style.display = 'none';
});

async function backgroundState() {

    chrome.storage.session.get(["isScriptRunning"]).then((result) => {
        if (result.isScriptRunning) {
            stopScript.style.display = 'block';
        } else {
            startScript.style.display = 'block';
        }
      });

}

// Message function;
async function sendMessageToBackground(message) {
    return chrome.runtime.sendMessage(message);
}