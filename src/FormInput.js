import React from 'react';

const formInput = ({ name, id, type, label, onchange, value }) => {
  return <div className="form-field">
    <input type={type} name={name} id={id} placeholder={label} onChange={onchange} value={value}/>
  </div>
}

export default formInput;
