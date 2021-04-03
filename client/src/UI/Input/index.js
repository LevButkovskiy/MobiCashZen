import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import './index.css';

function Input(props) {
    const [t, i18n] = useTranslation();

    return (
        <div className="input" id={props.first ? "first" : null}>
            <div className="title">
                {props.children}
            </div>
            <input
                type={props.type}
                {...props.value}
                placeholder={props.placeholder}
            />
        </div>
    );
}

export default Input;


