import React, { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { getArticles } from '../../Utils/ArticlesUtil';
import './index.css';

import Content from '../../UI/Content';
import Button from '../../UI/Button';

import ArticleItem from '../../items/ArticleItem';

function Articles(props) {
    const [t, i18n] = useTranslation();

    const [articles, setArticles] = useState(null);

    useEffect(() => {
        getArticlesHandler()
    }, []);

    const getArticlesHandler = () => {
        getArticles(function(success, data) {
            if (data.error == null) {
                setArticles(data.docs)
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
                id={item._id}
                imageSrc="https://pchel.net/files/users/stanislav640/portfolio/original/3133032_sample-5.jpg"
                description={item.rteData.en}
                dateTime="10.05.2021 23:23"
                tags={item.tags}
            >{item.title.en}</ArticleItem>
        )
    }

    return (
        <div className="articles">
            <Content title={t("ALL_ARTICLES.1")}>
                <div className="settings">
                    <div className="new">
                        <Button onClick={()=>{props.history.push("/article/new")}} width>Добавить</Button>
                    </div>
                </div>
                <div className="articlesData">
                    {articles != null && 
                        <>
                            <span className="title">Найдено: {articles.length} статьи</span>
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



/*
                                <ArticleItem
                                    id={2323}
                                    imageSrc="https://pchel.net/files/users/stanislav640/portfolio/original/3133032_sample-5.jpg"
                                    description="Lorem lorem lorem Lorem lorem lorem Lorem lorem lorem Lorem lorem lorem Lorem lorem lorem Lorem lorem lorem Lorem lorem lorem Lorem lorem lorem Lorem lorem lorem Lorem lorem lorem Lorem lorem lorem Lorem lorem lorem"
                                    dateTime="10.05.2021 23:23"
                                    tags={[{title: "Образование"}, {title: "MobiCash"}]}
                                >Делаю диплом</ArticleItem>
                                <ArticleItem
                                    id={2323}
                                    imageSrc="https://pchel.net/files/users/stanislav640/portfolio/original/3133032_sample-5.jpg"
                                    description="Сегодня стало известно, что самый лучший ВУЗ Челябинска, не так уж хорош. ЮУрГУ не попал в рейтинг 500 и теперь всех придется отчислять. Ответственный: Шепталин Г.А."
                                    dateTime="10.05.2021 23:23"
                                    tags={[{title: "#Внеучебка"}, {title: "#ЮУрГУ"}, {title: "Стипендия"}]}

                                >ЮУрГУ НЕ ПОПАЛО в рейтинг 500</ArticleItem>
                                <ArticleItem
                                    id={2323}
                                    imageSrc="https://pchel.net/files/users/stanislav640/portfolio/original/3133032_sample-5.jpg"
                                    description="Lorem lorem lorem Lorem lorem lorem Lorem lorem lorem Lorem lorem lorem Lorem lorem lorem Lorem lorem lorem Lorem lorem lorem Lorem lorem lorem Lorem lorem lorem Lorem lorem lorem Lorem lorem lorem Lorem lorem lorem"
                                    dateTime="10.05.2021 23:23"
                                >Text</ArticleItem>
                                 */