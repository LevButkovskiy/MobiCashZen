import React from 'react';
import './index.css';

function Button(props) {    
    
    const buttonType = () => {
        if(props.cancel) {
            return "cancel"
        }
        else {
            return "other"
        }
    }

    return (
        <div className="button" type={props.inline ? "inline" : null}>
            <button
                onClick={props.onClick}
                type={buttonType()}
            >
                {props.children}
            </button>
        </div>
    );
}

export default Button;


