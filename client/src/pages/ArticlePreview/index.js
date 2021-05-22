import React, { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { getArticle } from '../../Utils/ArticlesUtil';
import { getLocale } from '../../Utils/Hoocks';
import { dateFormatter } from '../../Utils/Formatter';

import './index.css';

import Content from '../../UI/Content';
import LangSelector from '../../items/LangSelector';
import ArticleShowItem from '../../items/ArticleShowItem';

function ArticlePreview(props) {
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

    return (
        <div className="articlePreview">
                {article != null &&
                    <Content title={t("PREVIEW.1")} subtitle={getLocale(article.title, currentLanguage)} selectorContent={<LangSelector currentLanguage={currentLanguage} setCurrentLanguage={setCurrentLanguage}/>}>
                        <ArticleShowItem article={article} currentLanguage={currentLanguage}/>
                    </Content>
                }
        </div>
    );
}

export default ArticlePreview;
