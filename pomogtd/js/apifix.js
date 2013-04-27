if (!chrome.runtime.onMessage) {
    chrome.runtime.onMessage = chrome.extension.onMessage;
}

if (!chrome.runtime.sendMessage) {
    chrome.runtime.sendMessage = chrome.extension.sendMessage;
}

