import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import './index.css';

function Button(props) {
    const [t, i18n] = useTranslation();

    return (
        <div className="button">
            <button
                onClick={props.onClick}
            >
                {props.children}
            </button>
        </div>
    );
}

export default Button;


