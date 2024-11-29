import {ReactJSXElement} from "@emotion/react/types/jsx-namespace";
import {Box, Dialog, DialogContent, TextField, Typography} from "@mui/material";
import {ColorResult, TwitterPicker} from 'react-color';
import React,{useState, useEffect} from "react";
import {saveTag} from "../../utils/helpers";
import {useTags} from "../../zustand/store.tags";

interface TwitterProfileProps {
    color: string;
    name: string;
    label?: string;
    profile: string;
    iconImage: ReactJSXElement;
    enabled: boolean;
    close: (e: any) => void
}

export const TwitterProfileLabel = (props: TwitterProfileProps) => {
    const {enabled, profile, iconImage, name, color: colorValue, close, label: defaultLabel} = props;
    const [color,setColor] = useState<string>(colorValue);
    const [label, setLabel] = useState(defaultLabel);
    const store = useTags(state => state);


    const handleChange = (colorData: ColorResult, event: React.ChangeEvent) => {
        setColor(colorData.hex)
    }

    useEffect(() => {
        if(color !== '' && label !== ''){
            // Do operation here
            store.addTag({
                profile,
                label,
                color
            })
        }
    },[color,label])

    return (
        <Dialog
            onClose={e => close(e)}
            open={enabled}
            maxWidth={'md'}
            sx={{
                overflow: 'none',

            }}
        >

            <DialogContent sx={{padding: '4%', backgroundColor: color}}>
                <Box display={'flex'} flexDirection={'column'} className={'twitter-profile-card'}>
                    <Box display={'flex'} flexDirection={'row'} columnGap={2}>
                        <Box display={'flex'} flexDirection={'row'}>
                            {iconImage}

                        </Box>
                        <Box display={'flex'} flexDirection={'column'}>
                            <Typography variant={'h5'}>{name}</Typography>
                            <TextField onChange={e => setLabel(e.target.value)} value={label} placeholder={'Enter a label for this user'} id="standard-basic" label="Standard" variant="standard" />
                        </Box>


                    </Box>
                    <Box display={'flex'} flexDirection={'row'} sx={{padding: '2%'}}>
                        <TwitterPicker color={color} onChange={ handleChange } width={'100%'}   />
                    </Box>

                </Box>
            </DialogContent>
        </Dialog>
    )
}
