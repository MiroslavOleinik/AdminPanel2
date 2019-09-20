import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = ({ roles }) => ({
  roles: roles,
});

const formSelect = ({ id, label, roles }) => {
  return <div className="form-field">
    <select id={id}>
      {roles.map((element, index) => {
        return <option key={`${element}${index}`} value={element}>{element}</option>
      })}
    </select>
  </div>
}

export default connect(mapStateToProps)(formSelect);
