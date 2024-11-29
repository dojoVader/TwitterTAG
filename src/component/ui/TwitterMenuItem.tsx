import React from 'react';
import {useTwitterLDStore} from "../../zustand/store.twitter";

export const TwitterMenuItem = () => {



    const openPanel = () => {
        chrome.runtime.sendMessage({
            type: 'openPanel'
        }).then();
    }
    return (
        <div className={'twitter-menu-item'} onClick={ (e) => openPanel()}>
            <div role="menuitem"
                 className="css-175oi2r r-1loqt21 r-18u37iz r-1mmae3n r-3pj75a r-13qz1uu r-o7ynqc r-6416eg r-1ny4l3l">
                <div className="css-175oi2r r-1777fci r-faml9v">
                    <svg viewBox="0 0 24 24" aria-hidden="true"
                         className="r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-vlxjld r-1q142lx">
                        <g>
                            <path
                                d="M3.707 21.707l18-18-1.414-1.414-2.088 2.088C17.688 4.137 17.11 4 16.5 4H11v2h5.5c.028 0 .056 0 .084.002l-10.88 10.88c-.131-.266-.204-.565-.204-.882V7.551l2.068 1.93 1.365-1.462L4.5 3.882.068 8.019l1.365 1.462 2.068-1.93V16c0 .871.278 1.677.751 2.334l-1.959 1.959 1.414 1.414zM18.5 9h2v7.449l2.068-1.93 1.365 1.462-4.433 4.137-4.432-4.137 1.365-1.462 2.067 1.93V9zm-8.964 9l-2 2H13v-2H9.536z"></path>
                        </g>
                    </svg>
                </div>
                <div className="css-175oi2r r-16y2uox r-1wbh5a2">
                    <div dir="ltr"
                         className="css-146c3p1 r-bcqeeo r-1ttztb7 r-qvutc0 r-37j5jr r-a023e6 r-rjixqe r-b88u0q"
                         ><span style={{color:'white'}}
                        className="css-1jxf684 r-bcqeeo r-1ttztb7 r-qvutc0 r-poiln3" >Open TwitTag Panel</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
