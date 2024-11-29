import {Box, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useTags} from "../../zustand/store.tags";
import {useTwitterLDStore} from "../../zustand/store.twitter";



export const TwitterBadge = () => {
    const {author} = useTwitterLDStore(state => state.data);
    const {additionalName:profile} = author;
    const store = useTags(state => state);
    const {data} = store
    const [detail] = data.filter(record => record.profile === profile);

    const [color, setColor] = useState();
    const [label, setLabel] = useState();


    useEffect(() => {
        if(!detail) return;
        setColor(detail?.color);
        setLabel(detail?.label);
    }, [detail?.label, detail?.color]);

    return (

        <Box className={'twitter-badge'} display={'flex'} sx={{
            backgroundColor: color,
            padding: '1% 8%',
            width: 'max-content',
            marginTop: '10px',
            marginBottom: '15px',
            borderRadius: '26px',
            color: 'black',
            fontSize: '15px',
            fontWeight: 'bold'
        }}>
            {label}
        </Box>

    )
}

export const TwitterBadgePill = (props: {label: string, color: string}) => {
    const {label, color} = props;
    return (
        <Box sx={{
            background: color,
            marginLeft: '10px',
            padding: '1px 10px',
            borderRadius: '52px',
            marginBottom: '1%',
        }} className={'twitter-badge-ui'}>
            <Typography>{label}</Typography>
        </Box>
    )
}
