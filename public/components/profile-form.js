var React = require('react');
var createReactClass = require('create-react-class');
var PropTypes = require('prop-types');

import { RadioButton, InputField, AgeField, SexField, LookingFor } from './profile-fields';

const AGE_CHOICES = ['Pick one:', '18-24', '25-29', '30-34', '35+'];

const SEX_CHOICES = ['Male', 'Female', 'Other'];

const LOOKING_FOR = ['Long Term', 'Short Term', 'One Night', 'One Minute'];

let ProfileForm = createReactClass({

    propTypes: {
        ageOpts: PropTypes.array.isRequired,
        sexOpts: PropTypes.arrayOf(PropTypes.string).isRequired,
        lookingFor: PropTypes.array.isRequired,
        submitForm: PropTypes.func.isRequired,
      },

    getDefaultProps: function () {
        return {
            ageOpts: AGE_CHOICES,
            sexOpts: SEX_CHOICES,
            lookingFor: LOOKING_FOR,
          };
      },

    getInitialState: function () {
        return {
            username: '',
            age: '',
            sex: '',
            description: '',
            lookingFor: [],
            canCount: false,
            warnings: [],
          };
      },

    existsInArray: function (value, stateArrayKey) {
        return this.state[stateArrayKey].filter(
            function (val) {return val == value;}
        ).length;
      },

    addToArray: function (value, stateArrayKey) {
        let arr = this.state[stateArrayKey].slice();
        if (!this.existsInArray(value, stateArrayKey))
            arr.push(value);
        return arr;
      },

    removeFromArray: function (value, stateArrayKey) {
        let arr = this.state[stateArrayKey].slice();
        if (this.existsInArray(value, stateArrayKey))
            arr.splice(arr.indexOf(value), 1);
        return arr;
      },

    validateInputText: function (evt, value) {
        this.state[value] = evt.target.value; /* set the value */

        /* Handle warnings for spaces */
        this.state.warnings = /\s/.test(evt.target.value) ?
            this.addToArray(value, 'warnings')
            :
            this.removeFromArray(value, 'warnings');
        this.setState(this.state);
      },

    validateAgeSexChoice: function (evt, component) {
        let toCheck = component === 'sex' ? 'other' : '35+';
        if (evt.target.value === toCheck) {
          this.state.warnings = this.addToArray(component, 'warnings');
          this.state[component] = '';
        } else {
          this.state.warnings = this.removeFromArray(component, 'warnings');
          this.state[component] = evt.target.value;
        }

        this.setState(this.state);
      },

    validateLookingFor: function (evt) {
        this.state.lookingFor = evt.target.checked ?
            this.addToArray(evt.target.value, 'lookingFor')
            :
            this.removeFromArray(evt.target.value, 'lookingFor');
        this.setState(this.state);
      },

    checkDescription: function (description) {

        fetch(`http://api.datamuse.com/words?sp=${description}&qe=sp&md=s&max=1`)
            .then(response => response.json())
            .then(function (responseData) {

                this.state.canCount = responseData.length && responseData[0].numSyllables === 3;
                this.setState(this.state);
              }.bind(this));
      },

    checkMissing: function () {
        // Return true if not all values are filled out
        // minus warnings and canCount
        return Object.values(this.state).filter(
            function (val) {return val && val.length;}
        ).length < Object.values(this.state).length - 2;
      },

    validateProfile: function (evt, props) {
        evt.preventDefault();
        if (this.state.warnings.length || this.checkMissing()) {
          alert('You have invalid or empty values in your profile!');
        } else {
          this.checkDescription(this.state.description);
          this.props.submitForm(this.state);
        }

      },

    render: function () {
        return (
            <div id='profile-form'
                 className='w3-card-2 w3-round w3-white w3-center w3-margin w3-padding'
            >
                <h3>Make Your Profile!</h3>
                <form className='profileForm'>
                    <InputField
                        name='username'
                        label='Username'
                        value={this.state.username}
                        validateInputText={this.validateInputText}
                        display={this.existsInArray('username', 'warnings') ? 'block' : 'none'}
                        warning='No spaces in usernames!'
                     />
                    <AgeField
                        ageOpts={this.props.ageOpts}
                        validateAgeChoice={this.validateAgeSexChoice}
                        display={this.existsInArray('age', 'warnings') ? 'block' : 'none'}
                        warning={'Ew. No one wants to think about old people dating. Go away.'}
                    />
                    <SexField
                        sexOpts={this.props.sexOpts}
                        validateSexChoice={this.validateAgeSexChoice}
                        display={this.existsInArray('sex', 'warnings') ? 'block' : 'none'}
                        whichChecked={this.state.sex}
                        warning={'Unfortunately, the only joke I have ' +
                            'depends on binary sex choice. Sorry. :('
                        }
                    />

                    <InputField
                        name='description'
                        label='Describe yourself using one three-syllable word'
                        value={this.state.description}
                        validateInputText={this.validateInputText}
                        display={this.existsInArray('description', 'warnings') ? 'block' : 'none'}
                        warning='Just one word!'
                    />
                    <LookingFor
                        lookingFor={this.props.lookingFor}
                        validateLookingFor={this.validateLookingFor}
                        whichChecked={this.state.lookingFor.slice()}
                    />
                    <input
                        type='submit'
                        className='w3-margin'
                        value='Make My Profile!'
                        onClick={this.validateProfile}
                    />
                </form>
            </div>
        );
      },
  });

export default ProfileForm;
