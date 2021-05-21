import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import './index.css';

function Header(props) {
    const [t, i18n] = useTranslation();

    return (
        <div className="header" type={props.nomenu ? "nomenu" : null}>
            {props.subtitle && <div className="subtitle">{props.subtitle}</div>}
            {props.title && <div className="title" style={{paddingTop: props.subtitle ? "8px" : "40px"}}>{props.children}</div>}
            {props.selectorContent &&
                <div className="statusSelector">
                    <div>
                      {props.selectorContent}
                    </div>
                </div>
            }
        </div>
    );
}

export default Header;


