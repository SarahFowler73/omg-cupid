// Libs
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Application from './components/app';
import ProfileForm from './components/profile-form';
import { Mailbox } from './components/mailbox';
import { Header } from './components/header';

function Profile (props) {
    return (<p>I am a profile!</p>);
}

function Users (props) {
    return (<p>I am all the users!</p>);
}

render((
    <Router>
        <div>
            <Header />
            <div className='w3-content main-content'>
                <Route exact path="/" component={ Application }/>
                <Route path="/mail" component={ Mailbox }/>
                <Route path="/profile" component={ Profile }/>
                <Route path="/users" component={ Users }/>
            </div>
        </div>
    </Router>
), document.getElementById('container'));
