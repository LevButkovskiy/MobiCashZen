import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import { useHistory } from 'react-router-dom';
import './index.css';

function ArticleItem(props) {
    const [t, i18n] = useTranslation();
    const history = useHistory()

    const renderTags = (item, key) => {
        return <li key={key} className="tag">{item.title}</li>
    }

    return (
        <div className="tags">
            <ul className="tagsMenu" type={props.size}>
                {props.tags && props.tags.map(renderTags)}
            </ul>
        </div>
    )
}

export default ArticleItem;


