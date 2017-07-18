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

// Data
import * as Mail from './data/mail.json';
import * as ProfileSeeds from './data/profile-seeds.json';
import * as ProfileQuotes from './data/profile-quotes.json'
import { AGE_CHOICES, SEX_CHOICES, LOOKING_FOR } from './data/profile-inputs'

function getRandomArrayElem (arr){
    return arr[Math.floor(Math.random() * arr.length)]
}

const Application = createReactClass({

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
        //      },
        //      users: []
        //  };
        return {
            userProfile: {
                username: 'test',
                age: '18',
                sex: 'male',
                description: 'Animal',
                lookingFor: ['Long Term'],
                canCount: true,
            },
            users: this.generateUsers('male')
        }
    },

    /* Render App Components with Routes */

    render: function () {
        return (
            <div>
                <Header has_profile={ this.state.userProfile.username }/>
                <div className='w3-content main-content'>
                    <Route
                        exact path="/"
                        render={ () =>
                            <ProfileForm
                                submitForm={ this.makeProfile }
                                ageOpts={ AGE_CHOICES }
                                sexOpts={ SEX_CHOICES }
                                lookingFor={ LOOKING_FOR }
                            />
                        }
                    />
                    <Route
                        path="/profile"
                        render={ () =>
                            <Profile userProfile={ this.state.userProfile } />
                        }
                    />
                    <Route
                        path="/mail"
                        render={ () =>
                            <Mailbox
                                gender={ this.state.userProfile.sex }
                                messages={ Mail[this.state.userProfile.sex].messages }
                                users={ this.state.users }
                            />
                        }
                    />
                    <Route
                        path="/users"
                        render={ () =>
                            <Users
                                users={ this.state.users }
                            />
                        }
                    />
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

        this.state.users = this.generateUsers(profileObj.sex);
        this.setState(this.state);
    },

    generateUsers: function(oppSex) {
        let users = []
        let userGender = oppSex === 'male' ? 'female' : 'male'
        let profileSeeds = ProfileSeeds[userGender]

        for (let i = 0; i < 20; i++) {
            users.push({
                "username":
                    getRandomArrayElem(profileSeeds.userStart) +
                    getRandomArrayElem(profileSeeds.userMid) +
                    getRandomArrayElem(profileSeeds.userEnd),
                "age": AGE_CHOICES[getRandomArrayElem([1,2,3])],
                "quote": getRandomArrayElem(ProfileQuotes.quotes),
                "lookingFor": []
            })
        }
        return users;
    },
});

render((
    <Router>
        <Application />
    </Router>
), document.getElementById('container'));
