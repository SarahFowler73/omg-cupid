import React from 'react'
import { render } from 'react-dom'
import OMGCupid from './src/containers/OMGCupid'

render((
    <Router>
        <OMGCupid />
    </Router>
), document.getElementById('container'));
