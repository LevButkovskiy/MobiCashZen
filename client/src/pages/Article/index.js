import React, { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { getArticle } from '../../Utils/ArticlesUtil';
import './index.css';

import Content from '../../UI/Content';
import Button from '../../UI/Button';

import Tags from '../../items/Tags';

function Article(props) {
    const [t, i18n] = useTranslation();

    const [article, setArticle] = useState(null);

    useEffect(() => {
        getArticleHandler(props.match.params.id)
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

    const renderArticleInfo = () => {
        return (
            <div className="articleData">
                <div className="articleImage">
                    <img className="image" src={article.imagePath ? ("/api/v1/" + article.imagePath) : "https://pchel.net/files/users/stanislav640/portfolio/original/3133032_sample-5.jpg"}/>
                </div>
                <div className="articleInfo">
                    <div className="articleStatuses">
                        <span className="status" type="active">{"Active"}</span>
                        <span className="date">24.05.2021 23:23</span>
                    </div>
                    <Tags size="md" tags={article.tags}/>
                    <span className="title">{article.title.en}</span>
                    <span className="description">{article.description && article.description.en}</span>
                    <span className="dateTime">{article.dateTime}</span>
                    <div className="previewButton">
                        <Button onClick={()=>{props.history.push("/article/" + article._id + "/preview")}}>Preview</Button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="article">
                <Content title={article && article.title.en}>
                {article != null &&
                    <div className="articleContent">
                        <span className="sectionTitle">Information</span>
                        {renderArticleInfo()}
                    </div>
                }

                </Content>
        </div>
    );
}

export default Article;
