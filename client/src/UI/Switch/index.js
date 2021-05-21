import React from 'react';
import './index.css';

function Switch(props, { component: Component, ...children}) {
  return (<div className="switchItem">
      <span className="switchTitle">{props.children}</span>
      <label className="switch">
        <input type="checkbox" checked={props.value} onChange={props.onChange}/>
        <span className="slider round"></span>
      </label>
      </div>
  );
}

export default Switch;
