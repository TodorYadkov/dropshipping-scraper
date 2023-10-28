try {
    // Do some DOM manipulation  
    console.log('Content script is done!');
    chrome.runtime.sendMessage({ message: "closeTab" });

} catch(err) {
    chrome.runtime.sendMessage({message: 'contentError', contentError: err});
}