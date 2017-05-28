import React from 'react';
import { Route, Link, Redirect } from 'react-router-dom';

var users = ['hey', 'ho'];

function MessageList(props) {
    return (
        <ul>
            <label>{ props.label }</label>
            {
                props.displayMessages
                ?
                props.messages.map( (message, i) => <li key={i}><span>To: {users[i]}</span> { message }</li>)
                :
                <li>Nothing here!</li>
            }
        </ul>
    );
}

export function Mailbox(props) {
    return (
        <div>
            <Link to='/mail/inbox'>Received</Link>
            <Link to='/mail/outbox'>Sent</Link>
            <Route path='/mail' render={ () => <Redirect to='/mail/inbox'/> } />

            <Route
                path='/mail/outbox'
                render={ () =>
                    <MessageList
                        label="Sent"
                        displayMessages={ props.gender === 'male' }
                        messages={ props.messages }
                    />
                }
            />
            <Route
                path='/mail/inbox'
                render={ () =>
                    <MessageList
                        label="Received"
                        displayMessages={ props.gender === 'female' }
                        messages={ props.messages }
                    />
                }
            />

        </div>
    );
}
