import React from 'react';

const formInput = ({ name, id, type, label }) => {
  return <div className="form-field">
    <input type={type} name={name} id={id} placeholder={label}/>
  </div>
}

export default formInput;
