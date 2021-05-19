import React, { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { getArticle } from '../../Utils/ArticlesUtil';
import './index.css';

import Content from '../../UI/Content';

function ArticlePreview(props) {
    const [t, i18n] = useTranslation();

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
                    <Content>
                        <div className="articlePreviewContent">
                            <div className="title">{article.title.en}</div>
                            <div className="authorInfo">
                                <div className="author">{article.author.en}</div>
                                <img className="authorImage" src="https://img02.rl0.ru/d0dd051ed46ec21dcaf128f1a4c941b3/765x-i/news.rambler.ru/img/2019/07/01125941.865243.9375.jpg"/>
                            </div>
                            <div className="articlePreviewData" dangerouslySetInnerHTML={{__html: article.rteData.en}}></div>
                            <div className="tagsPreview">
                                <span className="tagsPreviewTitle">ТЕГИ</span>
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

export default ArticlePreview;
