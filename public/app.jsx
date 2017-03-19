const QUOTES = [
    "A date in the hand is worth two in the bush.",
    "I'm a traditionalist; on a first date, Satan pays.",
    "I like grapes."
]
const AUTHORS = ["Albert Einstein", "George Washington", "Oprah"]

const AGE_CHOICES = ["Pick one:", "18-24", "25-29", "30-34", "Really? You think this is dignified at your age?"]


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
              {props.ageOpts.map(function(age) {
                  return <option>{age}</option>
              })}
            </select>
        </div>
    );
}

AgeInput.propTypes = {
    ageOpts: React.PropTypes.array.isRequired
}

function SexInput() {
    /* todo: radio button component? */
    return (
        <div className="form-group">
            <label htmlFor="sex">Sex:</label>
            <div className="radio">

              <label>
                  <input type="radio" name="sex" value="male"/>
                  Male
              </label>
              <label>
                  <input type="radio" name="sex" value="female"/>
                  Female
              </label>
              <label>
                  <input type="radio" name="sex" value="terrible"/>
                  Yes, please! // pop up 'don't be one of those'
              </label>
            </div>
        </div>
    );
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
          <SexInput />
          <DescriptionInput />
          <LookingFor />

        </form>
    );
}


function Application(props) {
  return (
    <div>
        <Header quote={props.quote} author={props.author}/>
        <ProfileForm ageOpts={props.ageOpts} />
    </div>
  );
}

Application.propTypes = {
    quote: React.PropTypes.string,
    author: React.PropTypes.string,
    ageOpts: React.PropTypes.array
    /* how_to_array_obj: React.PropTypes.arrayOf(
        React.PropTypes.shape({
            obj_key: React.PropTypes.string.isRequired
        }))
    )*/
}

Application.defaultProps = {
    quote: randomElem(QUOTES),
    author: randomElem(AUTHORS),
    ageOpts: AGE_CHOICES
}




ReactDOM.render(<Application />, document.getElementById('container'));
