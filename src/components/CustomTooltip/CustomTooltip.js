import * as React from 'react';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';



const BootstrapTooltip = styled(({ className, ...props }) => (
    <Tooltip placement="top" {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: '#FFFFFF',
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: '0px 2px 10px -2px rgba(0, 0, 0, 0.25)',
        fontSize: 13,
        borderRadius: '5px',
        fontFamily : 'irYekan !important'
        
    },
}));

export default function CustomTooltip(props) {
    return (
        <div>
            <BootstrapTooltip title={props.tooltipTitle}>
                {props.children}
            </BootstrapTooltip>
        </div>
    );
}

