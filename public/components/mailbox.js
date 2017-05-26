import React from 'react';

export function Mailbox(props) {
    return (<p>I am {props.gender === 'female' ? 'overflowing' : 'empty'}!</p>);
}
