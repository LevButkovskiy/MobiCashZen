import React from 'react';
import './index.css';

function ArticleItem(props) {

    const renderTags = (item, key) => {
        return <li key={key} className="tag"><a href={"/?tag=" + item.title}>{item.title}</a></li>
    }

    return (
        <div className="tags">
            <ul className="tagsMenu" type={props.size}>
                {props.tags && props.tags.map(renderTags)}
            </ul>
        </div>
    )
}

export default ArticleItem;


