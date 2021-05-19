import React, { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { useFormInput } from '../../Utils/Hoocks';
import { getArticle, updateArticle, createArticle } from '../../Utils/ArticlesUtil';
import { saveImage } from '../../Utils/FilePicker';
import { getLogin } from '../../Utils/UserUtil';
import './index.css';

import Content from '../../UI/Content';
import Input from '../../UI/Input';
import Button from '../../UI/Button';
import RTEInput from '../../UI/RTEInput';

import FilePicker from '../../items/FilePicker';

function Articles(props) {
    const [t, i18n] = useTranslation();

    const [isEdit, setIsEdit] = useState(false);

    const author = useFormInput(getLogin());
    const title = useFormInput('');
    const description = useFormInput('');
    const tags = useFormInput('')
    const rteData = useFormInput('');
    
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
                author.setValue(data.author.en);
                title.setValue(data.title.en);
                description.setValue(data.description.en);
                rteData.setValue(data.rteData.en);
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
                en: author.value,
                ru: author.value
            },
            title: {
                en: title.value,
                ru: title.value
            },
            rteData: {
                en: rteData.value,
                ru: rteData.value
            },
            description: {
                en: description.value,
                ru: description.value
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
                en: author.value,
                ru: author.value
            },
            title: {
                en: title.value,
                ru: title.value
            },
            rteData: {
                en: rteData.value,
                ru: rteData.value
            },
            description: {
                en: description.value,
                ru: description.value
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
            <Content title="New Article (localize)">
                <div className="field">
                    <Input first type="text" placeholder="Author (localize)" value={author} width="30%">Author (localize)</Input>
                    <Input type="text" placeholder="Article title (localize)" value={title} width="60%">Title (localize)</Input>
                    <Input type="textarea" placeholder="Article description (localize)" value={description}>Description (localize)</Input>
                    <Input type="text" placeholder="Type tags here" description="Вводятся через запятую" value={tags} width="100%">Tags</Input>
                    <RTEInput placeholder="Article description (localize)" data={rteData}>Data (localize)</RTEInput>
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
                        <Button onClick={isEdit ? updateArticleClick : createArticleClick}>Save</Button>
                    </div>
                    <div className="action">
                        <Button cancel onClick={()=>{props.history.goBack()}}>Cancel</Button>
                    </div>
                </div>
            </Content>
        </div>
    );
}

export default Articles;


