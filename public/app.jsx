const AGE_CHOICES = ["Pick one:", "18-24", "25-29", "30-34", "35+"]

const SEX_CHOICES = [
    {
        id: 1,
        value: 'male',
        name: 'sex',
        label: 'Male'
    },
    {
        id: 2,
        value: 'female',
        name: 'sex',
        label: 'Female'
    },
    {
        id: 3,
        value: 'other',
        name: 'sex',
        label: 'Other'
    },
]

const LOOKING_FOR = ["Long Term", "Short Term", "One Night", "One Minute"]

function randomElem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function Header(props) {
    return (
    <div className="w3-padding w3-block w3-theme-l1 w3-left-align">
      <h1>Welcome to OmgCupid!</h1>
      <p><em>A simulated dating experience!</em></p>
    </div>
    );
}

function RadioButton(props) {
    return (
        <label>
            <input type="radio" name={props.button.name} value={props.button.value} checked={props.checked}/>
            {" " + props.button.label}
        </label>
    );
}

RadioButton.propTypes = {
    button: React.PropTypes.shape({
        id: React.PropTypes.number.isRequired,
        name: React.PropTypes.string.isRequired,
        value: React.PropTypes.string.isRequired,
        label: React.PropTypes.string.isRequired
    })
}

function InputField(props) {
    return (
        <div className="form-group">
            <label htmlFor={props.name}>{props.label}:</label>
            <div className="popup">
                <input
                    id={props.name}
                    type="text"
                    value={props.value}
                    onChange={function(evt){props.validateInputText(evt, props.name)}}
                />
                <span className="popuptext" style={{display: props.display}}>
                    {props.warning}
                </span>
            </div>
        </div>
    );
}

InputField.propTypes = {
    name: React.PropTypes.string.isRequired,
    value: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
    validateInputText: React.PropTypes.func.isRequired,
    display: React.PropTypes.string.isRequired,
    warning: React.PropTypes.string.isRequired,
}

function AgeField(props) {
    return (
        <div className="form-group">
            <label htmlFor="age">Age: </label>
            <div className="popup">
                <select id="age" onChange={function(evt){props.validateAgeChoice(evt, 'age')}}>
                    {props.ageOpts.map(function(age, i) {
                        return i === 0 ?
                             <option key={i} value={age} selected disabled>{age}</option>
                            :
                             <option key={i} value={age}>{age}</option>

                    })}

                </select>
                <span className="popuptext" style={{display: props.display}}>{props.warning}</span>
            </div>
        </div>
    );
}

function SexField(props) {
    return (
        <div className="form-group">
            <label htmlFor="sex">Sex:</label>

            <div className="radio popup" onChange={function(evt){props.validateSexChoice(evt, 'sex')}}>
              {props.sexOpts.map(function(button){
                return <RadioButton
                    key={button.id}
                    button={button}
                    checked={props.whichChecked == button.value ? "checked" : ""}/>
            })}
              <span className="popuptext" style={{display: props.display}}>{props.warning}</span>
            </div>
        </div>
    );
}

SexField.propTypes = {
    sexOpts: React.PropTypes.arrayOf(
        React.PropTypes.shape({
            id: React.PropTypes.number.isRequired,
            name: React.PropTypes.string.isRequired,
            value: React.PropTypes.string.isRequired,
            label: React.PropTypes.string.isRequired
        })
    ).isRequired,
    validateSexChoice: React.PropTypes.func.isRequired,
    display: React.PropTypes.string.isRequired,
    whichChecked: React.PropTypes.string.isRequired
}

function LookingFor(props) {
    return (
        <div className="form-group">
        <label>Looking for: </label>
        {props.lookingFor.map(function(box, i){
            return <label key={i}>{box}:
                <input
                    type="checkbox"
                    name="lookingFor"
                    value={i}
                    onChange={function(evt){props.validateLookingFor(evt)}}
                    checked={props.whichChecked.indexOf(String(i)) > -1 ? 'checked' : ''}
                />
            </label>
        })}
        </div>
    );
}

LookingFor.propTypes = {
    lookingFor: React.PropTypes.array.isRequired,
    validateLookingFor: React.PropTypes.func.isRequired,
    whichChecked: React.PropTypes.array.isRequired
}

