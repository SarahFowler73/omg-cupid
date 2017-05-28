import React from 'react';
import { Route, NavLink, Redirect } from 'react-router-dom';

const users = ['hey', 'ho'];

function MessageList(props) {
    return (
        <ul>
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
            <ul className="nav">
                <li><NavLink to='/mail/inbox' className='w3-bar-item w3-button w3-hide-small w3-padding-large hover-blue'>Your Messages</NavLink></li>
                <li><NavLink to='/mail/outbox' className='w3-bar-item w3-button w3-hide-small w3-padding-large hover-blue'>Sent Messages</NavLink></li>
            </ul>
            <Route path='/mail' render={ () => <Redirect to='/mail/inbox'/> } />

            <Route
                path='/mail/outbox'
                render={ () =>
                    <MessageList
                        displayMessages={ props.gender === 'male' }
                        messages={ props.messages }
                    />
                }
            />
            <Route
                path='/mail/inbox'
                render={ () =>
                    <MessageList
                        displayMessages={ props.gender === 'female' }
                        messages={ props.messages }
                    />
                }
            />

        </div>
    );
}
