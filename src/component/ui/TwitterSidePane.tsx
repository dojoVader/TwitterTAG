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
    const [authenticated, setAuthenticated] = useState<boolean>(false);
    const [register,setRegister] = useState<boolean>(false);
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
                    fontSize: '1.3em',
                    padding: '2%'
                }}>
                    {!authenticated && (
                        <>
                            <h1>XTag Premium+</h1>
                            <h3>Enjoy the premium features of TwitterTAG, with our premium version, you can sync your tagging to the cloud and also send notes to X profiles</h3>

                            <br/>
                            <p>Register & Subscribe with 4$ monthly</p>
                            {register && (
                                <Box display={'flex'} flexDirection={'column'} rowGap={2} sx={{padding: '2%'}}>
                                    <TextField id="outlined-basic" label="Username" variant="outlined" />
                                    <TextField type={'password'} id="outlined-basic" label="Password" variant="outlined" />

                                </Box>
                            )}
                            <Button sx={{padding: '2%'}} onClick={e => setRegister(true)} variant={'contained'}>Register</Button>

                        </>
                    )}

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
