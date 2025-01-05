chrome.runtime.onMessage.addListener((message, sender) => {
  switch (message.type) {
    case "openPanel":
      // Open the sidepanel for the extension
      chrome.sidePanel.open({ tabId: sender.tab.id }).then();
      break;

    case "subscribe":
      // Subscribe to the user
      const { stripeLink } = message;
      chrome.windows.create({
        url: stripeLink,
        type: "popup",
        width: 800,
        height: 600,
      });
      break;
  }
});
