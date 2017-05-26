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
import { Profile } from './components/profile';
import { Users } from './components/users';


let Application = createReactClass({

    propTypes: {
        userProfile: PropTypes.shape({
            username: PropTypes.string.isRequired,
            age: PropTypes.string.isRequired,
            sex: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            lookingFor: PropTypes.arrayOf(PropTypes.string).isRequired,
          }),
      },

    getInitialState: function () {
        // return {
        //     userProfile: {
        //         username: null,
        //         age: null,
        //         sex: null,
        //         description: null,
        //         lookingFor: [],
        //         canCount: null,
        //       },
        //   };
        return {
            userProfile: {
                username: 'test',
                age: '18',
                sex: 'female',
                description: 'Animal',
                lookingFor: ['Long Term'],
                canCount: true,
            }
        }
      },

    render: function () {
        return (
            <div>
                <Header has_profile={ this.state.userProfile.username }/>
                <div className='w3-content main-content'>
                    <Route
                        exact path="/"
                        render={ () => <ProfileForm submitForm={ this.makeProfile }/> }
                    />
                    <Route
                        path="/profile"
                        render={ () => <Profile userProfile={ this.state.userProfile } />}
                    />
                    <Route
                        path="/mail"
                        render={ () => <Mailbox gender={ this.state.userProfile.sex } /> }
                    />
                    <Route path="/users" component={ Users }/>
                </div>
            </div>
        );
      },
    /* Application methods */

    makeProfile: function (profileObj) {
        this.state.userProfile.username = profileObj.username;
        this.state.userProfile.age = profileObj.age;
        this.state.userProfile.sex = profileObj.sex;
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
