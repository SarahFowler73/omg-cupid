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
