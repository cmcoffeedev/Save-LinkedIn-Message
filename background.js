
chrome.runtime.onInstalled.addListener(() => {


    chrome.tabs.onActivated.addListener(async info => {
        const tab = await chrome.tabs.get(info.tabId);

        let isLinkedIn = false;
        if (tab.url.startsWith('https://linkedin.com/messaging/thread/' || 'https://www.linkedin.com/messaging/thread/')) {
            isLinkedIn = true;
        }
        isLinkedIn
            ? chrome.action.enable(tab.tabId)
            : chrome.action.disable(tab.tabId);
    });
});
