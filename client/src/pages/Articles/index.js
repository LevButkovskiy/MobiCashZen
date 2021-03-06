import React, { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { getArticles } from '../../Utils/ArticlesUtil';
import { getLocale, useFormInput } from '../../Utils/Hoocks';
import { getGroupId, getRole, isSuperAdmin } from '../../Utils/UserUtil';
import { stringByNum } from '../../Utils/Formatter';
import './index.css';

import Content from '../../UI/Content';
import Button from '../../UI/Button';
import Input from '../../UI/Input';

import ArticleItem from '../../items/ArticleItem';

function Articles(props) {
    const [t, i18n] = useTranslation();

    const [articles, setArticles] = useState(null);
    const [tag, setTag] = useState(null);
    const [title, setTitle] = useState("ALL_ARTICLES.1")

    const search = useFormInput('');

    useEffect(() => {
        getArticlesHandler();
    }, [window.location.href]);

    const getArticlesHandler = (search = null) => {
        setTitle("ALL_ARTICLES.1")
        let url = window.location.pathname.split('/');       
        let filterTag = (new URLSearchParams(window.location.search)).get("tag");
        let searchParams = {};

        if (filterTag != null && filterTag !== "") {
            searchParams.tag = filterTag;
            setTag(filterTag)
        }
        else {
            setTag(null)
        }

        if (!isSuperAdmin()) {
            searchParams.allowedGroup = getGroupId();
        }

        if (search) {
            searchParams.search = search;
        }

        if ((url.length > 1 && url[1] === "personal") || !isSuperAdmin()) {
            searchParams.internal = "true";
            if (url[1] === "personal") {
                setTitle("FOR_ME.1");
                setTag(null);
            }
        }


        getArticles(searchParams, function(success, data) {
            if (data.error == null) {
                setArticles(data.docs);
            }
            else {
                console.log(data.error.message);
            }
        })
    }

    const renderArticles = (item, key) => {
        return (
            <ArticleItem
                key={key}
                exportKey={item.key}
                id={item._id}
                imageSrc={item.imagePath ? ("/api/v1/" + item.imagePath) : "/images/defaultImage.png"}
                description={getLocale(item.description, i18n.language)}
                dateTime={item.publishDate}
                author={getLocale(item.author, i18n.language)}
                tags={item.tags}
            >{getLocale(item.title, i18n.language)}</ArticleItem>
        )
    }

    const onSearchChange = (e) => {
        search.setValue(e.target.value);
        getArticlesHandler(e.target.value);
    }

    return (
        <div className="articles">
            <Content title={t(title)} subtitle={tag ? ("?tag=" + tag) : null}>
                <div className="settings">
                    <div className="new" id={getRole() !== "Manager" && "hidden"}>
                        <Button onClick={()=>{props.history.push("/article/new")}} width>{t("ADD_ARTICLE.1")}</Button>
                    </div>
                    <div className="search" id={getRole() !== "Manager" && "noAdd"}>
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