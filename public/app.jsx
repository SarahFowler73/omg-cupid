function Application() {
  return (
    <div>
        <div>
          <h1>Welcome to OmgDating.date!</h1>
          <p><em>rotating cute line about terrible people here</em> -- dumb name here</p>
        </div>
        <form>
          <h2>Make Your Profile!</h2>
          <label className="form-label">Username:
            <input type="text"/>
          </label>
          <label className="form-label">Age:
              <select>
                <option>figure out a for loop 18-35 plus arent you a little old to be dating
                </option>
              </select>
          </label>
          <label className="form-label">Sex:
            <input type="radio" name="sex" value="male"/> Male
            <input type="radio" name="sex" value="female"/> Female
            <input type="radio" name="sex" value="terrible"/> Yes, please! // pop up 'don't be one of those'
          </label>

        </form>
    </div>
  );
}

ReactDOM.render(<Application />, document.getElementById('container'));
