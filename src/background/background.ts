// Only fire the event when the URL has changed

// Background worker

chrome.tabs.onUpdated.addListener(async(id, change, tab) => {

    // inject js file called 'inject.js'
    const [activeTab] = await chrome.tabs.query({
        active: true,
        currentWindow: true
    })
    await chrome.tabs.sendMessage(activeTab.id,{

        type:'event_url_changed',
        data: [change, tab]
    })
});

