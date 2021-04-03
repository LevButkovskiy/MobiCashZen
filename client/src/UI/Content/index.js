import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import './index.css';

import NavBar from '../../UI/NavBar';

function Content(props) {
    const [t, i18n] = useTranslation();

    return (
        <div className="content">
            <NavBar/>
            <div className="data">
                {props.children}
            </div>
        </div>
    );
}

export default Content;


