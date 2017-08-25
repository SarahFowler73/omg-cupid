import React from 'react';
import PropTypes from 'prop-types';

function PopUpComponent(props) {
    return (
        <span className='popuptext' style={{ display: props.display }}>
            { props.warning }
        </span>
    )
}

export function FormGroup(props) {
    return (
        <div className='form-group'>
            <label htmlFor={ props.name }>{ props.label }</label>
            <div className='popup'>
                { props.children }
                <PopUpComponent
                    display={ props.existsInArray(props.name, 'warnings') ? 'block' : 'none' }
                    warning={ props.warning }
                />
            </div>
        </div>
    )
}


export function RadioButton(props) {
    return (
        <label className="inline-selection">
            <input type='radio' name={ props.name } value={ props.value } checked={ props.checked }/>
            { ' ' + props.label }
        </label>
    );
}

RadioButton.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    checked: PropTypes.string.isRequired,
  };

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
  };

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
  };

export function SexField(props) {
  return (
      <div className='form-group'>
            <label htmlFor='sex'>Sex:</label>

            <div className='radio popup'
                 onChange={function (evt) {props.validateSexChoice(evt, 'sex');}}
            >
              {props.sexOpts.map(function (opt, i) {
              return <RadioButton
                  key={ i }
                  name='sex'
                  label={ opt }
                  value={ opt.toLowerCase() }
                  checked={ props.whichChecked == opt.toLowerCase() ? 'checked' : '' }/>;
            })}
              <PopUpComponent display={ props.display } warning={ props.warning }/>
            </div>
        </div>
  );
}

SexField.propTypes = {
    sexOpts: PropTypes.arrayOf(PropTypes.string).isRequired,
    validateSexChoice: PropTypes.func.isRequired,
    display: PropTypes.string.isRequired,
    whichChecked: PropTypes.string.isRequired,
  };


export function CheckboxGroup (props) {
    return (
        <div>
            {
                props.checkboxes.map((checkbox, i) => {
                    return (
                        <label className='inline-selection' key={ i }>
                            { checkbox + ': '}
                            <input
                                type='checkbox'
                                name={ props.name }
                                value={ checkbox }
                                onChange={ (evt) => { props.validateCheckBox(evt) }}
                                checked={ props.whichChecked.indexOf(checkbox) > -1 ? 'checked' : '' }
                            />
                        </label>
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
  };
