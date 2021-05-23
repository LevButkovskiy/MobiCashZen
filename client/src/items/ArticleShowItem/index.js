import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import { useHistory } from 'react-router-dom';
import { dateFormatter } from '../../Utils/Formatter';
import { getLocale } from '../../Utils/Hoocks';
import './index.css';


function ArticleShowItem(props) {
    const [t, i18n] = useTranslation();
    const history = useHistory();

    const [isLiked, setIsLiked] = useState(sessionStorage.getItem('isLiked') == "true" ? true : false)

    const renderTags = (item, key) => {
        return <li key={key} className="tagShow"><a className="tagShowLink" href={"/?tag=" + item.title}>{item.title}</a></li>
    }

    const addToSaved = () =>{ 
        setIsLiked(!isLiked)
        sessionStorage.setItem('isLiked', !isLiked)
    }

    return (
        <div className="articleShowContent">
            <div className="articleDate">{dateFormatter(props.article.publishDate)}</div>
            <div className="articleShowHeader">
                {props.article.imagePath && <img className="articleShowImage" src={'/api/v1/' + props.article.imagePath}/>}
                <div className="title">{getLocale(props.article.title, props.currentLanguage)}</div>
                <div className="description">{getLocale(props.article.description, props.currentLanguage)}</div>
                <div className="authorInfo">
                    <div className="author">{getLocale(props.article.author, props.currentLanguage)}</div>
                    <img className="authorImage" src="https://img02.rl0.ru/d0dd051ed46ec21dcaf128f1a4c941b3/765x-i/news.rambler.ru/img/2019/07/01125941.865243.9375.jpg"/>
                </div>
            </div>
            <div className="articleShowData" dangerouslySetInnerHTML={{__html: getLocale(props.article.rteData, props.currentLanguage)}}></div>
            <div className="tagsShow">
                <span className="tagsShowTitle">{t("TAGS.1")}</span>
                <ul className="tagsShowMenu">
                    {props.article.tags.map(renderTags)}
                </ul>

                <div className="isLiked" onClick={addToSaved}><span>{t("ADD_TO_SAVED.1")}</span><img src={!isLiked ? "/images/bookmark.png" : "/images/bookmark_red.png"}/></div>
            </div>
        </div>
    );
}

export default ArticleShowItem;


