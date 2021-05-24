import React from 'react';
import './index.css';

function Header(props) {
    return (
        <div className="header" type={props.nomenu ? "nomenu" : null}>
            {props.subtitle && <div className="subtitle">{props.subtitle}</div>}
            <div className="title" style={{paddingTop: props.subtitle ? "8px" : "40px"}}>{props.children}</div>
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


