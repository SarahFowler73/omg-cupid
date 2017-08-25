import React from 'react';
import PropTypes from 'prop-types';


function Checkbox (props) {
    return (
        <label className='inline-selection'>
            { props.checkbox + ': '}
            <input
                type='checkbox'
                name={ props.name }
                value={ props.checkbox }
                onChange={ (evt) => { props.validateCheckBox(evt) }}
                checked={ props.whichChecked.indexOf(props.checkbox) > -1 ? 'checked' : '' }
            />
        </label>
    )
}

Checkbox.propTypes = {
    name: PropTypes.string.isRequired,
    checkbox: PropTypes.string.isRequired,
    validateCheckBox: PropTypes.func.isRequired,
    whichChecked: PropTypes.array.isRequired,
}


export function CheckboxGroup (props) {
    return (
        <div>
            {
                props.checkboxes.map((checkbox, i) => {
                    return (
                        <Checkbox
                            key={ i }
                            name={ props.name }
                            checkbox={ checkbox }
                            validateCheckBox={ props.validateCheckBox }
                            whichChecked={ props.whichChecked }
                        />
                    )
                })
            }
        </div>
    )
}

CheckboxGroup.propTypes = {
    name: PropTypes.string.isRequired,
    checkboxes: PropTypes.array.isRequired,
    validateCheckBox: PropTypes.func.isRequired,
    whichChecked: PropTypes.array.isRequired,
}
