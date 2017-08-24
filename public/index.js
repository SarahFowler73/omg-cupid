import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { render } from 'react-dom'
import OMGCupid from './src/containers/OMGCupid'

render((
    <Router>
        <OMGCupid />
    </Router>
), document.getElementById('container'));
