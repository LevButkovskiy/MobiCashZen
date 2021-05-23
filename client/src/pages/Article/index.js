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
import LangSelector from '../../items/LangSelector';
import ArticleShowItem from '../../items/ArticleShowItem';

function Article(props) {
    const [t, i18n] = useTranslation();
    const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

    const [article, setArticle] = useState(null);
    const [allGroups, setAllGroups] = useState(null);
    const [showPreview, setShowPreview] = useState(false);

    useEffect(() => {
        getArticleHandler(props.match.params.id);
        setShowPreview(false);
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
                    <span className="author">{getLocale(article.author, currentLanguage)}</span>
                    <span className="title">{getLocale(article.title, currentLanguage)}</span>
                    <span className="description">{getLocale(article.description, currentLanguage)}</span>
                    <span className="dateTime">{article.dateTime}</span>
                    <div className={isSuperAdmin() ? "buttonGroup" : "previewButton"}>
                        <Button inline={isSuperAdmin()} onClick={()=>{props.history.push("/article/" + article._id + "/show")}}>{t("SHOW.1")}</Button>
                        {isSuperAdmin() && <Button inline onClick={()=>{props.history.push("/article/" + article._id + "/edit")}}>{t("EDIT.1")}</Button>}
                    </div>
                </div>
            </div>
        )
    }

    const renderArticleAllowedGroups = (item, key) => {
        return <li className="allowedGroup" key={key}>{getLocale(allGroups.find(el => {return el._id == item}).title, currentLanguage)}</li>
    }

    return (
        <div className="article">
                <Content
                    title={article && getLocale(article.title, i18n.language)}
                    selectorContent={<LangSelector currentLanguage={currentLanguage} setCurrentLanguage={setCurrentLanguage}/>}                  
                >
                {article != null && allGroups &&
                    <div className="articleContent">
                        <div className="sectionTitle"><span className="title">{t("INFORMATION.1")}</span></div>
                        {renderArticleInfo()}
                        {article.internal && <>
                            <div className="sectionTitle"><span className="title">{t("AVAILABILITY.1")}</span></div>
                            <ul className="allowedGroups">
                                {article.allowedGroups.map(renderArticleAllowedGroups)}
                            </ul>
                        </>}
                        <div className="sectionTitle"><span className="title">{t("PREVIEW.1")}</span></div>
                        {showPreview && <ArticleShowItem preview article={article} currentLanguage={currentLanguage}/>}
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
