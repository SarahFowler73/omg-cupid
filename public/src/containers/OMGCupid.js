// Libs
import React, { Component } from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

// Components
import ProfileForm from '../components/ProfileForm'
import { Mailbox } from '../components/Mailbox'
import { Header } from '../components/Header'
import { Profile } from '../components/Profile'
import { Users } from '../components/Users'

// Data
import * as Mail from '../../data/mail.json';
import * as ProfileSeeds from '../../data/profile-seeds.json';
import * as ProfileQuotes from '../../data/profile-quotes.json'
import { AGE_CHOICES, SEX_CHOICES, LOOKING_FOR } from '../../data/profile-inputs'

const getRandomArrayElem = (arr) => {
    return arr[Math.floor(Math.random() * arr.length)]
}

const RouteOrRedirectHome = (props) => {
    return (
        <Route
            path={ props.path }
            render={ () =>
                props.noRedirectCondition ? (props.component) : (<Redirect to={{ pathname: '/' }} />)
            }
        />
    )
}

export default class OMGCupid extends Component {

    static propTypes = {
        userProfile: PropTypes.shape({
            username: PropTypes.string.isRequired,
            age: PropTypes.string.isRequired,
            sex: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            lookingFor: PropTypes.arrayOf(PropTypes.string).isRequired,
        }),
    }

    state = {
        userProfile: {
            username: null,
            age: null,
            sex: null,
            description: null,
            lookingFor: [],
            canCount: null,
         },
         users: []
    }

    /* Render App Components with Routes */

    render() {
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
                    <RouteOrRedirectHome
                        path="/profile"
                        noRedirectCondition={ this.state.userProfile.username }
                        component={ <Profile userProfile={ this.state.userProfile } /> }
                    />
                    <RouteOrRedirectHome
                        path="/mail"
                        noRedirectCondition={ this.state.userProfile.username }
                        component={
                            <Mailbox
                                gender={ this.state.userProfile.sex }
                                messages={ this.state.userProfile.sex ? Mail[this.state.userProfile.sex].messages : [] }
                                users={ this.state.users }
                            />
                        }
                    />
                    <RouteOrRedirectHome
                        path="/users"
                        noRedirectCondition={ this.state.userProfile.username }
                        component={ <Users users={ this.state.users } /> }
                    />
                </div>
            </div>
        );
      }

    /* Application methods */

    makeProfile = (profileObj) => {
        // Set userProfile properties from form
        let properties = ['username', 'age', 'sex', 'description', 'lookingFor', 'canCount']
        properties.map((p) => this.state.userProfile[p] = profileObj[p])

        this.state.users = this.generateUsers(profileObj.sex)
        this.setState(this.state)
    }

    generateUsers = (oppSex) => {
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
        return users
    }
}
