import React, { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { useFormInput, getLocale } from '../../Utils/Hoocks';
import { getArticle, updateArticle, createArticle } from '../../Utils/ArticlesUtil';
import { saveImage } from '../../Utils/FilePicker';
import { getLogin } from '../../Utils/UserUtil';
import './index.css';

import Content from '../../UI/Content';
import Input from '../../UI/Input';
import Button from '../../UI/Button';
import RTEInput from '../../UI/RTEInput';

import FilePicker from '../../items/FilePicker';
import LangSelector from '../../items/LangSelector';

function Articles(props) {
    const [t, i18n] = useTranslation();
    const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

    const [isEdit, setIsEdit] = useState(false);

    const author = {ru: useFormInput(getLogin()), en: useFormInput(getLogin())};
    const title = {ru: useFormInput(''), en: useFormInput('')};
    const description = {ru: useFormInput(''), en: useFormInput('')};
    const tags = useFormInput('');
    const rteData = {ru: useFormInput(''), en: useFormInput('')};
    
    const [image, setImage] = useState(null);
    const [imageData, setImageData] = useState(null);

    useEffect(() => {
        let url = window.location.pathname.split('/');
        let mode = url[url.length-1] === "edit" ? true : false;
        setIsEdit(mode);
        mode && articleRequest();
    }, []);

    const articleRequest = () => {
        getArticle(props.match.params.id, function(success, data) {
            if (success) {
                author.en.setValue(data.author.en);
                author.ru.setValue(data.author.ru);
                title.en.setValue(data.title.en);
                title.ru.setValue(data.title.ru);
                description.en.setValue(data.description.en);
                description.ru.setValue(data.description.ru);
                rteData.en.setValue(data.rteData.en);
                rteData.ru.setValue(data.rteData.ru);
                let tagsStr = "";
                data.tags.forEach((element, index) => {
                    tagsStr += element.title;
                    index != data.tags.length - 1 && (tagsStr += ",")
                })
                tags.setValue(tagsStr);
                setImage(data.imagePath ? ('/api/v1/' + data.imagePath) : null);
            }
            else {
                console.log(data.error.message)
            }
        })
    }

    const createArticleClick = () => {
        if (imageData != null) {
            saveImage(imageData, function(success, data) {
                if (success) {
                    createArticleRequest(data);
                }
                else {
                    console.log(data.error.message);
                }
            });
          }
          else {
            createArticleRequest(null);
          }
    }

    const createArticleRequest = (imagePath) => {
        let tagsArr = tags.value != "" ? tags.value.replace(', ', ',').split(',') : [];
        let packedTags = null;

        if (tagsArr.length > 0) {
            packedTags = [];
            tagsArr.forEach(element => {
                element != "" && packedTags.push({title: element})
            });
            packedTags = packedTags.length == 0 ? null : packedTags
        }

        let packedArticle = {
            author: {
                en: author.en.value,
                ru: author.ru.value
            },
            title: {
                en: title.en.value,
                ru: title.ru.value
            },
            rteData: {
                en: rteData.en.value,
                ru: rteData.ru.value
            },
            description: {
                en: description.en.value,
                ru: description.ru.value
            },
            tags: packedTags,
            imagePath: imagePath
        }

        createArticle(packedArticle, function(success, data) {
            if (data.error == null) {
                props.history.push('/article/' + data._id)
            }
            else {
                console.log(data.error.message);
            }
        })
    }

    const updateArticleClick = () => {
        if (imageData != null) {
            saveImage(imageData, function(success, data) {
                if (success) {
                    updateArticleRequest(data);
                }
                else {
                    console.log(data.error.message);
                }
            });
          }
          else {
            updateArticleRequest(null);
          }
    }

    const updateArticleRequest = (imagePath) => {   
        let tagsArr = tags.value != "" ? tags.value.replace(', ', ',').split(',') : [];
        let packedTags = null;

        console.log(tagsArr)
        if (tagsArr.length > 0) {
            packedTags = [];
            tagsArr.forEach(element => {
                element != "" && packedTags.push({title: element})
            });
            packedTags = packedTags.length == 0 ? null : packedTags
        }

        let packedArticle = {
            author: {
                en: author.en.value,
                ru: author.ru.value
            },
            title: {
                en: title.en.value,
                ru: title.ru.value
            },
            rteData: {
                en: rteData.en.value,
                ru: rteData.ru.value
            },
            description: {
                en: description.en.value,
                ru: description.ru.value
            },
            tags: packedTags,
            imagePath: imagePath
        }

        updateArticle(props.match.params.id, packedArticle, function(success, data) {
            if (data.error == null) {
                props.history.push('/article/' + props.match.params.id)
            }
            else {
                console.log(data.error.message);
            }
        })
    }

    return (
        <div className="articleModify">
            <Content
                title={isEdit ? t("ARTICLE_EDITING.1") : t("ARTICLE_CREATING.1")}
                selectorContent={<LangSelector currentLanguage={currentLanguage} setCurrentLanguage={setCurrentLanguage}/>}
            >
                <div className="field">
                    <Input
                        first
                        type="text"
                        placeholder={t("ARTICLE_AUTHOR.1")}
                        value={getLocale(author, currentLanguage)}
                        width="30%"
                    >
                        {t("AUTHOR.1")}
                    </Input>
                    <Input
                        type="text"
                        placeholder={t("ARTICLE_TITLE.1")}
                        value={getLocale(title, currentLanguage)}
                        width="60%"
                    >
                        {t("TITLE.1")}
                    </Input>
                    <Input 
                        type="textarea"
                        placeholder={t("ARTICLE_DESCRIPTION.1")}
                        value={getLocale(description, currentLanguage)}
                    >
                        {t("DESCRIPTION.1")}
                    </Input>
                    <Input
                        type="text"
                        placeholder={t("ARTICLE_TAGS.1")}
                        description={t("TAGS_INPUT_DESCRIPTION.1")}
                        value={tags}
                        width="100%"
                    >
                        {t("TAGS.1")}
                    </Input>
                    <RTEInput
                        placeholder={t("ARTICLE_DATA.1")}
                        data={getLocale(rteData, currentLanguage)}
                    >
                        {t("DATA.1")}
                    </RTEInput>
                    <FilePicker
                        title={t("IMAGE.1")}
                        image={image}
                        setImage={setImage}
                        imageData={imageData}
                        setImageData={setImageData}
                        width="25%"
                        accept="image/*"
                    >
                        + {t("ADD_PHOTO.1")}
                    </FilePicker>
                </div>
                <div className="actions">
                    <div className="action">
                        <Button onClick={isEdit ? updateArticleClick : createArticleClick}>{t("SAVE.1")}</Button>
                    </div>
                    <div className="action">
                        <Button cancel onClick={()=>{props.history.goBack()}}>{t("CANCEL.1")}</Button>
                    </div>
                </div>
            </Content>
        </div>
    );
}

export default Articles;


