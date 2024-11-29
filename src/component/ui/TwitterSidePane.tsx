import React, {useEffect, useState} from 'react';

import {Box, Button, CardMedia, TextField, Typography} from "@mui/material";
import {TwitterLDJSON} from "../../interface/TwitterLDJSON";
import "../sidepanel.css";

export interface TwitterSidePaneProps{
    profile: string;
}

export const TwitterSidePane = ()=> {
    const [details,setDetails] = useState<TwitterLDJSON>(null);
    const [subscribed, setSubscribed] = useState<boolean>(false);
    useEffect(() => {
        (async()=> {
            const data = await chrome.storage.local.get('currentUser');
            if(!data['currentUser']) return;
            if(data['currentUser']){
                setDetails(data.currentUser);
            }


        })()

    },[]);
    return (
        <>
            {!subscribed && (
                <Box
                    display={'flex'}
                    rowGap={'10'}
                    flexDirection={'column'}
                    sx={{
                    padding: '2%'
                }}>
                <h1>Do more with Premium</h1>
                <div>Subscribe today, and unlock the feature of posting to people's profile</div>
                <br/>
                    <Button variant={'contained'}>Pay with Stripe</Button>
                </Box>
            )}
            {subscribed && (
                <Box sx={{
                    padding: '2%'
                }} className={'twitter-sidepane-ui media-pane'}>
                    <Box
                        display={'flex'}
                        flexDirection={'column'}
                        columnGap={'2%'}
                        sx={{
                            width: '100%'
                        }}
                    >
                        <Typography variant={'h6'} style={{padding: '1%', textAlign: 'center'}}>{details?.author?.additionalName}</Typography>
                        <CardMedia
                            sx={{width: '100%'}}
                            className={'media-img'}
                            image={details?.author?.image?.contentUrl}
                        />


                    </Box>
                    <Box sx={{
                        marginTop: '2%',
                        width:'100%'
                    }}>
                        <TextField fullWidth={true} maxRows={9} />
                        <Button sx={{marginTop: '1%', width: '100%'}} variant={'contained'}>Write on wall</Button>
                    </Box>
                </Box>
            )}

        </>

    )
}
