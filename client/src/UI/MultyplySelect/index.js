import React from 'react';
import { useTranslation } from "react-i18next";
import { getLocale } from '../../Utils/Hoocks';
import './index.css';

import Select from '../Select';

function MultyplySelect(props, { component: Component, ...children}) {
    const [, i18n] = useTranslation();

    const removeSpeaker = (id) => {
        let list = props.list
        props.setList(list => list.filter((item, i) => item._id !== id));
    }   

    const renderList = (item, key) => {
        return <li key={key} className="multyplyListItem">{getLocale(item.title, i18n.language)}<img className="removeListItemIcon" src="/images/remove.png" alt="removeImg" onClick={()=>{removeSpeaker(item._id)}}/></li>
    }

    const onAddItem = (e) => {
        let addId = e.target.value;

        if (Number(addId) === 0) {
            let tmp = [props.fullList[0]];
            props.setList(tmp);
            return ;
        } 

        if (Number(addId) === -1) {
            let tmp = [props.fullList[props.fullList.length - 1]];
            props.setList(tmp);
            return ;
        } 

        let addEl = props.fullList.find(e => {return Number(e._id) === Number(addId)})
        let copy = props.list ? [...props.list] : [];
        let filteredContainsArr = copy.filter(e => Number(e._id) !== Number(addId))
        filteredContainsArr.push(addEl);

        if (props.list && props.list.some(e => Number(e._id) === -1 && Number(addId) !== -1)) {
            let filteredArr = filteredContainsArr.filter(e => Number(e._id) !== -1)
            props.setList(filteredArr);
        }
        else if (props.list && props.list.some(e => Number(e._id) === 0 && Number(addId) !== 0)) {
            let filteredArr = filteredContainsArr.filter(e => Number(e._id) !== 0)
            props.setList(filteredArr);
        }
        else {
            props.setList(filteredContainsArr);
        }
    }

    return (
        <div className="multyplySelectItem">
            <div className="multyplySelectTitle">{props.title}</div>
            {props.description && <div className="multyplySelectDescription">{props.description}</div>}
            {props.list && props.list.length > 0 && <div className="multyplyItem" style={{width: props.width}}><ul className="multyplyList">{props.list.map(renderList)}</ul></div>}
            <div className="multyplySelectContainer">
                <Select value={(props.list && props.list.length > 0 && props.list[props.list.length - 1]._id) || 0} onChange={onAddItem} width={props.width} disabled={props.disabled}>{props.children}</Select>
            </div>
        </div>
    );
}

export default MultyplySelect;
