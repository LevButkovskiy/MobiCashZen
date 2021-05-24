import React from 'react';
import './index.css';

function Input(props) {
    return (
        <div className="input" id={props.first ? "first" : null}>
            <div className="title">
                {props.children}
            </div>
            {props.description && 
                <div className="description">
                    {props.description}
                </div>
            }
            {props.type !== "textarea" ?
                <input
                    style={{width: props.width || "100%"}}
                    type={props.type}
                    {...props.value}
                    placeholder={props.placeholder}
                />
                :
                <textarea
                    type={props.type}
                    {...props.value}
                    placeholder={props.placeholder}
                />
            }
        </div>
    );
}

export default Input;


