import React from 'react';
import './style.scss';
import Backdrop from '../Backdrop/Backdrop';
// import MainButton from '../MainButton/MainButton';
// import { persianString } from './../../utils/persianStrings';
const Modal = (props) => (
    <>
        <Backdrop show={props.show} clicked={props.modalClosed} />
        <div className="Modal"
            style={{
                transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.show ? '1' : '0'
            }}>
            <div class="trapezoid">
                <p className="popUpTitle" >{props.popupTitle}</p>
            </div>
            <div className="mainBox">
                <div style={{ width: '100%', height: 'auto' , padding : '15px'}}>
                    {props.children}
                </div>
                {/* <div className="modalBtnHolder" >
                    <MainButton btnType="secondRedBtn" clicked = {props.modalSubmit} >{persianString.enter}</MainButton>
                    <MainButton btnType="grayBtn" clicked={props.modalClosed}>{persianString.cacell}</MainButton>
                </div> */}
            </div>
        </div>
    </>
);

export default Modal;
