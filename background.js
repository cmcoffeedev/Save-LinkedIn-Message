let color = '#000000';

chrome.runtime.onInstalled.addListener(() => {

  chrome.tabs.onActivated.addListener(async info => {
    const tab = await chrome.tabs.get(info.tabId);

    let isLeetcode = false;
    if( tab.url.startsWith('https://leetcode.com/')  || tab.url.startsWith('https://leetcode-cn.com/')){
      console.log("isLeet")
      isLeetcode = true;
    }
      console.log("isNotLeet")
    isLeetcode
        ? chrome.action.enable(tab.tabId)
        : chrome.action.disable(tab.tabId);
  });
});

