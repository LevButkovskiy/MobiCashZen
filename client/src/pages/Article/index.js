import React, { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { getArticle } from '../../Utils/ArticlesUtil';
import { getLocale } from '../../Utils/Hoocks';
import { getUsersGroups, isSuperAdmin } from '../../Utils/UserUtil';
import { dateFormatter } from '../../Utils/Formatter';

import './index.css';

import Content from '../../UI/Content';
import Button from '../../UI/Button';

import Tags from '../../items/Tags';
import ArticleShowItem from '../../items/ArticleShowItem';

function Article(props) {
    const [t, i18n] = useTranslation();

    const [article, setArticle] = useState(null);
    const [allGroups, setAllGroups] = useState(null);
    const [showPreview, setShowPreview] = useState(null);

    useEffect(() => {
        getArticleHandler(props.match.params.id)
    }, [props.match.params.id]);

    const getArticleHandler = (id) => {
        getArticle(id, function(success, data) {
            if (success) {
                setArticle(data);
                getUsersGroups(function(success, data) {
                    if (success) {
                        setAllGroups(data);
                    }
                })
            }
            else {
                console.log(data.error.message);
            }
        })
    }

    const renderArticleInfo = () => {
        return (
            <div className="articleData">
                <div className="articleImage">
                    <img className="image" src={article.imagePath ? ("/api/v1/" + article.imagePath) : "/images/defaultImage.png"}/>
                </div>
                <div className="articleInfo">
                    <div className="articleStatuses">
                        <span className="status" type="active">{article.internal ? t("INTERNAL_ARTICLE.1") : t("FOR_EXPORT.1")}</span>
                        <span className="date">{dateFormatter(article.publishDate)}</span>
                    </div>
                    <Tags size="md" tags={article.tags}/>
                    <span className="title">{article.title.en}</span>
                    <span className="description">{article.description && article.description.en}</span>
                    <span className="dateTime">{article.dateTime}</span>
                    <div className={isSuperAdmin() ? "buttonGroup" : "previewButton"}>
                        <Button inline={isSuperAdmin()} onClick={()=>{props.history.push("/article/" + article._id + "/preview")}}>{t("PREVIEW.1")}</Button>
                        {isSuperAdmin() && <Button inline onClick={()=>{props.history.push("/article/" + article._id + "/edit")}}>{t("EDIT.1")}</Button>}
                    </div>
                </div>
            </div>
        )
    }

    const renderArticleAllowedGroups = (item, key) => {
        return <li className="allowedGroup" key={key}>{getLocale(allGroups.find(el => {return el._id == item}).title, i18n.language)}</li>
    }

    return (
        <div className="article">
                <Content title={article && article.title.en}>
                {article != null && allGroups &&
                    <div className="articleContent">
                        <div className="sectionTitle"><span className="title">{t("INFORMATION.1")}</span></div>
                        {renderArticleInfo()}
                        {article.internal && <>
                            <div className="sectionTitle"><span className="title">{t("ALLOWED_GROUPS.1")}</span></div>
                            <ul className="allowedGroups">
                                {article.allowedGroups.map(renderArticleAllowedGroups)}
                            </ul>
                        </>}
                        <div className="sectionTitle"><span className="title">{t("PREVIEW.1")}</span></div>
                        {showPreview && <ArticleShowItem article={article} currentLanguage={i18n.language}/>}
                        <div className="showPreviewButton">
                            <Button onClick={()=>{setShowPreview(!showPreview)}}>{showPreview ? t("HIDE_PREVIEW.1") : t("SHOW_PREVIEW.1")}</Button>
                        </div>
                    </div>
                }

                </Content>
        </div>
    );
}

export default Article;
