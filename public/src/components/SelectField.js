import React from 'react';
import PropTypes from 'prop-types';

export function SelectField(props) {
    return (
        <select id={ props.name } onChange={(evt) => { props.validateSelect(evt, props.name)}}>
            {
                props.options.map((opt, i) => {
                    return (
                        <option
                            key={ i }
                            value={ opt }
                            selected={ i === 0 ? 'selected' : ''}
                            disabled={ i === 0 ? 'disabled' : ''}>
                                { opt }
                        </option>
                    )
                })
            }
        </select>
    )
}

SelectField.propTypes = {
    name: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    validateSelect: PropTypes.func.isRequired,
}
