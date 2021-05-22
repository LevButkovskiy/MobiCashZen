import React, { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { getArticle } from '../../Utils/ArticlesUtil';
import './index.css';

import Content from '../../UI/Content';
import LangSelector from '../../items/LangSelector';
import { getLocale } from '../../Utils/Hoocks';

function ArticleShow(props) {
    const [t, i18n] = useTranslation();
    const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

    const [article, setArticle] = useState(null);

    useEffect(() => {
        getArticleHandler(props.match.params.id)
    }, []);

    const getArticleHandler = (id) => {
        getArticle(id, function(success, data) {
            if (success) {
                setArticle(data)
            }
            else {
                console.log(data.error.message);
            }
        })
    }

    const renderTags = (item, key) => {
        return <li className="tagShow"><a className="tagShowLink" href={"/?tag=" + item.title}>{item.title}</a></li>
    }

    return (
        <div className="articleShow">
                {article != null &&
                    <Content nomenu>
                        <div className="articleShowContent">
                            <div className="articleShowHeader">
                                {article.imagePath && <img className="articleShowImage" src={'/api/v1/' + article.imagePath}/>}
                                <div className="title">{getLocale(article.title, i18n.language)}</div>
                                <div className="description">{getLocale(article.description, i18n.language)}</div>
                                <div className="authorInfo">
                                    <div className="author">{getLocale(article.author, i18n.language)}</div>
                                    <img className="authorImage" src="https://img02.rl0.ru/d0dd051ed46ec21dcaf128f1a4c941b3/765x-i/news.rambler.ru/img/2019/07/01125941.865243.9375.jpg"/>
                                </div>
                            </div>
                            <div className="articleShowData" dangerouslySetInnerHTML={{__html: getLocale(article.rteData, i18n.language)}}></div>
                            <div className="tagsShow">
                                <span className="tagsShowTitle">{t("TAGS.1")}</span>
                                <ul className="tagsShowMenu">
                                    {article.tags.map(renderTags)}
                                </ul>
                            </div>
                        </div>
                    </Content>
                }
        </div>
    );
}

export default ArticleShow;
