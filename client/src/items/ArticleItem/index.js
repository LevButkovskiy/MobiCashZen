import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import { useHistory } from 'react-router-dom';
import { deleteArticle } from '../../Utils/ArticlesUtil';
import './index.css';

import Tags from '../../items/Tags';
import { isSuperAdmin } from '../../Utils/UserUtil';

function ArticleItem(props) {
    const [t, i18n] = useTranslation();
    const history = useHistory()

    const menuClick = () => {
        deleteArticle(props.id, function(success, data) {
            if (data.error == null) {
                window.location.reload();
            }
            else {
                console.log(data.error.message);
            }
        })
    }

    return (
        <div className="articleItem" id={props.id}>
            <div className="content">
                <div className="articleImage">
                    <img className="image" src={props.imageSrc} />
                </div>
                <div className="menu">
                    <img className="menuIcon" src="/images/menu.png" onClick={()=>{menuClick()}}/>
                </div>
                <div className="articleInfo" onClick={()=>{history.push(isSuperAdmin() ? "/article/" + props.id : "/article/" + props.id + "/show")}}>
                    <Tags tags={props.tags}/>
                    <span className="title">{props.children}</span>
                    <span className="description">{props.description}</span>
                    <span className="dateTime">{props.author} ● {props.dateTime}</span>
                </div>
            </div>
        </div>
    );
}

export default ArticleItem;


