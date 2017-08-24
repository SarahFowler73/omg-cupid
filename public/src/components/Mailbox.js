import React from 'react';
import { Route, NavLink, Redirect } from 'react-router-dom';


const MessageList = (props) => {
    return (
        <div>
            {props.showWeb ? <img src='/assets/web.png'/> : ''}
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
        </div>
    );
}

export const Mailbox = (props) => {
    return (
        <div id='mailbox' className='w3-card-4 w3-round w3-white w3-margin w3-padding'>

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
                        showWeb={ false }
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
                        nothingMessage={ "Nothing Here! (Yes, you will die alone.)" }
                        showWeb={ props.gender === 'male' }
                    />
                }
            />

        </div>
    );
}
