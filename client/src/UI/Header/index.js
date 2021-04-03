import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import './index.css';

function Header(props) {
    const [t, i18n] = useTranslation();

    return (
        <div className="header">
            <div className="title">{props.children}</div>
        </div>
    );
}

export default Header;


