import React, { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { getArticles } from '../../Utils/ArticlesUtil';
import { getLocale, useFormInput } from '../../Utils/Hoocks';
import { getGroupId, getShowedArticles, isSuperAdmin } from '../../Utils/UserUtil';
import { stringByNum } from '../../Utils/Formatter';
import './index.css';

import Content from '../../UI/Content';
import Button from '../../UI/Button';
import Input from '../../UI/Input';

import ArticleItem from '../../items/ArticleItem';

function Articles(props) {
    const [t, i18n] = useTranslation();

    const [articles, setArticles] = useState(null);
    const [title, setTitle] = useState("SAVED_ARTICLES.1")

    const search = useFormInput('');

    useEffect(() => {
        getArticlesHandler();
    }, []);

    useEffect(() => {
        getArticlesHandler();
    }, [window.location.href]);

    const getArticlesHandler = (search = null) => {
        let url = window.location.pathname.split('/');       
        let searchParams = {};

        if (!isSuperAdmin()) {
            searchParams.allowedGroup = getGroupId();
        }

        if (search) {
            searchParams.search = search;
        }

        getShowedArticles(function(success, data) {
            if (data.error == null) {
                let articles = [];
                data.historyOfView.map(el=> {
                    if(el.isLiked) {
                        articles.push({
                            articleId: el.articleId._id,
                            imagePath: el.articleId.imagePath,
                            title: el.articleId.title,
                            description: el.articleId.description,
                            publishDate: el.articleId.publishDate,
                            author: el.articleId.author,
                            tags: el.articleId.tags,
                            percentage: el.percentage,
                        })
                    }
                })
                setArticles(articles);
            }
            else {
                console.log(data.error.message);
            }
        })
    }

    const renderArticles = (item, key) => {
        console.log(item);
        return (
            <ArticleItem
                key={key}
                id={item.articleId}
                imageSrc={item.imagePath ? ("/api/v1/" + item.imagePath) : "/images/defaultImage.png"}
                description={getLocale(item.description, i18n.language)}
                dateTime={item.publishDate}
                author={getLocale(item.author, i18n.language)}
                tags={item.tags}
                percentage={item.percentage}
            >{getLocale(item.title, i18n.language)}</ArticleItem>
        )
    }

    const onSearchChange = (e) => {
        search.setValue(e.target.value);
        getArticlesHandler(e.target.value);
    }

    return (
        <div className="articles">
            <Content title={t(title)}>
                <div className="settings">
                    <div className="new">
                        <Button onClick={()=>{props.history.push("/article/new")}} width>{t("ADD_ARTICLE.1")}</Button>
                    </div>
                    <div className="search">
                        <Input type="text" placeholder={t("SEARCH_PLACEHOLDER.1")} value={{value: search.value, onChange:onSearchChange}}>{t("SEARCH.1")}</Input>
                    </div>
                </div>
                <div className="articlesData">
                    {articles != null && 
                        <>
                            <span className="title">{t("FOUNDED.1")}: {articles.length} {t(stringByNum(articles.length, ["ARTICLE.1", "ARTICLES.1", "ARTICLES_EI.1"]))}</span>
                            <div className="content">
                                {articles.map(renderArticles)}
                            </div>
                        </>
                    }
                </div>
            </Content>
        </div>
    );
}

export default Articles;