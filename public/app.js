// Libs
import React from 'react';
import { render } from 'react-dom';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';

import { Router, Route } from 'react-router';

// Components
import { Header } from './components/header';
import ProfileForm from './components/profile-form';

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

render(<Application/>, document.getElementById('container'));
