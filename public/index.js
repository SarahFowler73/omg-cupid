// Libs
import React from 'react';
import { render } from 'react-dom';
import { HashRouter  as Router, Route } from 'react-router-dom';

import Application from './components/app';
import { Mailbox } from './components/mailbox';

render((
    <Router>
        <div>
            <Route exact path="/" component={Application}/>
            <Route path="/mail" component={Mailbox}/>
        </div>
    </Router>
), document.getElementById('container'));
