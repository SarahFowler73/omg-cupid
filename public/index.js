// Libs
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Application from './components/app';

render((
    <Router>
        <Route path="/" component={Application}/>
    </Router>
), document.getElementById('container'));
