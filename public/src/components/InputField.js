import React from 'react';
import PropTypes from 'prop-types';


export function InputField(props) {
  return (
        <input
            id={ props.name }
            type='text'
            value={ props.value }
            onChange={function (evt) { props.validateInputText(evt, props.name) }}
        />
  );
}

InputField.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    validateInputText: PropTypes.func.isRequired,
}
