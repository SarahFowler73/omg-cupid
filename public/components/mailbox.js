import React from 'react';
import { Route, Link } from 'react-router-dom';

var users = ['hey', 'ho'];

export function Mailbox(props) {
    return (
        <div>
            <Link to='/mail/outbox'>Sent</Link>
            <Link to='/mail/inbox'>Received</Link>
            <Route
                path='/mail/outbox'
                render={ () =>
                    <ul>
                        <label>Sent</label>
                        {
                            props.gender === 'male'
                            ?
                            props.messages.map( (message, i) => <li key={i}><span>To: {users[i]}</span> { message }</li>)
                            :
                            <li>Nothing here!</li>
                        }
                    </ul>
                }
            />
            <Route
                path='/mail/inbox'
                render={ () =>
                    <ul>
                        <label>Received</label>
                        {
                            props.gender === 'female'
                            ?
                            props.messages.map( (message, i) => <li key={i}><span>To: {users[i]}</span> { message }</li>)
                            :
                            <li>Nothing here!</li>
                        }
                    </ul>
                }
            />

        </div>
    );
}
