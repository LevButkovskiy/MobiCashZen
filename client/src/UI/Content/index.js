import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import { useHistory } from 'react-router-dom';
import './index.css';

import NavBar from '../../UI/NavBar';
import Menu from '../../UI/Menu';
import Header from '../../UI/Header';

function Content(props) {
    const [t, i18n] = useTranslation();
    const history = useHistory()

    return (
        <div className="content">
            <NavBar history={history}/>
            <Menu/>
            <div className="data">
                {props.title && <Header>{props.title}</Header>}
                <div className="info">
                    {props.children}
                </div>
            </div>
        </div>
    );
}

export default Content;


