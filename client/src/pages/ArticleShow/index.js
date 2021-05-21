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
        return <li className="tagPreview"><a className="tagPreviewLink" href={"/?tag=" + item.title}>{item.title}</a></li>
    }

    return (
        <div className="articlePreview">
                {article != null &&
                    <Content nomenu selectorContent={<LangSelector currentLanguage={currentLanguage} setCurrentLanguage={setCurrentLanguage} separately/>}>
                        <div className="articlePreviewContent">
                            <div className="title">{getLocale(article.title, currentLanguage)}</div>
                            <div className="description">{getLocale(article.description, currentLanguage)}</div>
                            <div className="authorInfo">
                                <div className="author">{getLocale(article.author, currentLanguage)}</div>
                                <img className="authorImage" src="https://img02.rl0.ru/d0dd051ed46ec21dcaf128f1a4c941b3/765x-i/news.rambler.ru/img/2019/07/01125941.865243.9375.jpg"/>
                            </div>
                            <div className="articlePreviewData" dangerouslySetInnerHTML={{__html: getLocale(article.rteData, currentLanguage)}}></div>
                            <div className="tagsPreview">
                                <span className="tagsPreviewTitle">{t("TAGS.1")}</span>
                                <ul className="tagsPreviewMenu">
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
