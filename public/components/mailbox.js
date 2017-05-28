import React from 'react';

var users = ['hey', 'ho'];

export function Mailbox(props) {
    return (
        <div>
            <ul>
                <label>Sent</label>
                {
                    props.gender === 'male'
                    ?
                    props.messages.map( (message, i) => <li><span>To: {users[i]}</span> { message }</li>)
                    :
                    <li>Nothing here!</li>
                }
            </ul>
            <ul>
                <label>Received</label>
                {
                    props.gender === 'female'
                    ?
                    props.messages.map( (message, i) => <li><span>To: {users[i]}</span> { message }</li>)
                    :
                    <li>Nothing here!</li>
                }
            </ul>
        </div>
    );
}
