import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import { useFormInput } from '../../Utils/Hoocks';
import './index.css';

import Content from '../../UI/Content';
import Input from '../../UI/Input';
import Button from '../../UI/Button';

import qrImage from '../../img/qr.png';

function Login(props) {
    const [t, i18n] = useTranslation();

    const username = useFormInput('');
    const password = useFormInput('');

    const handleLogin = () => {
        console.log(username.value, ":", password.value);
    }

    return (
        <Content>
            <div className="login">
                <div className="inputForm">
                    <div className="loginByUser">
                        <span id="title">{t("SIGN_IN.1")}</span>
                        <Input
                            first
                            type="text"
                            placeholder={t("USERNAME.1")}
                            value={username}
                        >{t("LOGIN.1")}</Input>
                        <Input
                            type="password"
                            placeholder="********"
                            value={password}
                        >{t("PASSWORD.1")}</Input>
                        <Button
                            onClick={handleLogin}
                        >{t("LOG_IN.1")}</Button>
                    </div>
                    <div className="loginByQR">
                        <div className="title">{t("MOBIPASS_LOGIN.1")}</div>
                        <img className="qr" src={qrImage} alt="qr code"/>
                        <div className="description">{t("SCAN_FOR_LOGIN.1")}<br/>{t("QR_USING_MOBICASH.1")}.</div>
                    </div>
                </div>
            </div>
        </Content>
    );
}

export default Login;


