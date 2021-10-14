import React from 'react';
import PropTypes from 'prop-types';

function InputCard({ labelText, id, name, type, onChange, testId }) {
  return (
    <div className="input">
      <label htmlFor={ id } className="input-label">
        {/* { name === 'email' ? <span>E-mail</span> : <span>Password</span> } */}
        { console.log(labelText) }
        <input
          id={ id }
          name={ name }
          type={ type }
          data-testid={ testId }
          onChange={ onChange }
          className="input-field"
          placeholder={ name === 'email' ? 'E-mail' : 'Password' }
        />
      </label>
    </div>
  );
}
InputCard.defaultProps = {
  labelText: '',
  testId: '',
};
InputCard.propTypes = {
  labelText: PropTypes.string,
  testId: PropTypes.string,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default InputCard;
