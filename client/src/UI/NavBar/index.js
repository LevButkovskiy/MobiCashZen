import React, { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import {NavDropdown} from 'react-bootstrap';
import './index.css';

import { getLogin, getRole, getUsersGroups, removeUserSession, getGroupId } from '../../Utils/UserUtil';

import { Dropdown } from 'semantic-ui-react'

import logo from '../../img/logo.svg';
import UKFlag from '../../img/UKFlag.svg';
import RUFlag from '../../img/RUFlag.svg';
import { getLocale } from '../../Utils/Hoocks';

function NavBar(props) {
    const [t, i18n] = useTranslation();

    const [allGroups, setAllGroups] = useState(null);

    useEffect(() => {
        getUsersGroups(function(success, data) {
            setAllGroups(data);
        })
    }, []);

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

    const handleChangeLanguage = (lang) => {
        i18n.changeLanguage(lang);
    }

    const handleLogout = () => {
        removeUserSession();
    }

    const createRole = () => {
        let id = getGroupId();
        return allGroups[id];
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
            <div className="profileDropdown">
            {getLogin() && allGroups &&
                <NavDropdown style={{color: "#fff"}} alignRight
                    title={
                        <>
                        <div className="username">{getRole() + " " + getLogin()}</div>
                        <span className="role">{getLocale(createRole().title, i18n.language)}</span>
                        </>
                    }>
                    <NavDropdown.Item as="button" onClick={() => {
                        handleLogout()
                    }}>{t('LOGOUT.1')}</NavDropdown.Item>
                </NavDropdown>}
            </div>
            <div className="langDropdown">
                <NavDropdown alignRight
                    title={
                        <img
                            src={t('LANGUAGE_ICON.1')}
                            alt="language"
                            style={{height: '24px', width: '24px'}}
                        />
                    }
                >
                    <NavDropdown.Item as="button" onClick={() => handleChangeLanguage('en')}>
                        <img alt="" src="https://cdn1.iconfinder.com/data/icons/world-flags-circular/1000/Flag_of_United_Kingdom_-_Circle-512.png"
                            width="24"
                            height="24"
                            className="d-inline-block align-top"
                        />
                        {' '}English
                    </NavDropdown.Item>
                    <NavDropdown.Item as="button" onClick={() => handleChangeLanguage('ru')}>
                        <img
                            alt=""
                            src="https://cdn1.iconfinder.com/data/icons/rounded-flat-country-flag-collection-1/2000/ru-01.png"
                            width="24"
                            height="24"
                            className="d-inline-block align-top"/>{' '}Русский
                    </NavDropdown.Item>
                </NavDropdown>
            </div>
        </div>
    );
}

export default NavBar;


