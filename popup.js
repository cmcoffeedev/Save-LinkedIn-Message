// Initialize butotn with users's prefered color
let changeColor = document.getElementById("changeColor");


// When the button is clicked, inject disableSyntaxHighlight into current page
changeColor.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({active: true, currentWindow: true});

    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        function: disableSyntaxHighlight,
    });
});

// The body of this function will be execuetd as a content script inside the
// current page
function disableSyntaxHighlight() {
    // let elementsByClass = document.querySelectorAll(".cm-s,.cm-meta,.cm-keyword,.cm-atom,.cm-number,.cm-def,.cm-variable,.cm-variable,.cm-variable,.cm-property,.cm-operator,.cm-comment,.cm-string,.cm-string,.cm-error,.cm-qualifier,.cm-builtin,.cm-bracket,.cm-tag,.cm-attribute,.CodeMirror-matchingbracket,.CodeMirror-nonmatchingbracket,.CodeMirror-matchingtag,.CodeMirror-nonmatchingtag");
    // for (let i = 0; i < elementsByClass.length; i++) {
    //     let element = elementsByClass[i];
    //     element.style.color = "black";
    // }


    let nameLink = document.getElementsByClassName('msg-thread__link-to-profile');
    console.log(`nameLink length is ${nameLink.length}`)
    for (let i = 0; i < nameLink.length; i++) {
        let element = nameLink[i];
        console.log(`element is ${element}`)
    }

    
    let headerText = document.getElementsByClassName('msg-s-event-listitem__subject');
    console.log(`headerText length is ${headerText.length}`)
    for (let i = 0; i < headerText.length; i++) {
        let element = headerText[i];
        console.log(`element is ${element.innerText}`)
    }

    

    let bodyText = document.getElementsByClassName('msg-s-event-listitem__body');
    console.log(`headerText length is ${headerText.length}`)
    for (let i = 0; i < headerText.length; i++) {
        let element = headerText[i];
        console.log(`element is ${element.innerText}`)
    }

    console.log("test")
    let senderNameElement = document.getElementById('thread-detail-jump-target');
    console.log(senderNameElement.innerText);


    var currentUrl = window.location.href;
    console.log(`currentUrl is ${currentUrl}`);


    //todo: try using MutationOberserver to listen to CodeMirror-lines class



}
