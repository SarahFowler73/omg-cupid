const QUOTES = [
    "A date in the hand is worth two in the bush.",
    "I'm a traditionalist; on a first date, Satan pays.",
    "I like grapes."
]
const AUTHORS = ["Albert Einstein", "George Washington", "Oprah"]

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

let userProfile = {
    username: "",
    ageChoice: 0,
    sexChoice: 0,
    description: "",
    lookingFor: [],
}

function randomElem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function Header(props) {
    return (
    <div>
      <h1>Welcome to OmgCupid!</h1>
      <p><em>{props.quote}</em></p> <p>-- {props.author}</p>
    </div>
    );
}

Header.propTypes = {
    quote: React.PropTypes.string.isRequired,
    author: React.PropTypes.string.isRequired
}

function RadioButton(props) {
    return (
        <label>
            <input type="radio" name={props.button.name} value={props.button.value}/>
            {props.button.label}
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
        <form className="profileForm">
          {/* Form title */}
          <div className="form-group">
            <h2>Make Your Profile!</h2>
          </div>
          {/* Username */}
          <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input id="username" type="text"/>
          </div>
          {/* Age group selection */}
          <div className="form-group">
              <label htmlFor="age">Age: </label>
              <select id="age">
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
            <input type="text" id="description" /> {/*http://api.datamuse.com/words?sp=hello&qe=sp&md=s&max=1*/}
          </div>
          {/* Looking For Checkboxes */}
          <div className="form-group">
            <label>Looking for: </label>
            {props.lookingFor.map(function(box, i){
                return <label key={i}>{box}: <input type="checkbox" name="looking-for" /></label>
            })}
          </div>

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
}

let Application = React.createClass({

    propTypes: {
        quote: React.PropTypes.string,
        author: React.PropTypes.string,
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
    },

    getDefaultProps: function(){
        return {
            quote: randomElem(QUOTES),
            author: randomElem(AUTHORS),
            ageOpts: AGE_CHOICES,
            sexOpts: SEX_CHOICES,
            lookingFor: LOOKING_FOR
        }
    },

    getInitialState: function() {
        return {
            userProfile: this.props.userProfile
        }
    },

    render: function() {
        return (
          <div>
              <Header quote={this.props.quote} author={this.props.author}/>
              <ProfileForm
                  ageOpts={this.props.ageOpts}
                  sexOpts={this.props.sexOpts}
                  lookingFor={this.props.lookingFor}
                  userProfile={this.state.userProfile}
              />
          </div>
        );
    }
})


ReactDOM.render(<Application userProfile={userProfile}/>, document.getElementById('container'));
