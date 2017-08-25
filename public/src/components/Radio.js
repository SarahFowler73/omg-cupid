import React from 'react';
import PropTypes from 'prop-types';


export function RadioButton(props) {
    return (
        <label className="inline-selection">
            <input
                type='radio'
                name={ props.name }
                value={ props.value }
                checked={ props.checked }
            />
            { ' ' + props.label }
        </label>
    )
}

RadioButton.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    checked: PropTypes.string.isRequired,
}


export function RadioGroup(props) {
    return (
        <div className='radio'
             onChange={function (evt) {props.validateButtons(evt, props.name)}}
        >
          {
              props.buttons.map(function (button, i) {
                  return <RadioButton
                      key={ i }
                      name={ props.name }
                      label={ button }
                      value={ button.toLowerCase() }
                      checked={ props.whichChecked == button.toLowerCase() ? 'checked' : '' }/>
                })
            }
        </div>
    )
}

RadioGroup.propTypes = {
    name: PropTypes.string.isRequired,
    buttons: PropTypes.array.isRequired,
    validateButtons: PropTypes.func.isRequired,
    whichChecked: PropTypes.string.isRequired,
}
