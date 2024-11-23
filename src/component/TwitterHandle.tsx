import {checkElement, dom, TWITTER_SELECTOR, TWITTER_USER_ACTION} from "../utils/helpers";
import {createRoot} from "react-dom/client";
import { TwitterEditComponent } from "./ui/TwitterEditComponent";
import React from "react";

export class TwitterHandle {

    constructor() {

    }

    async handle(){
        const findElement = await checkElement(TWITTER_SELECTOR);
        if(findElement){
            const userAction = await checkElement(TWITTER_USER_ACTION);
            if(userAction){
                const copyClass = userAction.className;
                // Use React to generate the component
                const placedIconDom = dom("button",{
                    'class': `${copyClass} icon-edit`,
                    role: 'button'
                }

                );
                userAction.before(placedIconDom);
                const root = createRoot(placedIconDom);
                root.render(<TwitterEditComponent/>)

            }
        }
    }

    async placeIcon(){

    }
}
