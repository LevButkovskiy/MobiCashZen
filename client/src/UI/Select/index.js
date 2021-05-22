import React from 'react';
import './index.css';

function Select(props, { component: Component, ...children}) {
  return (
    <div className="selectItem">
      <div className="selectTitle">{props.title}</div>
      {props.description && <div className="selectDescription">{props.description}</div>}
      <div className="selectContainer">
        <select className="select" value={props.value} onChange={props.onChange} style={{width: props.width}} disabled={props.disabled}>
          {props.children}
        </select>
      </div>
    </div>
  );
}

export default Select;
