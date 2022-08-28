import React from 'react' ; 
import './style.scss' ; 

const TextContainer= ({title , response}) => {
    return (
        <div className='detail-text-style-container'>
            <p className='detail-text-style text-title'>{title} : </p>
            <p className='detail-text-style'>{response !== "" ? response : "-" }</p>
        </div>
    )
}

export default TextContainer ; 