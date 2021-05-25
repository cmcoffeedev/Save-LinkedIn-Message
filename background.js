// chrome.runtime.onInstalled.addListener(() => {
//
//
//     chrome.tabs.onActivated.addListener(async info => {
//         const tab = await chrome.tabs.get(info.tabId);
//
//         console.log(`tabUrl is ${tab.url}`)
//         let isLinkedIn = false;
//         if (tab.url.includes('https://linkedin.com/messaging/thread/' || 'https://www.linkedin.com/messaging/thread/')) {
//             isLinkedIn = true;
//         }
//         if (isLinkedIn) {
//             chrome.action.enable(tab.tabId)
//         } else {
//             chrome.action.disable(tab.tabId)
//         }
//
//     });
// });
