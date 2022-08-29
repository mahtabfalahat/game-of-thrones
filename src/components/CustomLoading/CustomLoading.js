import React from 'react';
import ReactLoading from 'react-loading';


const CustomLoading = (props) => {
    return (
        <div style = {{display : 'flex' , justifyContent : 'center' , alignItems : 'center' , alignContent : 'center' , margin : '0px auto'}} >
            <ReactLoading type={props.type} color={props.color} height={10} width={props.width} />
        </div>
    )
}

export default CustomLoading; 



// blank
// balls
// bars
// bubbles
// cubes
// cylon
// spin
// spinningBubbles
// spokes