let ProfileForm = React.createClass({

    propTypes: {
        ageOpts: React.PropTypes.array.isRequired,
        sexOpts: React.PropTypes.arrayOf(
            React.PropTypes.shape({
                id: React.PropTypes.number.isRequired,
                name: React.PropTypes.string.isRequired,
                value: React.PropTypes.string.isRequired,
                label: React.PropTypes.string.isRequired
            })
        ).isRequired,
        lookingFor: React.PropTypes.array.isRequired
    },

    getDefaultProps: function(){
        return {
            ageOpts: AGE_CHOICES,
            sexOpts: SEX_CHOICES,
            lookingFor: LOOKING_FOR
        }
    },

    getInitialState: function() {
        return {
            username: "",
            age: "",
            sex: "",
            description: "",
            lookingFor: [],
            canCount: false,
            warnings: []
        }
    },

    existsInArray: function(value, stateArrayKey) {
        return this.state[stateArrayKey].filter(function (val) {return val == value}).length;
    },

    addToArray: function(value, stateArrayKey) {
        let arr = this.state[stateArrayKey].slice();
        if (!this.existsInArray(value, stateArrayKey))
            arr.push(value);
        return arr;
    },

    removeFromArray: function(value, stateArrayKey) {
        let arr = this.state[stateArrayKey].slice();
        if (this.existsInArray(value, stateArrayKey))
            arr.splice(arr.indexOf(value), 1);
        return arr;
    },

    validateInputText: function(evt, value){
        this.state[value] = evt.target.value; /* set the value */

        /* Handle warnings for spaces */
        this.state.warnings = /\s/.test(evt.target.value)
            ?
            this.addToArray(value, 'warnings')
            :
            this.removeFromArray(value, 'warnings');
        this.setState(this.state);
    },

    validateAgeSexChoice: function(evt, component) {
        let toCheck = component === 'sex' ? 'other' : '35+'
        if (evt.target.value === toCheck) {
            this.state.warnings = this.addToArray(component, 'warnings');
            this.state[component] = "";
        } else {
            this.state.warnings = this.removeFromArray(component, 'warnings');
            this.state[component] = evt.target.value;
        }
        this.setState(this.state);
    },

    validateLookingFor: function(evt) {
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
            }.bind(this))
    },

    checkMissing: function() {
        // Return true if not all values are filled out
        // minus warnings and canCount
        return Object.values(this.state).filter(
            function (val){return val && val.length}
        ).length < Object.values(this.state).length - 2;
    },

    onSubmit: function(evt) {
        evt.preventDefault();
        if (this.state.warnings.length || this.checkMissing()) {
            alert('no');
        } else {
            this.checkDescription(this.state.description);

        }
    },

    render: function() {
        return (
            <div id="profile-form" className="w3-card-2 w3-round w3-white w3-center w3-margin w3-padding">
                <h3>Make Your Profile!</h3>
                <form className="profileForm" onSubmit="">
                    <InputField
                        name="username"
                        label="Username"
                        value={this.state.username}
                        validateInputText={this.validateInputText}
                        display={this.existsInArray('username', 'warnings') ? "block" : "none"}
                        warning="No spaces in usernames!"
                     />
                    <AgeField
                        ageOpts={this.props.ageOpts}
                        validateAgeChoice={this.validateAgeSexChoice}
                        display={this.existsInArray('age', 'warnings') ? "block" : "none"}
                        warning={"Ew. No one wants to think about old people dating. Go away."}
                    />
                    <SexField
                        sexOpts={this.props.sexOpts}
                        validateSexChoice={this.validateAgeSexChoice}
                        display={this.existsInArray('sex', 'warnings') ? "block" : "none"}
                        whichChecked={this.state.sex}
                        warning={"Unfortunately, the only joke I have depends on binary sex choice. Sorry. :("}
                    />

                    <InputField
                        name="description"
                        label="Describe yourself using one three-syllable word"
                        value={this.state.description}
                        validateInputText={this.validateInputText}
                        display={this.existsInArray('description', 'warnings') ? "block" : "none"}
                        warning="Just one word!"
                    />
                    <LookingFor
                        lookingFor={this.props.lookingFor}
                        validateLookingFor={this.validateLookingFor}
                        whichChecked={this.state.lookingFor.slice()}
                    />
                    <input
                        type='submit'
                        className="w3-margin"
                        value="Make My Profile!"
                        onClick={this.onSubmit}
                    />
                </form>
            </div>
        );
    },


})


let Application = React.createClass({

    propTypes: {
        userProfile: React.PropTypes.shape({
            username: React.PropTypes.string.isRequired,
            ageChoice: React.PropTypes.string.isRequired,
            sexChoice: React.PropTypes.string.isRequired,
            description: React.PropTypes.string.isRequired,
            lookingFor: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
        })
    },

    getInitialState: function() {
        return {
            userProfile: {
                username: null,
                ageChoice: null,
                sexChoice: null,
                description: null,
                lookingFor: [],
                canCount: null
            }
        }
    },

    render: function() {
        return (
          <div>
              <Header />
              <ProfileForm />
          </div>
        );
    },

    /* Application methods */

})


ReactDOM.render(<Application/>, document.getElementById('container'));
