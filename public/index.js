// Libs
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';

// Components
import ProfileForm from './components/profile-form';
import { Mailbox } from './components/mailbox';
import { Header } from './components/header';


function Profile (props) {
    return (<p>I am a profile!</p>);
}

function Users (props) {
    return (<p>I am all the users!</p>);
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
                <div className='w3-content main-content'>
                    <Route
                        exact path="/"
                        render={ () => <ProfileForm submitForm={this.makeProfile}/> }
                    />
                    <Route path="/mail" component={ Mailbox }/>
                    <Route path="/profile" component={ Profile }/>
                    <Route path="/users" component={ Users }/>
                </div>
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

render((
    <Router>
        <Application />
    </Router>
), document.getElementById('container'));
