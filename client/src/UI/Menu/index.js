import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import './index.css';

function Menu(props) {
    const [t, i18n] = useTranslation();

    return (
        <div className="menu">
            Menu
        </div>
    );
}

export default Menu;


