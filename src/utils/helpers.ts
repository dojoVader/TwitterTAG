import {configuration} from "../constant/config";


export function dom(dom: string, attrib: any, cb?: Function) {
    let domNode = document.createElement(dom);
    let key = "";
    for (key in attrib) {
        domNode.setAttribute(key, attrib[key])
    }
    //Create a callback to allow us embed inner dom in it
    if (cb) {
        return cb(domNode)
    }
    return domNode;
}

export function q(selector: string, multiElements: boolean = false, source: HTMLElement = null): any {
    if (multiElements) {
        return (source || document).querySelectorAll(selector);
    }
    return (source || document).querySelector(selector)
}

// write a debounce function
export function debounce(func, timeout = 300){

    console.log("debounce...")
    let timer;
    return (...args) => {
        console.log("clear...")
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
}









