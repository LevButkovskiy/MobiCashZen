import React, { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { useHistory } from 'react-router-dom';
import { getArticles } from '../../Utils/ArticlesUtil';
import { getLocale } from '../../Utils/Hoocks';
import { isSuperAdmin } from '../../Utils/UserUtil';
import './index.css';

function Menu(props) {
    const [t, i18n] = useTranslation();
    const history = useHistory()

    const [articles, setArticles] = useState(null);

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedElement, setSelectedElement] = useState(-1);

    const activeCategory = (articles) => {
        let url = window.location.pathname.split('/');
        let tag = (new URLSearchParams(window.location.search)).get("tag");

        if(tag != null) {
            switch(tag) {
                case "MobiCash": setSelectedCategory(2); setSelectedElement(-1); break;
                case "Test": setSelectedCategory(3); setSelectedElement(-1); break;
                default: break;
            }
            return;
        }
        if(url.length > 1 && url[1] === "personal") {
            setSelectedCategory(1);
            setSelectedElement(-1);
            return;
        }
        if (url.length > 2) {
            let articleId = url[2];
            if(articleId === "new" || articles.length === 0) {
              setSelectedCategory(0);
              setSelectedElement(-1);
              return;
            }
            articles.forEach((item, index) => {
                if (articleId === item._id) {
                    setSelectedCategory(index + 4);
                    activeElement();
                    return;
                }
            });
        } else {
            setSelectedCategory(0);
            activeElement();
        }
    }

    const activeElement = () => {
        let url = window.location.pathname.split('/');
        if (url.length > 3) {
            let path = url[3];
            switch (path) {
                case 'edit': setSelectedElement(0); break;
                // case 'preview': setSelectedElement(1); break;
                case 'show': setSelectedElement(1); break;
                default: setSelectedElement(-1);
            }
        } else {
            setSelectedElement(-1);
        }
    }

    useEffect(() => {
        const getArticlesHandler = () => {
            getArticles(null, function(success, data) {
                if (success) {
                    setArticles(data.docs);
                    activeCategory(data.docs);
                }
                else {
                    console.log(data.error.message);
                }
            })
        }

        getArticlesHandler()

    }, [history.location, window.location.search]);

    const renderMenu = (item, key) => {
        return (
            <MenuCategory
                key={key}
                title={getLocale(item.title, i18n.language)}
                index={key + 4}
                selectedCategory={selectedCategory}
                selectedElement={selectedElement}
                href={"/article/" + item._id}
                onClick={handleSelect}>
                    <MenuElement title={t("INFORMATION.1")}  index={0} selectedElement={selectedElement} href={"/article/" + item._id + "/edit"} onClick={handleSelect}/>
                    {/* <MenuElement title={t("PREVIEW.1")} index={1} selectedElement={selectedElement} href={"/article/" + item._id + "/preview"} onClick={handleSelect}/> */}
                    <MenuElement title={t("SHOW.1")} index={1} selectedElement={selectedElement} href={"/article/" + item._id + "/show"} onClick={handleSelect}/>
            </MenuCategory>)
    }

    const handleSelect = (e) => {
        let link = e.target.getAttribute('href');
        history.push(link)
    }

    const renderCategories = () => {
        if (isSuperAdmin()) {
            return (
                <>
                    <MenuCategory title={t("ALL_ARTICLES.1")} index={0} selectedElement={-1} selectedCategory={selectedCategory} href="/" onClick={handleSelect}/>
                    <MenuCategory hrAfter title={t("SAVED_ARTICLES.1")} index={1} selectedElement={-1} selectedCategory={selectedCategory} href="/personal" onClick={handleSelect}/>
                    <div className="categoryTitle">{t("TAGS.1")}</div>
                    <MenuCategory title={"MobiCash"} index={2} selectedElement={-1} selectedCategory={selectedCategory} href="/?tag=MobiCash" onClick={handleSelect}/>
                    <MenuCategory hrAfter title={"Test"} index={3} selectedElement={-1} selectedCategory={selectedCategory} href="/?tag=Test" onClick={handleSelect}/>
                    <div className="categoryTitle">{t("ARTICLES.1")}</div>
                    {articles != null && articles.map(renderMenu)}
                </>
            )
        }
        else {
            return (
                <>
                    <MenuCategory title={t("ALL_ARTICLES.1")} index={0} selectedElement={-1} selectedCategory={selectedCategory} href="/" onClick={handleSelect}/>
                    <MenuCategory hrAfter title={t("SAVED_ARTICLES.1")} index={1} selectedElement={-1} selectedCategory={selectedCategory} href="/personal" onClick={handleSelect}/>
                    <div className="categoryTitle">{t("TAGS.1")}</div>
                    <MenuCategory title={"MobiCash"} index={2} selectedElement={-1} selectedCategory={selectedCategory} href="/?tag=MobiCash" onClick={handleSelect}/>
                    <MenuCategory hrAfter title={"Test"} index={3} selectedElement={-1} selectedCategory={selectedCategory} href="/?tag=Test" onClick={handleSelect}/>
                </>
            )
        }
    }

    return (
        <div className="menu">
            <ul>
                {renderCategories()}
            </ul>
        </div>
    );
}

export default Menu;

function MenuCategory(props) {
    const selected = (Number(props.index) === Number(props.selectedCategory) && Number(-1) === Number(props.selectedElement)) ? "selected" : null;

    return (
        <>
            <li className="category" onClick={props.onClick} href={props.href} type={selected} >
                <div className="title" onClick={props.onClick} href={props.href}>{props.title}</div>
                {props.hrAfter && <div className="line">&nbsp;</div>}
                {props.children && props.index === props.selectedCategory &&
                    <ul>
                        {props.children}
                    </ul>
                }
            </li>
        </>
    );
}

function MenuElement(props) {
    const selected = (Number(props.index) === Number(props.selectedElement)) ? "selected" : null;

    return (
        <li className="element" type={selected} onClick={props.onClick} href={props.href}>
            <div className="title" onClick={props.onClick} href={props.href}>{props.title}</div>
        </li>
    );
}

