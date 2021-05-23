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

const getAuthToken = async (linkedinData) => {
    chrome.identity.getAuthToken({interactive: true}, function (token) {
        console.log(`auth token is ${token}`)
        createSheet(token, linkedinData);
    });

}


const createSheet = (token, linkedinData) => {
    console.log("create sheet")
    let _data = {
        properties: {
            "title": "testing"
        }
    }

    fetch('https://sheets.googleapis.com/v4/spreadsheets?key=AIzaSyA7KQIofE6WH9YiP5ID9z1rqbjbItRq8Ww', {
        method: "POST",
        body: JSON.stringify(_data),
        headers: {"Content-type": "application/json; charset=UTF-8", Authorization: 'Bearer ' + token,}
    })
        .then(response => response.json())
        .then(json => {
            console.log(json)


            let updateBody = {
                "range": "Sheet1",
                "values": [
                    [
                        linkedinData.name,
                        linkedinData.subject,
                        linkedinData.body,
                        linkedinData.link
                    ]
                ]
            };


            let spreadsheetId = json.spreadsheetId;
            console.log(spreadsheetId);


            fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Sheet1:append?insertDataOption=INSERT_ROWS&valueInputOption=RAW`, {
                method: "POST",
                body: JSON.stringify(updateBody),
                headers: {"Content-type": "application/json; charset=UTF-8", Authorization: 'Bearer ' + token,}
            })
                .then(response => response.json())
                .then(json => console.log(json))
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
}

function makeApiCall() {
    var spreadsheetBody = {
        // TODO: Add desired properties to the request body.
    };

    var request = gapi.client.sheets.spreadsheets.create({}, spreadsheetBody);
    request.then(function (response) {
        // TODO: Change code below to process the `response` object:
        console.log(response.result);
    }, function (reason) {
        console.error('error: ' + reason.result.error.message);
    });
}

function initClient() {
    var API_KEY = '';  // TODO: Update placeholder with desired API key.

    var CLIENT_ID = '';  // TODO: Update placeholder with desired client ID.

    // TODO: Authorize using one of the following scopes:
    //   'https://www.googleapis.com/auth/drive'
    //   'https://www.googleapis.com/auth/drive.file'
    //   'https://www.googleapis.com/auth/spreadsheets'
    var SCOPE = '';

    gapi.client.init({
        'apiKey': "AIzaSyA7KQIofE6WH9YiP5ID9z1rqbjbItRq8Ww",
        'clientId': "581299287932-4qb7dqf0bkk98nmn3aaken8p5mvhvf5b.apps.googleusercontent.com",
        'scope': "AIzaSyA7KQIofE6WH9YiP5ID9z1rqbjbItRq8Ww",
        'discoveryDocs': ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
    }).then(function () {
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSignInStatus);
        updateSignInStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    });
}

function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}

function updateSignInStatus(isSignedIn) {
    if (isSignedIn) {
        makeApiCall();
    }
}


chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.log(sender.tab ?
            "from a content script:" + sender.tab.url :
            "from the extension");
        // if (request.greeting === "hello")
        getAuthToken(request.linkedinData);

        sendResponse({farewell: "goodbye"});

        // initClient()
    }
);
