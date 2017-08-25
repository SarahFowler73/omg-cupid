// Libs
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'

import { RadioButton, InputField, AgeField, SexField, LookingFor } from './profile-fields'

export default class ProfileForm extends Component {

    static propTypes = {
        ageOpts: PropTypes.array.isRequired,
        sexOpts: PropTypes.arrayOf(PropTypes.string).isRequired,
        lookingFor: PropTypes.array.isRequired,
        submitForm: PropTypes.func.isRequired,
    }

    state = {
        username: '',
        age: '',
        sex: '',
        description: '',
        lookingFor: [],
        canCount: false,
        warnings: [],
        form_complete: false,
    }

    existsInArray = (value, stateArrayKey) => {
        // Return int > 0 if exists in state attribute of array type
        return this.state[stateArrayKey].filter(
            function (val) {return val == value}
        ).length
    }

    addToArray = (value, stateArrayKey) => {
        // Add to state attribute of array type
        let arr = this.state[stateArrayKey].slice();
        if (!this.existsInArray(value, stateArrayKey))
            arr.push(value)
        return arr
    }

    removeFromArray = (value, stateArrayKey) => {
        // Remove from state attribute of array type
        let arr = this.state[stateArrayKey].slice()
        if (this.existsInArray(value, stateArrayKey))
            arr.splice(arr.indexOf(value), 1)
        return arr
    }

    validateInputText = (evt, value) => {
        this.state[value] = evt.target.value // set the value

        // Handle warnings for spaces
        this.state.warnings = /\s/.test(evt.target.value) ?
            this.addToArray(value, 'warnings')
            :
            this.removeFromArray(value, 'warnings')
        this.setState(this.state)
    }

    validateAgeSexChoice = (evt, component) => {
        let toCheck = component === 'sex' ? 'other' : '35+'
        if (evt.target.value === toCheck) {
          this.state.warnings = this.addToArray(component, 'warnings')
          this.state[component] = ''
        } else {
          this.state.warnings = this.removeFromArray(component, 'warnings')
          this.state[component] = evt.target.value
        }

        this.setState(this.state)
    }

    validateLookingFor = (evt) => {
        this.state.lookingFor = evt.target.checked ?
            this.addToArray(evt.target.value, 'lookingFor')
            :
            this.removeFromArray(evt.target.value, 'lookingFor');
        this.setState(this.state);
    }

    checkDescription = (description) => {
        // Use datamuse dictionary api to check if description
        // is three syllables
        fetch(`http://api.datamuse.com/words?sp=${description}&qe=sp&md=s&max=1`)
            .then(response => response.json())
            .then(function (responseData) {

                this.state.canCount = responseData.length && responseData[0].numSyllables == 3;
                this.setState(this.state)
              }.bind(this))
    }

    checkMissing = () => {
        // Return true if not all values are filled out
        // minus warnings and canCount
        return Object.values(this.state).filter(
            function (val) {return val && val.length}
        ).length < Object.values(this.state).length - 3
    }

    validateProfile = (evt, props) => {
        evt.preventDefault()
        if (this.state.warnings.length || this.checkMissing()) {
          alert('You have invalid or empty values in your profile!')
        } else {
          this.state.form_complete = true
          this.setState(this.state)
          this.checkDescription(this.state.description)
          this.props.submitForm(this.state)
        }
    }

    render () {
        return (
            <div id='profile-form'
                 className='w3-card-4 w3-round w3-white w3-center w3-margin w3-padding'
            >
                <h3>Make Your Profile!</h3>
                <form className='profileForm'>
                    <InputField
                        name='username'
                        label='Username'
                        value={ this.state.username }
                        validateInputText={ this.validateInputText }
                        display={ this.existsInArray('username', 'warnings') ? 'block' : 'none' }
                        warning='No spaces in usernames!'
                     />
                    <AgeField
                        ageOpts={ this.props.ageOpts }
                        validateAgeChoice={ this.validateAgeSexChoice }
                        display={ this.existsInArray('age', 'warnings') ? 'block' : 'none' }
                        warning='Ew. No one wants to think about old people dating. Go away.'
                    />
                    <SexField
                        sexOpts={ this.props.sexOpts }
                        validateSexChoice={ this.validateAgeSexChoice }
                        display={ this.existsInArray('sex', 'warnings') ? 'block' : 'none' }
                        whichChecked={ this.state.sex }
                        warning={'Unfortunately, the only joke I have ' +
                            'depends on binary sex choice. Sorry. :('
                        }
                    />
                    <InputField
                        name='description'
                        label='Describe yourself using one three-syllable word'
                        value={ this.state.description }
                        validateInputText={ this.validateInputText }
                        display={ this.existsInArray('description', 'warnings') ? 'block' : 'none' }
                        warning='Just one word!'
                    />
                    <LookingFor
                        lookingFor={ this.props.lookingFor }
                        validateLookingFor={ this.validateLookingFor }
                        whichChecked={ this.state.lookingFor.slice() }
                    />
                    <input
                        type='submit'
                        className='w3-margin w3-button w3-border'
                        value='Make My Profile!'
                        onClick={ this.validateProfile }
                    />
                </form>
                { this.state.form_complete ? <Redirect to='/profile'/> : '' }
            </div>
        );
    }
}
