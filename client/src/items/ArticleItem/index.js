import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import { deleteArticle } from '../../Utils/ArticlesUtil';
import './index.css';

function ArticleItem(props) {
    const [t, i18n] = useTranslation();

    const renderTags = (item, key) => {
        return <li key={key} className="tag">{item.title}</li>
    }

    const menuClick = () => {
        deleteArticle(props.id, function(success, data) {
            if (data.error == null) {
                console.log("article " + data._id + " deleted");
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
                <div className="articleInfo">
                    <div className="articleTags">
                        <ul className="tagsMenu">
                            {props.tags && props.tags.map(renderTags)}
                        </ul>
                    </div>
                    <span className="title">{props.children}</span>
                    <span className="description">{props.description}</span>
                    <span className="dateTime">{props.dateTime}</span>
                </div>
            </div>
        </div>
    );
}

export default ArticleItem;


