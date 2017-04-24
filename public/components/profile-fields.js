// Libs
import React from 'react';
import PropTypes from 'prop-types';

export function RadioButton(props) {
  return (
      <label>
            <input type='radio' name={props.name} value={props.value} checked={props.checked}/>
            {' ' + props.label}
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
      <div className='form-group'>
            <label htmlFor={props.name}>{props.label}:</label>
            <div className='popup'>
                <input
                  id={props.name}
                  type='text'
                  value={props.value}
                  onChange={function (evt) { props.validateInputText(evt, props.name); }}
                />
                <span className='popuptext' style={{ display: props.display }}>
                    {props.warning}
                </span>
            </div>
        </div>
  );
}

InputField.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    validateInputText: PropTypes.func.isRequired,
    display: PropTypes.string.isRequired,
    warning: PropTypes.string.isRequired,
  };

export function AgeField(props) {
  return (
      <div className='form-group'>
            <label htmlFor='age'>Age: </label>
            <div className='popup'>
                <select id='age'
                        onChange={function (evt) { props.validateAgeChoice(evt, 'age'); }}
                >
                    {props.ageOpts.map(function (age, i) {
                      return i === 0
                         ?
                           <option key={i} value={age} selected disabled>{age}</option>
                          :
                           <option key={i} value={age}>{age}</option>;

                    })}

                </select>
                <span className='popuptext' style={{ display: props.display }}>
                    {props.warning}
                </span>
            </div>
        </div>
  );
}

export function SexField(props) {
  return (
      <div className='form-group'>
            <label htmlFor='sex'>Sex:</label>

            <div className='radio popup'
                 onChange={function (evt) {props.validateSexChoice(evt, 'sex');}}
            >
              {props.sexOpts.map(function (opt, i) {
              return <RadioButton
                  key={i}
                  name='sex'
                  label={opt}
                  value={opt.toLowerCase()}
                  checked={props.whichChecked == opt.toLowerCase() ? 'checked' : ''}/>;
            })}
              <span className='popuptext' style={{ display: props.display }}>{props.warning}</span>
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

export function LookingFor(props) {
  return (
      <div className='form-group'>
        <label>Looking for: </label>
        {props.lookingFor.map(function (box, i) {
          return <label key={i}>{box}:
                <input
                  type='checkbox'
                  name='lookingFor'
                  value={box}
                  onChange={function (evt) {props.validateLookingFor(evt);}}
                  checked={props.whichChecked.indexOf(box) > -1 ? 'checked' : ''}
              />
            </label>;
        })}
        </div>
  );
}

LookingFor.propTypes = {
    lookingFor: PropTypes.array.isRequired,
    validateLookingFor: PropTypes.func.isRequired,
    whichChecked: PropTypes.array.isRequired,
  };
