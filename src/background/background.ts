
chrome.runtime.onMessage.addListener((message,sender) =>{
    switch(message.type){
        case 'openPanel':
            // Open the sidepanel for the extension
            chrome.sidePanel.open({tabId: sender.tab.id}).then()
            break;
    }
})
