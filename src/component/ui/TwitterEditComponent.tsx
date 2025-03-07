import React, {useState} from 'react';
import {TwitterProfileLabel} from "./TwitterProfileLabel";
import {CardMedia} from "@mui/material";
import {useTags} from "../../zustand/store.tags";
import {useTwitterLDStore} from "../../zustand/store.twitter";



export const TwitterEditComponent = () => {
    const data = useTwitterLDStore(state => state.data);
    const [showCard, setShowCard] = useState<boolean>(false);
    // Fetch the existing data
    const store = useTags(state => state);
    const [foundDetails] = store.data.filter(record => record.profile === data.mainEntity.additionalName);
    const [label] = useState<string>(foundDetails ? foundDetails.label : '')
    const [color] = useState<string>(foundDetails ? foundDetails.color : '');


    return (
        <>
            <TwitterProfileLabel profile={data.mainEntity.additionalName} label={label} close={() => setShowCard(false)} enabled={showCard}
                                 color={color} name={data?.mainEntity?.givenName}
                                 iconImage={(
                                     <CardMedia sx={{
                                         width:100,
                                         height:100,
                                         borderRadius: '52px'
                                     }} image={data.mainEntity.image.contentUrl} />
                                 )}/>
            <div className={'icon-div'} onClick={() => setShowCard(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 24 24" >
                    <path d="M12 20H20.5M18 10L21 7L17 3L14 6M18 10L8 20H4V16L14 6M18 10L14 6" stroke="currentColor"
                          strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>

            </div>
        </>
    )
}
