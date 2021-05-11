import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import './index.css';

function Header(props) {
    const [t, i18n] = useTranslation();

    return (
        <div className="header">
            {props.subtitle && <div className="subtitle">{props.subtitle}</div>}
            <div className="title" style={{paddingTop: props.subtitle ? "8px" : "40px"}}>{props.children}</div>
        </div>
    );
}

export default Header;


