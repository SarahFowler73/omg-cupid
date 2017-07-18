import React from 'react';
import { Route, NavLink, Redirect } from 'react-router-dom';

const users = ['hey', 'ho'];

function MessageList(props) {
    return (
        <div className='clearfix'>
            <table className=' w3-table w3-bordered'>
                <thead>
                    <tr><th>{props.fromto}</th><th>Message</th></tr>
                </thead>
                <tbody>
                    {
                        props.displayMessages
                        ?
                        props.messages.map( (message, i) =>
                            <tr key={i}>
                                <td>{ props.users[i].username }</td>
                                <td>{ message }</td>
                            </tr>
                        )
                        :
                        <tr>
                            <td colSpan="2" className='w3-center'>
                                { props.nothingMessage }
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
}

export function Mailbox(props) {
    return (
        <div className='w3-card-2 w3-round w3-white w3-margin w3-padding'>
            <ul className="nav">
                <li><NavLink to='/mail/inbox' className='w3-bar-item w3-button w3-hide-small w3-padding-large hover-blue'>Your Messages</NavLink></li>
                <li><NavLink to='/mail/outbox' className='w3-bar-item w3-button w3-hide-small w3-padding-large hover-blue'>Sent Messages</NavLink></li>
            </ul>
            <Route path='/mail' render={ () => <Redirect to='/mail/inbox'/> } />

            <Route
                path='/mail/outbox'
                render={ () =>
                    <MessageList
                        fromto='From'
                        displayMessages={ props.gender === 'male' }
                        messages={ props.messages }
                        users={ props.users }
                        nothingMessage={ "You haven't sent any messages!" }
                    />
                }
            />
            <Route
                path='/mail/inbox'
                render={ () =>
                    <MessageList
                        fromto='To'
                        displayMessages={ props.gender === 'female' }
                        messages={ props.messages }
                        users={ props.users }
                        nothingMessage={ "You haven't gotten even ONE message? Um, maybe you should try giving up." }
                    />
                }
            />

        </div>
    );
}
