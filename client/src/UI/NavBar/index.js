import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import './index.css';

import { Dropdown } from 'semantic-ui-react'

import logo from '../../img/logo.svg';
import UKFlag from '../../img/UKFlag.svg';
import RUFlag from '../../img/RUFlag.svg';


function NavBar(props) {
    const [t, i18n] = useTranslation();

    const langs = [
        {
            key: 'en',
            value: 'en',
            image: { avatar: true, src: UKFlag },
        },
        {
            key: 'ru',
            value: 'ru',
            image: { avatar: true, src: RUFlag },
        },
    ]

    const handleChangeLanguage = (event, data) => {
        i18n.changeLanguage(data.value);
    }

    return (
        <div className="navBar">
            <img className="logo" src={logo} alt="logo" onClick={()=>{props.history.push("/")}}/>
            <div className="title" onClick={()=>{props.history.push("/")}}>
                <span>
                    <span className="bold">MobiCash</span>
                    &nbsp;
                    <span className="light">Zen</span>
                </span>
            </div>
            <Dropdown 
                onChange={handleChangeLanguage}
                className="langDropdown"
                inline
                options={langs}
                defaultValue={langs[0].value}
            />
        </div>
    );
}

export default NavBar;


