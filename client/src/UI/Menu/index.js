import React, { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { useHistory } from 'react-router-dom';
import { getArticles } from '../../Utils/ArticlesUtil';
import './index.css';

function Menu(props) {
    const [t, i18n] = useTranslation();
    const history = useHistory()

    const [articles, setArticles] = useState(null);

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedElement, setSelectedElement] = useState(-1);

    useEffect(() => {
        getArticlesHandler()
    }, []);

    useEffect(() => {
        getArticlesHandler();
    }, [history.location]);

    useEffect(() => {
        getArticlesHandler();
    }, [window.location.search]);

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

    const activeCategory = (articles) => {
        let url = window.location.pathname.split('/');
        let tag = (new URLSearchParams(window.location.search)).get("tag");

        if(tag != null) {
            switch(tag) {
                case "MobiCash": setSelectedCategory(1); setSelectedElement(-1); break;
                case "Test": setSelectedCategory(2); setSelectedElement(-1); break;
            }
            return;
        }
        if (url.length > 2) {
            let articleId = url[2];
            if(articleId === "new" || articles.length == 0) {
              setSelectedCategory(0);
              setSelectedElement(-1);
              return;
            }
            articles.forEach((item, index) => {
                if (articleId === item._id) {
                    setSelectedCategory(index + 3);
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
                case 'preview': setSelectedElement(1); break;
                default: setSelectedElement(-1);
            }
        } else {
            setSelectedElement(-1);
        }
    }

    const renderMenu = (item, key) => {
        return (
            <MenuCategory
                title={item.title.en}
                index={key + 3}
                selectedCategory={selectedCategory}
                selectedElement={selectedElement}
                href={"/article/" + item._id}
                onClick={handleSelect}>
                    <MenuElement title="Info" index={0} selectedElement={selectedElement} href={"/article/" + item._id} onClick={handleSelect}/>
                    <MenuElement title="Preview" index={1} selectedElement={selectedElement} href={"/article/" + item._id + "/preview"} onClick={handleSelect}/>
            </MenuCategory>)
        return <li>{item.title.en}</li>
    }

    const handleSelect = (e) => {
        let link = e.target.getAttribute('href');
        history.push(link)
    }

    return (
        <div className="menu">
            <ul>
            <MenuCategory hrAfter title={"Все статьи"} index={0} selectedElement={-1} selectedCategory={selectedCategory} href="/" onClick={handleSelect}/>
            <div className="categoryTitle">Tags</div>
            <MenuCategory title={"MobiCash"} index={1} selectedElement={-1} selectedCategory={selectedCategory} href="/?tag=MobiCash" onClick={handleSelect}/>
            <MenuCategory hrAfter title={"Test"} index={2} selectedElement={-1} selectedCategory={selectedCategory} href="/?tag=Test" onClick={handleSelect}/>
            <div className="categoryTitle">Articles</div>
            {articles != null && articles.map(renderMenu)}
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

