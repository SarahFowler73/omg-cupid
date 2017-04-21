// Libs
var React = require('react');
var ReactDOM = require('react-dom');
var PropTypes = require('prop-types');
var createReactClass = require('create-react-class');

import { Header } from './components/header';
import ProfileForm from './components/profile-form';

const AGE_CHOICES = ['Pick one:', '18-24', '25-29', '30-34', '35+'];

const SEX_CHOICES = ['Male', 'Female', 'Other'];

const LOOKING_FOR = ['Long Term', 'Short Term', 'One Night', 'One Minute'];

function randomElem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

let Application = createReactClass({

    propTypes: {
        userProfile: PropTypes.shape({
            username: PropTypes.string.isRequired,
            ageChoice: PropTypes.string.isRequired,
            sexChoice: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            lookingFor: PropTypes.arrayOf(PropTypes.string).isRequired,
          }),
      },

    getInitialState: function () {
        return {
            userProfile: {
                username: null,
                ageChoice: null,
                sexChoice: null,
                description: null,
                lookingFor: [],
                canCount: null,
              },
          };
      },

    render: function () {
        return (
          <div>
              <Header />
              <ProfileForm submitForm={this.makeProfile}/>
          </div>
        );
      },

    /* Application methods */

    makeProfile: function (profileObj) {
        this.state.userProfile.username = profileObj.username;
        this.state.userProfile.ageChoice = profileObj.age;
        this.state.userProfile.sexChoice = profileObj.sex;
        this.state.userProfile.description = profileObj.description;
        this.state.userProfile.lookingFor = profileObj.lookingFor;
        this.state.userProfile.canCount = profileObj.canCount;

        this.setState(this.state);
      },

  });

ReactDOM.render(<Application/>, document.getElementById('container'));
