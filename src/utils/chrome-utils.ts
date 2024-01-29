declare var chrome: any;

export type MessageType = {
  type: string;
  data?: any;
};

/**
 * Determines if the code is running in a ContentScript context
 * @return boolean
 */
export function isContentScript(): boolean {
  return !chrome.hasOwnProperty('tabs');
}

export async function sendToContentScript(data: MessageType) {
  const [tab] = await chrome.tabs.query({
    active: true,
    lastFocusedWindow: true,
    currentWindow: true,
  });
  if (tab?.id) {
    await chrome.tabs.sendMessage(tab.id, data, (response: any) =>
      console.log(response)
    );
  } else {
    console.log('CHECK AGAIN');
  }
}

export const getActivateCookieDuration = () => {
  return 60 * 60 * 1000;
};

export async function localStorageSet(
    key: string,
    value: any,
    ttl: number
) {
  const now = new Date();
  // `item` is an object which contains the original value
  // as well as the time when it's supposed to expire
  const item = {
    value: value,
    expiry: now.getTime() + ttl,
  };

  await chrome.storage.local.set({
    [`${key}`]: JSON.stringify(item),
  });
}

export async function localStorageGet(
    key: string,
): Promise<any> {

  const itemStr = await chrome.storage.local.get([key]);
  // if the item doesn't exist, return null
  if (!itemStr[`${key}`]) {
    return null;
  }

  const item = JSON.parse(itemStr[`${key}`]);
  const now = new Date();

  // compare the expiry time of the item with the current time
  const shouldDelete = now.getTime() > item.expiry;
  if (shouldDelete) {
    // If the item is expired, delete the item from storage
    // and return null
    await chrome.storage.local.remove([`${key}`]);
    return null;
  }
  return item.value;
}
