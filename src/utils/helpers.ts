import { localStorageGet } from "./chrome-utils";
import { configuration } from "../constant/config";

const noop = () => null;

export function dom(dom: string, attrib: any, cb?: Function) {
  let domNode = document.createElement(dom);
  let key = "";
  for (key in attrib) {
    domNode.setAttribute(key, attrib[key]);
  }
  //Create a callback to allow us embed inner dom in it
  if (cb) {
    return cb(domNode);
  }
  return domNode;
}

export function q(
  selector: string,
  multiElements: boolean = false,
  source: HTMLElement = null,
): HTMLElement | NodeListOf<HTMLElement> {
  if (multiElements) {
    return (source || document).querySelectorAll(selector);
  }
  return (source || document).querySelector(selector) as HTMLElement;
}

// write a debounce function
export function debounce(
  func: { apply: (arg0: any, arg1: any[]) => void },
  timeout = 300,
) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

export function generateName(length: number) {
  const alphabet =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let letter = "";
  let counter = 0;
  const characterLength = alphabet.length;
  while (counter <= length) {
    letter += alphabet
      .charAt(Math.floor(Math.random() * characterLength))
      .toString();
    counter++;
  }

  return letter;
}

export function isTwitterProfilePage(): boolean {
  return q(TWITTER_SELECTOR) !== null;
}

export type TwitterTagData = { color: string; profile: string; label: string };

export async function saveTag(data: TwitterTagData) {
  const tags = await chrome.storage.local.get(
    configuration.STORAGE.SCHEMA_TAGS,
  );
  const items: TwitterTagData[] = tags[configuration.STORAGE.SCHEMA_TAGS];
  if (items) {
    // CHeck thet the tags doesn't exists
    const found = items.filter((item) => item.profile.includes(data.profile));
    if (!found.length) {
      items.push({ ...data });
      // Persist the new data back
      return await chrome.storage.local.set({
        [configuration.STORAGE.SCHEMA_TAGS]: items,
      });
    } else {
      const _found = found[0];
      _found.color = data.color;
      _found.label = data.label;
      return await chrome.storage.local.set({
        [configuration.STORAGE.SCHEMA_TAGS]: items,
      });
    }
  }
  return await chrome.storage.local.set({
    [configuration.STORAGE.SCHEMA_TAGS]: [{ ...data }],
  });
}

export async function loadTags() {
  const tags = await chrome.storage.local.get(
    configuration.STORAGE.SCHEMA_TAGS,
  );
  return tags[configuration.STORAGE.SCHEMA_TAGS];
}

export function rafAsync() {
  return new Promise((resolve) => {
    requestAnimationFrame(resolve); //faster than set time out
  });
}

export async function checkElement(
  selector: string,
  retries: number = 50,
  source?: HTMLElement,
) {
  let querySelector = null;
  let limit = 0;
  while (querySelector === null) {
    limit++;
    if (limit === retries) {
      noop();
      break;
    }
    await rafAsync();
    querySelector = !source
      ? document.querySelector(selector)
      : source.querySelector(selector);
  }
  return querySelector;
}

export const TWITTER_SELECTOR = "div[data-testid='UserName']";
export const TWITTER_PRIMARY_COLUMN = "div[data-testid='primaryColumn']";
export const TWITTER_COLLECTION_PROFILE = "div[data-testid='cellInnerDiv']";
export const MAIN_TIMELINE_READ = "[aria-label='Timeline: Your Home Timeline']";
export const SEARCH_TIMELINE_READ = "[aria-label='Timeline: Search timeline']";
export const TWITTER_USER_NAME_NODE = 'div[data-testid="User-Name"]';
export const TWITTER_USERNAME_LINK_SPAN_NODE = "a[role='link'] > div > span";
export const TWITTER_USER_ACTION = 'button[data-testid="userActions"]';
export const TWITTER_LD_JSON = 'script[data-testid="UserProfileSchema-test"]';
export const TWITTER_ROOT_NODE = "div#react-root";
export const TWITTER_DROPDOWN_NODE = 'div[data-testid="Dropdown"]';
