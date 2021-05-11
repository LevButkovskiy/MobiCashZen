import React, { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { getArticles } from '../../Utils/ArticlesUtil';
import './index.css';

function Menu(props) {
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

    const renderMenu = (item, key) => {
        return <li>{item.title.en}</li>
    }

    return (
        <div className="menu">
            <ul>
                {articles != null && articles.map(renderMenu)}
            </ul>
        </div>
    );
}

export default Menu;


