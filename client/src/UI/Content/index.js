import React from 'react';
import { useHistory } from 'react-router-dom';
import './index.css';

import NavBar from '../../UI/NavBar';
import Menu from '../../UI/Menu';
import Header from '../../UI/Header';

function Content(props) {
    const history = useHistory()

    return (
        <div className="content">
            <NavBar history={history}/>
            {!props.nomenu && <Menu/>}
            <div className="data" type={props.nomenu ? "nomenu" : null}>
                <Header nomenu={props.nomenu} subtitle={props.subtitle} selectorContent={props.selectorContent}>{props.title}</Header>
                <div className="info">
                    {props.children}
                </div>
            </div>
        </div>
    );
}

export default Content;


