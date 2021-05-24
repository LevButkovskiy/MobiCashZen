import React, { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { getArticle } from '../../Utils/ArticlesUtil';
import { addViewHistory, getLogin } from '../../Utils/UserUtil';

import './index.css';

import Content from '../../UI/Content';

import ArticleShowItem from '../../items/ArticleShowItem';

function ArticleShow(props) {
    const [, i18n] = useTranslation();

    const [article, setArticle] = useState(null);

    useEffect(() => {
        var scroll = 0;
        var maxScroll = 0;

        const handleScroll = () => {
            var p = document.body.parentNode
            let percentage = (document.body.scrollTop || p.scrollTop) / (p.scrollHeight - p.clientHeight ) * 100;
            scroll = percentage;
            if(percentage > maxScroll) {
                if(percentage > 100) {
                    maxScroll = 100;
                }
            }
        }

        window.addEventListener("scroll", handleScroll, true);
        sessionStorage.setItem('isLiked', false)

        getArticleHandler(props.match.params.id);

        return () => {
            window.removeEventListener("scroll", handleScroll, true);
            let login = getLogin();
            let isLiked = sessionStorage.getItem('isLiked');
            sessionStorage.removeItem('isLiked');
            addViewHistory(login, props.match.params.id, scroll, maxScroll, isLiked, function(success, data) {
            })
        };
    }, [props.match.params.id]);

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

    return (
        <div className="articleShow">
                {article != null &&
                    <Content nomenu>
                        <ArticleShowItem article={article} currentLanguage={i18n.language}/>
                    </Content>
                }
        </div>
    );
}

export default ArticleShow;
