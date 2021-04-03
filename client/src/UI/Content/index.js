import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import './index.css';

import NavBar from '../../UI/NavBar';
import Menu from '../../UI/Menu';
import Header from '../../UI/Header';

function Content(props) {
    const [t, i18n] = useTranslation();

    return (
        <div className="content">
            <NavBar/>
            <Menu/>
            <div className="data">
                {props.title && <Header>{props.title}</Header>}
                {props.children}
            </div>
        </div>
    );
}

export default Content;


