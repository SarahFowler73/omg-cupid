const QUOTES = [
    "A date in the hand is worth two in the bush.",
    "I'm a traditionalist; on a first date, Satan pays.",
    "I like grapes."
]
const AUTHORS = ["Albert Einstein", "George Washington", "Oprah"]

function randomElem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function Header(props) {
    return (
    <div>
      <h1>Welcome to OmgDating!</h1>
      <p><em>{props.quote}</em></p> <p>-- {props.author}</p>
    </div>
    );
}

Header.propTypes = {
    quote: React.PropTypes.string.isRequired,
    author: React.PropTypes.string.isRequired
}

function ProfileForm(props) {
    return (
        <form className="profileForm">
          <div className="form-group">
            <h2>Make Your Profile!</h2>
          </div>
          <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input id="username" type="text"/>
          </div>
          <div className="form-group">
              <label htmlFor="age">Age: </label>
              <select id="age">
                <option>figure out a for loop 18-35 plus arent you a little old to be dating
                </option>
              </select>
          </div>
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
          <div className="form-group">
            <label htmlFor="description">Describe yourself in 3 syllables: </label>
            <input type="text" id="description" value="Maybe check a dictionary to see how many syllables the thing is"/>
          </div>
          <div className="form-group">
            <label>Looking for: </label>
            <div></div>
          </div>
        </form>
    );
}


function Application(props) {
  return (
    <div>
        <Header quote={props.quote} author={props.author}/>
        <ProfileForm />
    </div>
  );
}

Application.propTypes = {
    quote: React.PropTypes.string,
    author: React.PropTypes.string
}

Application.defaultProps = {
    quote: randomElem(QUOTES),
    author: randomElem(AUTHORS)
}

ReactDOM.render(<Application />, document.getElementById('container'));
