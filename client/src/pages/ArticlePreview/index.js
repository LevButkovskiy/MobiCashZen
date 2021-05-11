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

    return (
        <div className="articlePreview">
                {article != null &&
                    <Content>
                        <div className="articlePreviewContent">
                            <div className="title">{article.title.en}</div>
                            <div className="articlePreviewData" dangerouslySetInnerHTML={{__html: article.rteData.en}}></div>
                        </div>
                    </Content>
                }
        </div>
    );
}

export default ArticlePreview;
