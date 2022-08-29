import React from 'react';
import ReactLoading from 'react-loading';


const CustomLoadingMask = (props) => {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center',
            margin: '0px auto',
            position: 'absolute',
            left: '0',
            top: '0',
            width: '100%',
            height: '100%',
            background: 'rgba(255,255,255,0.5)',
            zIndex: '2'
        }}>
            <ReactLoading type={props.type} color={props.color} height={10} width={props.width}/>
        </div>
    )
}

export default CustomLoadingMask;


// blank
// balls
// bars
// bubbles
// cubes
// cylon
// spin
// spinningBubbles
// spokes