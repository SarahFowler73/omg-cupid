const AGE_CHOICES = ["Pick one:", "18-24", "25-29", "30-34", "Really? You think this is dignified at your age?"]

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
        value: 'terrible',
        name: 'sex',
        label: 'Yes, please!'
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
            <input type="radio" name={props.button.name} value={props.button.value}/>
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

function ProfileForm(props) {
    return (
        <form className="profileForm w3-card-2 w3-round w3-white">
          {/* Form title */}
          <div className="form-group">
            <h2>Make Your Profile!</h2>
          </div>
          {/* Username */}
          <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input id="username" type="text" onBlur={function(evt){props.setValue(evt, 'username')}}/>
          </div>
          {/* Age group selection */}
          <div className="form-group">
              <label htmlFor="age">Age: </label>
              <select id="age" onChange={function(evt){props.setValue(evt, 'ageChoice')}}>
                {props.ageOpts.map(function(age, i) {
                    return <option key={i}>{age}</option>
                })}
              </select>
          </div>
          {/* Sex selection */}
          <div className="form-group">
              <label htmlFor="sex">Sex:</label>
              <div className="radio">
                {props.sexOpts.map(function(button){
                  return <RadioButton key={button.id} button={button} />
                })}
              </div>
          </div>
          {/* Description */}
          <div className="form-group">
            <label htmlFor="description">Describe yourself in 3 syllables: </label>
            <input type="text" id="description" onBlur={function(evt){props.checkDescription(evt)}}/>
          </div>
          {/* Looking For Checkboxes */}
          <div className="form-group">
            <label>Looking for: </label>
            {props.lookingFor.map(function(box, i){
                return <label key={i}>{box}: <input type="checkbox" name="looking-for" value={i} onChange={function(evt){props.setChoices(evt, 'lookingFor')}} /></label>
            })}
          </div>
          <button type='submit' className="w3-margin">Make My Profile!</button>
        </form>
    );
}

ProfileForm.PropTypes = {
    ageOpts: React.PropTypes.array.isRequired,
    sexOpts: React.PropTypes.arrayOf(
        React.PropTypes.shape({
            id: React.PropTypes.number.isRequired,
            name: React.PropTypes.string.isRequired,
            value: React.PropTypes.string.isRequired,
            label: React.PropTypes.string.isRequired
        })
    ).isRequired,
    lookingFor: React.PropTypes.array.isRequired,
    setValue: React.PropTypes.func.isRequired,
    setChoices: React.PropTypes.func.isRequired,
    checkDescription: React.PropTypes.func.isRequired
}

let Application = React.createClass({

    propTypes: {
        ageOpts: React.PropTypes.array,
        sexOpts: React.PropTypes.arrayOf(
            React.PropTypes.shape({
                id: React.PropTypes.number.isRequired,
                name: React.PropTypes.string.isRequired,
                value: React.PropTypes.string.isRequired,
                label: React.PropTypes.string.isRequired
            })
        ),
        lookingFor: React.PropTypes.array,
        userProfile: React.PropTypes.shape({
            username: React.PropTypes.string.isRequired,
            ageChoice: React.PropTypes.string.isRequired,
            sexChoice: React.PropTypes.string.isRequired,
            description: React.PropTypes.string.isRequired,
            lookingFor: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
        })
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
            userProfile: {
                username: "",
                ageChoice: "",
                sexChoice: "",
                description: "",
                lookingFor: [],
            }
        }
    },

    render: function() {
        return (
          <div>
              <Header />
              <ProfileForm
                  ageOpts={this.props.ageOpts}
                  sexOpts={this.props.sexOpts}
                  lookingFor={this.props.lookingFor}
                  userProfile={this.state.userProfile}
                  setValue={this.setValue}
                  setChoices={this.setChoices}
                  checkDescription={this.checkDescription}
              />
          </div>
        );
    },

    /* Application methods */
    setValue: function(event, field) {
        this.state.userProfile[field] = event.target.value;
        this.setState(this.state);
    },

    setChoices: function(choices, field) {
        this.state.userProfile[field] = choices.length > 1 ? choices : choices[0];
        this.setState(this.state);
    },

    checkDescription: function (event) {
        /*http://api.datamuse.com/words?sp=hello&qe=sp&md=s&max=1*/
        let numSyls = 3;
        if (numSyls == 3) {
            alert('Nice job! We\'ll add "can count" to your profile!');
            this.setValue(event, 'description');
        } else
            alert("Uh. That's not three syllables.");
    }

})


ReactDOM.render(<Application/>, document.getElementById('container'));
