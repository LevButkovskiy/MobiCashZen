import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import './index.css';

function Button(props) {
    const [t, i18n] = useTranslation();
    
    const buttonType = () => {
        if(props.cancel) {
            return "cancel"
        }
        else {
            return "other"
        }
    }

    return (
        <div className="button">
            <button
                onClick={props.onClick}
                type={buttonType()}
            >
                {props.children}
            </button>
        </div>
    );
}

export default Button;


