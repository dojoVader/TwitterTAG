import {
    checkElement,
    dom,
    q, TWITTER_COLLECTION_PROFILE, TWITTER_DROPDOWN_NODE,
    TWITTER_LD_JSON, TWITTER_PRIMARY_COLUMN, TWITTER_ROOT_NODE,
    TWITTER_SELECTOR,
    TWITTER_USER_ACTION, TWITTER_USER_NAME_NODE, TwitterTagData,
} from "../utils/helpers";
import {createRoot} from "react-dom/client";
import {TwitterEditComponent} from "./ui/TwitterEditComponent";
import React from "react";
import {TwitterLDJSON} from "../interface/TwitterLDJSON";
import {TwitterBadge, TwitterBadgePill} from "./ui/TwitterBadge";
import {debounce} from "@mui/material";
import {useTwitterLDStore} from "../zustand/store.twitter";
import {TwitterMenuItem} from "./ui/TwitterMenuItem";
import {useTags} from "../zustand/store.tags";

export class TwitterHandle {
    private mutationObserver = null;
    constructor() {
        const debounced_function = debounce(async() => {
            await this.handle();
        },300,)
        const observer = new MutationObserver(debounced_function);
        observer.observe(q(TWITTER_ROOT_NODE) as HTMLElement,{
            subtree: true,
            childList: true,


        })
    }

    async populateMenu(){
        const twitterMenuDom = await checkElement(TWITTER_DROPDOWN_NODE);
        // This means the menu is opened at this point
        if(twitterMenuDom){
            const twitterMenuExists = q(".twitter-menu-item",false);
            if(!twitterMenuExists){
                const emptyDom = dom('div',{});
                const root = createRoot(emptyDom);
                root.render(<TwitterMenuItem/>);
                // Append the dom to the menu
                twitterMenuDom.after(emptyDom)
            }
            return;
        }
    }

    async handle() {
        const findElement = await checkElement(TWITTER_SELECTOR, 20);
        console.log('broke through...');
        // Execute this code when a Twitter profile has been detected
        if (findElement) {
            const userAction = await checkElement(TWITTER_USER_ACTION);
            userAction.onclick = (e: MouseEvent) => {
                this.populateMenu().then();

            }
            // Find the username in the Twitter LD JSON
            const jsonLDList = q(TWITTER_LD_JSON, true) as NodeListOf<HTMLScriptElement>;
            const jsonLD = jsonLDList.item(jsonLDList.length - 1);
            // Find the latest script injected with the Twitter information
            const jsonData : TwitterLDJSON = JSON.parse(jsonLD.innerText);
            chrome.storage.local.set({currentUser: jsonData}).then();

            useTwitterLDStore.getState().actions.setData(jsonData);

            const domExists = q(".icon-edit");
            if(domExists) return;
            if (userAction) {
                const copyClass = userAction.className;
                // Use React to generate the component
                const placedIconDom = dom("button", {
                    class: `${copyClass} icon-edit`,
                    role: "button",
                });
                userAction.before(placedIconDom);
                const root = createRoot(placedIconDom);
                root.render(<TwitterEditComponent />);
            }
            // Append the Twitter Badge to the profile
            const userNameNode = await checkElement(TWITTER_SELECTOR);

            userNameNode.style.flexDirection = 'column';
            if(userNameNode){
                const newNode = dom('span',{'class': 'username-node'});
                const userNodeRoot = createRoot(newNode);
                userNameNode.appendChild(newNode);
                userNodeRoot.render(<TwitterBadge />);
            }
        } else {
            // We could be in a Timeline then
            const hasTimeLine = await checkElement(TWITTER_PRIMARY_COLUMN);
            if(hasTimeLine){
                // check for the all the tweets
                const tweets = q(TWITTER_COLLECTION_PROFILE,true,q(TWITTER_PRIMARY_COLUMN) as HTMLElement) as NodeListOf<HTMLElement>;
                // Fetch all the users
                const users = useTags.getState().data;
                tweets.forEach(tweet => this.renderLabel(tweet,users));
            }
        }


    }


    renderLabel(tweet: HTMLElement, users: TwitterTagData[]) {
        // Find the element from the parent element
        const userName = q(TWITTER_USER_NAME_NODE,false,tweet) as HTMLElement;
        if(userName){
            const existingFound = q('.pill-label',false,userName);
            if(existingFound) return;
            const roleElement = q("a[role='link']",false,userName) as
                HTMLAnchorElement;
            const _twitterName = roleElement.href.replace('https://x.com/','');
            const [foundName] = users.filter(user => user.profile === _twitterName);
            const pillDom = dom('div',{'class': 'pill-label'});
            const root = createRoot(pillDom);
            root.render(<TwitterBadgePill color={foundName?.color} label={foundName? foundName?.label : ''}/>);
            userName.appendChild(pillDom);
        }


    }
}
