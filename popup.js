let saveBtn = document.getElementById("saveBtn");

// When the button is clicked, inject disableSyntaxHighlight into current page
saveBtn.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({active: true, currentWindow: true});

    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        function: getLinkedInMsgData,
    });
});

let sheetsBtn = document.getElementById("sheetsBtn");

// When the button is clicked, inject disableSyntaxHighlight into current page
sheetsBtn.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({active: true, currentWindow: true});

    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        function: openUrl,
    });
});




// The body of this function will be execuetd as a content script inside the
// current page
const getLinkedInMsgData = async() => {


    // let nameLink = document.getElementsByClassName('msg-thread__link-to-profile');
    // console.log(`nameLink length is ${nameLink.length}`)
    // for (let i = 0; i < nameLink.length; i++) {
    //     let element = nameLink[i];
    //     console.log(`element is ${element}`)
    //     nameLinks += element.innerText;
    // }

    
    let headerText = document.getElementsByClassName('msg-s-event-listitem__subject');
    // console.log(`headerText length is ${headerText.length}`)
    let nameLinks = '';
    let senderName = '';
    let subjectText = '';
    let bodyTxt = '';
    let msgUrl = '';
    for (let i = 0; i < headerText.length; i++) {
        let element = headerText[i].innerText;
        // console.log(`element is ${element}`)
        subjectText += element;
    }


    let bodyText = document.getElementsByClassName('msg-s-event-listitem__body');
    // console.log(`bodyText length is ${bodyText.length}`)
    for (let i = 0; i < bodyText.length; i++) {
        let element = bodyText[i].innerText;
        // console.log(`element is ${element}`)
        bodyTxt += element;
    }


    let senderNameElement = document.getElementById('thread-detail-jump-target');
    // console.log(senderNameElement.innerText);
    senderName = senderNameElement.innerText;

    var currentUrl = window.location.href;
    // console.log(`currentUrl is ${currentUrl}`);
    msgUrl = currentUrl;


    let linkedinData = {
        name: senderName,
        subject: subjectText,
        body: bodyTxt,
        link: msgUrl,
        date: new Date()
    }



    chrome.runtime.sendMessage({greeting: "hello", linkedinData: linkedinData}, function(response) {
        // console.log("response is " + JSON.stringify(response));
    });

}


const openUrl = () =>{
    chrome.storage.sync.get('spreadsheetId', function (result) {
        // console.log('Value result  currently is ' + JSON.stringify(result));
        // console.log('Value currently is ' + result.spreadsheetId);
        let spreadsheetId = result.spreadsheetId
        if (spreadsheetId === undefined) {
        } else {
            window.open(`https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`, "_blank");
        }
    });
}





