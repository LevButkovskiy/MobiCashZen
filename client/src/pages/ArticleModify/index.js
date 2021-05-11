import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import { useFormInput } from '../../Utils/Hoocks';
import { createArticle } from '../../Utils/ArticlesUtil';
import './index.css';

import Content from '../../UI/Content';
import Input from '../../UI/Input';
import Button from '../../UI/Button';
import RTEInput from '../../UI/RTEInput';

function Articles(props) {
    const [t, i18n] = useTranslation();

    const title = useFormInput('');
    const description = useFormInput('');
    const tags = useFormInput('')
    const rteData = useFormInput('');

    const createArticleClick = () => {
        let tagsArr = tags.value.split(',')
        let packedTags = [];

        tagsArr.forEach(element => {
            packedTags.push({title: element})
        });

        let packedArticle = {
            titleEn: title.value,
            titleRu: title.value,
            rteDataEn: rteData.value,
            rteDataRu: rteData.value,
            tags: packedTags
        }
        console.log(packedArticle);

        createArticle(packedArticle, function(success, data) {
            if (data.error == null) {
                console.log("article created");
                props.history.push('/')
            }
            else {
                console.log(data.error.message);
            }
        })
    }

    return (
        <div className="articleModify">
            <Content title="New Article (localize)">
                <div className="field">
                    <Input first type="text" placeholder="Article title (localize)" value={title} width="60%">Title (localize)</Input>
                    <Input type="textarea" placeholder="Article description (localize)" value={description}>Description (localize)</Input>
                    <Input first type="text" placeholder="Type tags here" description="Вводятся через запятую" value={tags} width="100%">Tags</Input>
                    <RTEInput type="textarea" placeholder="Article description (localize)" data={rteData}>Data (localize)</RTEInput>

                </div>
                <div className="actions">
                    <div className="action">
                        <Button onClick={()=>{createArticleClick()}}>Save</Button>
                    </div>
                    <div className="action">
                        <Button cancel onClick={()=>{props.history.push("/")}}>Cancel</Button>
                    </div>
                    Text2
                </div>
            </Content>
        </div>
    );
}

export default Articles;


