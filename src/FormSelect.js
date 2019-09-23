import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = ({ roles }) => ({
  roles: roles,
});

const formSelect = ({ id, roles, onchange }) => {
  return <div className="form-field">
    <select id={id} onChange={onchange}>
      {roles.map((element, index) => {
        return <option key={`${element}${index}`} value={element} >{element}</option>
      })}
    </select>
  </div>
}

export default connect(mapStateToProps)(formSelect);
