import React from 'react';
import './index.css';

function Option(props, { component: Component, ...children}) {
  return (
      <option className="mobiCashOption" value={props.value || props.value === 0 ? props.value : props.children}>{props.children}</option>
  );
}

export default Option;
