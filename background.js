let color = '#000000';

chrome.runtime.onInstalled.addListener(() => {


    chrome.tabs.onActivated.addListener(async info => {
        const tab = await chrome.tabs.get(info.tabId);

        let isLeetcode = false;
        // if( tab.url.startsWith('https://leetcode.com/')  || tab.url.startsWith('https://leetcode-cn.com/')){
        //   console.log("isLeet")
        //   isLeetcode = true;
        // }
        //   console.log("isNotLeet")
        // isLeetcode
        //     ? chrome.action.enable(tab.tabId)
        //     : chrome.action.disable(tab.tabId);
    });
});
//
//
// const SPREADSHEET_STORAGE_KEY = 'spreadsheetId'
//
// const getAuthToken = async (linkedinData) => {
//     chrome.identity.getAuthToken({interactive: true}, async function (token) {
//         console.log(`auth token is ${token}`)
//
//         chrome.storage.sync.get('spreadsheetId', function (result) {
//             console.log('Value result  currently is ' + JSON.stringify(result));
//             console.log('Value currently is ' + result.spreadsheetId);
//             let spreadsheetId = result.spreadsheetId
//             if (spreadsheetId === undefined) {
//                 createSheet(token, linkedinData)
//             } else {
//                 sendSheetData(spreadsheetId, linkedinData, token)
//             }
//         });
//     });
//
// }
//
//
//
// const sendSheetData = (spreadsheetId, linkedinData, token) => {
//
//     console.log(spreadsheetId);
//
//
//     let updateBody = {
//         "range": "Sheet1",
//         "values": [
//             [
//                 linkedinData.name,
//                 linkedinData.subject,
//                 linkedinData.body,
//                 linkedinData.link
//             ]
//         ]
//     };
//
//
//     fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Sheet1:append?insertDataOption=INSERT_ROWS&valueInputOption=RAW`, {
//         method: "POST",
//         body: JSON.stringify(updateBody),
//         headers: {"Content-type": "application/json; charset=UTF-8", Authorization: 'Bearer ' + token,}
//     })
//         .then(response => response.json())
//         .then(json => console.log(json))
//         .catch(err => console.log(err));
// }
//
//
// const createSheet = (token, linkedinData) => {
//     console.log("create sheet")
//
//
//     let _data = {
//         properties: {
//             "title": "LinkedIn Saved Messages"
//         }
//     }
//     fetch('https://sheets.googleapis.com/v4/spreadsheets?key=AIzaSyA7KQIofE6WH9YiP5ID9z1rqbjbItRq8Ww', {
//         method: "POST",
//         body: JSON.stringify(_data),
//         headers: {"Content-type": "application/json; charset=UTF-8", Authorization: 'Bearer ' + token,}
//     })
//         .then(response => response.json())
//         .then(json => {
//             console.log(json)
//
//
//             let spreadsheetId = json.spreadsheetId;
//             console.log(spreadsheetId);
//
//             console.log(`spreadstoreagekey token set is ${SPREADSHEET_STORAGE_KEY}`)
//
//             chrome.storage.sync.set({'spreadsheetId': spreadsheetId}, function () {
//                 console.log('Value is set to ' + spreadsheetId);
//             });
//
//             sendSheetData(spreadsheetId, linkedinData, token)
//
//
//         })
//         .catch(err => console.log(err));
// }
//
//
//
//
//
// chrome.runtime.onMessage.addListener(
//     function (request, sender, sendResponse) {
//         console.log(sender.tab ?
//             "from a content script:" + sender.tab.url :
//             "from the extension");
//         // if (request.greeting === "hello")
//         getAuthToken(request.linkedinData);
//         sendResponse({farewell: "goodbye"});
//
//     }
// );
