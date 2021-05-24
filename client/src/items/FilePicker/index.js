import React, {useState} from 'react';
import { useTranslation } from "react-i18next";
import { Modal } from 'react-bootstrap';
import './index.css';

import Button from '../../UI/Button';

function FilePicker(props) {
    const deleteIcon = "/images/delete.png";

    const [t, ] = useTranslation();
  
    const [show, setShow] = useState(false);
    const [, setShowPopover] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => {setShowPopover(false); setShow(true)}

    const deleteEventClick = () => {
        props.setImage(null);
        props.setImageData(null);
        handleClose();
    }

    const onFileChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            props.setImage(URL.createObjectURL(img));
            props.setImageData(img);
        }
    };

    return (
        <div className="filePicker">
            <div className="inputItem" style={props.first && {marginTop: "0px"}}>
                <div className="inputTitle">{props.title}</div>
                <div className="inputContainer">
                    <div className="imagePicker">
                        {props.imageData != null &&
                            <div className="deleteButton" onClick={handleShow}>
                                <img className="deleteButtonIcon" alt="deleteIcon" src={deleteIcon} width="14px"/>
                            </div>
                        }
                        <div className="file-upload" style={{width: props.width}}>
                            <label>
                                <input type="file" name="file" className="inputFile" onChange={onFileChange} accept={props.accept}/>
                                <span>{props.children}</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            {props.image !== "" && props.image != null && <img className="image" height={props.imageMaxHeight} src={props.image} alt="preloadImage"/>}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{t("DELETE_IMAGE_Q.1")}</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button type="solid" onClick={handleClose}>
                        {t("CANCEL.1")}
                    </Button>
                    <Button type="solid" color="error" onClick={deleteEventClick}>
                        {t("DELETE.1")}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default FilePicker;


