import React, { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { useFormInput, getLocale } from '../../Utils/Hoocks';
import { getArticle, updateArticle, createArticle } from '../../Utils/ArticlesUtil';
import { saveImage } from '../../Utils/FilePicker';
import { getLogin, getUsersGroups } from '../../Utils/UserUtil';
import './index.css';

import Content from '../../UI/Content';
import Input from '../../UI/Input';
import Button from '../../UI/Button';
import RTEInput from '../../UI/RTEInput';
import Switch from '../../UI/Switch';
import MultyplySelect from '../../UI/MultyplySelect';
import Option from '../../UI/Option';

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
    const [internal, setInternal] = useState(true);
    const [groupsList, setGroupsList] = useState(null);
    const [allGroups, setAllGroups] = useState(null);
    const [publishDate, setPublishDate] = useState(null);

    const [image, setImage] = useState(null);
    const [imageData, setImageData] = useState(null);

    const articleRequest = (allGroups) => {
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
                setInternal(data.internal);
                setPublishDate(data.publishDate);
                let tagsStr = "";
                data.tags && data.tags.forEach((element, index) => {
                    tagsStr += element.title;
                    (index !== data.tags.length - 1) && (tagsStr += ",")
                })
                tags.setValue(tagsStr);
                setImage(data.imagePath ? ('/api/v1/' + data.imagePath) : null);

                let groups = [];
                data.allowedGroups.forEach(e => {groups.push(allGroups.find(aE => {return aE._id === e}))});
                setGroupsList(groups)
            }
            else {
                console.log(data.error.message);
                alert(t(data.error.key))
            }
        })
    }

    const groupsRequest = (mode) => {
        getUsersGroups(function(success, data) {
            if(success) {
                setAllGroups(data);
                mode && articleRequest(data);
            }
        })
    }

    useEffect(() => {
        let url = window.location.pathname.split('/');
        let mode = url[url.length-1] === "edit" ? true : false;
        setIsEdit(mode);
        groupsRequest(mode);
    }, []);

    const saveButtonClick = () => {
        if (i18n.language === "en") {
            if (title.en.value === "") {
                console.log("title is empty");
                alert(t("ERROR_TITLE_EMPTY.1"))
                return ;
            }
            if (rteData.en.value === "") {
                console.log("rteData is empty");
                alert(t("ERROR_RTEDATA_EMPTY.1"))
                return ;
            }
        }
        if (i18n.language === "ru") {
            if (title.ru.value === "") {
                console.log("title is empty");
                alert(t("ERROR_TITLE_EMPTY.1"))
                return ;
            }
            if (rteData.ru.value === "") {
                console.log("rteData is empty");
                alert(t("ERROR_RTEDATA_EMPTY.1"))
                return ;
            }
        }

        if (isEdit) {
            updateArticleClick();
        }
        else {
            createArticleClick();
        }
    }

    const createArticleClick = () => {
        if (imageData != null) {
            saveImage(imageData, function(success, data) {
                if (success) {
                    createArticleRequest(data);
                }
                else {
                    console.log(data.error.message);
                    alert(t(data.error.key))
                }
            });
          }
          else {
            createArticleRequest(null);
          }
    }

    const createArticleRequest = (imagePath) => {
        let tagsArr = tags.value !== "" ? tags.value.replace(', ', ',').split(',') : [];
        let packedTags = null;

        if (tagsArr.length > 0) {
            packedTags = [];
            tagsArr.forEach(element => {
                (element !== "") && packedTags.push({title: element})
            });
            packedTags = packedTags.length === 0 ? null : packedTags
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
            imagePath: imagePath,
            internal: internal,
            publishDate: new Date()
        }

        let allowedGroups = [];
        groupsList && groupsList.forEach(e => allowedGroups.push(e._id));

        if(allowedGroups.length === 0) {
            allowedGroups.push(0);
        }
        packedArticle.allowedGroups = allowedGroups;
        

        if (i18n.language === "ru") {
            if (title.en.value === "") {
                packedArticle.title.en = title.ru.value
            }
            if (description.en.value === "") {
                packedArticle.description.en = description.ru.value
            }
            if (rteData.en.value === "") {
                packedArticle.rteData.en = rteData.ru.value
            }
            if (author.en.value === "") {
                packedArticle.author.en = author.ru.value
            }
        } else if (i18n.language === "en") {
            if (title.ru.value === "") {
                packedArticle.title.ru = title.en.value
            }
            if (description.ru.value === "") {
                packedArticle.description.ru = description.en.value
            }
            if (rteData.ru.value === "") {
                packedArticle.rteData.ru = rteData.en.value
            }
            if (author.ru.value === "") {
                packedArticle.author.ru = author.en.value
            }
        }

        createArticle(packedArticle, function(success, data) {
            if (data.error == null) {
                props.history.push('/article/' + data._id)
            }
            else {
                console.log(data.error.message);
                alert(t(data.error.key))
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
                    alert(t(data.error.key))

                }
            });
          }
          else {
            updateArticleRequest(null);
          }
    }

    const updateArticleRequest = (imagePath) => {   
        let tagsArr = tags.value !== "" ? tags.value.replace(', ', ',').split(',') : [];
        let packedTags = null;

        if (tagsArr.length > 0) {
            packedTags = [];
            tagsArr.forEach(element => {
                (element !== "") && packedTags.push({title: element})
            });
            packedTags = packedTags.length === 0 ? null : packedTags
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
            imagePath: imagePath,
            internal: internal
        }

        if (publishDate == null) {
            packedArticle.publishDate = new Date();
        }

        let allowedGroups = [];
        groupsList && groupsList.forEach(e => allowedGroups.push(e._id));

        if(allowedGroups.length === 0 || groupsList == null) {
            allowedGroups.push(0);
        }
        packedArticle.allowedGroups = allowedGroups;

        updateArticle(props.match.params.id, packedArticle, function(success, data) {
            if (data.error == null) {
                props.history.push('/article/' + props.match.params.id)
            }
            else {
                console.log(data.error.message);
                alert(t(data.error.key))
            }
        })
    }

    const renderGroupsOptions = (item, index) => {
        return (
            <Option key={index} value={item._id}>{getLocale(item.title, i18n.language)}</Option>
        )
    }

    return (
        <div className="articleModify">
            <Content
                title={isEdit ? t("ARTICLE_EDITING.1") : t("ARTICLE_CREATING.1")}
                selectorContent={<LangSelector currentLanguage={currentLanguage} setCurrentLanguage={setCurrentLanguage}/>}
            >
                    {allGroups && <div className="field">
                        <Input
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
                            {t("TITLE.1")} *
                        </Input>
                        <Input 
                            type="textarea"
                            placeholder={t("ARTICLE_DESCRIPTION.1")}
                            value={getLocale(description, currentLanguage)}
                        >
                            {t("DESCRIPTION.1")}
                        </Input>
                        <Switch
                            value={internal}
                            onChange={(e)=>{setInternal(!internal)}}
                        >
                            Internal
                        </Switch>
                        {internal && <MultyplySelect
                            title={t("ALLOWED_GROUPS.1")}
                            list={groupsList}
                            setList={setGroupsList}
                            fullList={allGroups}
                            width="100%"
                        >
                            {allGroups.map(renderGroupsOptions)}
                        </MultyplySelect>}
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
                            {t("DATA.1")} *
                        </RTEInput>
                        <Input 
                            type="textarea"
                            placeholder={t("ARTICLE_DATA.1") + "HTML"}
                            value={getLocale(rteData, currentLanguage)}
                        >
                            HTML
                        </Input>
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
                    </div>}
                    <div className="actions">
                        <div className="action">
                            <Button onClick={saveButtonClick}>{t("SAVE.1")}</Button>
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


