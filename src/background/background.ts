
chrome.runtime.onMessage.addListener((message,sender) =>{
    switch(message.type){
        case 'notification':
         const messageData = message.data;
            chrome.notifications.create('alert:info', {
                type: 'basic',
                iconUrl: 'icon.png',
                title: 'Clipboard',
                message: message.data,
            });

            break;
        case 'openLink':
            chrome.tabs.create({
                url: message.url,
                active:true
            }).then()
            break;
    }
})