import React from 'react';
import './index.css';

import ReactQuill, {Quill} from 'react-quill';
import ImageResize from 'quill-image-resize-module-react'
import 'react-quill/dist/quill.snow.css';

Quill.register('modules/imageResize', ImageResize)


function RTEInput(props, { component: Component, ...children }) {

    const rteChangeHandler = (content, delta, source) => {
        if(source == "user") {
            props.data.setValue(content)            
        }
    }

    const modules = React.useMemo(() => ({
        imageResize: {
            modules: ['Resize', 'DisplaySize']
        },
        toolbar: {
            container: [
                [{'header': [1, 2, 3, 4, 5, 6, false]}],
                [{'size': ['small', false, 'large', 'huge']}],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
                [{'color': []}, {'background': []}],
                [{'align': []}],
                ['link', 'image', 'video', 'code-block'],
                ['clean']
            ]
        }
    }), [])

    return (
        <div className="RTEinputItem">
            <div className="RTEinputTitle">{props.children}</div>
            <div className="RTEinputContainer">
              <ReactQuill
                modules={modules}
                theme="snow"
                value={props.data.value}
                onChange={rteChangeHandler}
              />
            </div>
        </div>
    );
}

export default RTEInput;
