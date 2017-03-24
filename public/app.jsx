const QUOTES = [
    "A date in the hand is worth two in the bush.",
    "I'm a traditionalist; on a first date, Satan pays.",
    "I like grapes."
]
const AUTHORS = ["Albert Einstein", "George Washington", "Oprah"]

const AGE_CHOICES = ["Pick one:", "18-24", "25-29", "30-34", "Really? You think this is dignified at your age?"]

const RADIO_CHOICES = [
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

function UserNameInput(){
    return (
        <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input id="username" type="text"/>
        </div>
    );
}

function AgeInput(props){
    return (
        <div className="form-group">
            <label htmlFor="age">Age: </label>
            <select id="age">
              {props.ageOpts.map(function(age, i) {
                  return <option key={i}>{age}</option>
              })}
            </select>
        </div>
    );
}

AgeInput.propTypes = {
    ageOpts: React.PropTypes.array.isRequired
}


function RadioButton(props) {
    return (
        <label>
            <input type="radio" name={props.name} value={props.value}/>
            {props.label}
        </label>
    );
}

RadioButton.propTypes = {
    name: React.PropTypes.string.isRequired,
    value: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired
}

function SexInput(props) {
    return (
        <div className="form-group">
            <label htmlFor="sex">Sex:</label>
            <div className="radio">
              {props.radio.map(function(button){
                return <RadioButton
                    key={button.id}
                    name={button.name}
                    value={button.value}
                    label={button.label} />
              })}
            </div>
        </div>
    );
}

SexInput.propTypes = {
    radio: React.PropTypes.arrayOf(
        React.PropTypes.shape({
            id: React.PropTypes.number.isRequired,
            name: React.PropTypes.string.isRequired,
            value: React.PropTypes.string.isRequired,
            label: React.PropTypes.string.isRequired
        })
    )
}


function DescriptionInput() {
    return (
        <div className="form-group">
          <label htmlFor="description">Describe yourself in 3 syllables: </label>
          <input type="text" id="description" value="Maybe check a dictionary to see how many syllables the thing is"/>
        </div>
    );
}

function LookingFor() {
    return (
        <div className="form-group">
          <label>Looking for: </label>
          <div></div>
        </div>
    );
}

function ProfileForm(props) {
    return (
        <form className="profileForm">
          <div className="form-group">
            <h2>Make Your Profile!</h2>
          </div>
          <UserNameInput />
          <AgeInput ageOpts={props.ageOpts} />
          <SexInput radio={props.radio}/>
          <DescriptionInput />
          <LookingFor />

        </form>
    );
}

let Application = React.createClass({

    propTypes: {
        quote: React.PropTypes.string,
        author: React.PropTypes.string,
        ageOpts: React.PropTypes.array,
        radio: React.PropTypes.arrayOf(
            React.PropTypes.shape({
                id: React.PropTypes.number.isRequired,
                name: React.PropTypes.string.isRequired,
                value: React.PropTypes.string.isRequired,
                label: React.PropTypes.string.isRequired
            })
        )
    },

    getDefaultProps: function(){
        return {
            quote: randomElem(QUOTES),
            author: randomElem(AUTHORS),
            ageOpts: AGE_CHOICES,
            radio: RADIO_CHOICES
        }
    },

    render: function() {
        return (
          <div>
              <Header quote={this.props.quote} author={this.props.author}/>
              <ProfileForm ageOpts={this.props.ageOpts} radio={this.props.radio} />
          </div>
        );
    }
})


ReactDOM.render(<Application />, document.getElementById('container'));
