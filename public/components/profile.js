import React from 'react';

export function Profile (props) {
    return (
        <div>
            <p>{props.userProfile.username}</p>
            <p>{props.userProfile.age}</p>
            <p>{props.userProfile.sex}</p>
            <p>{props.userProfile.description}</p>

            {props.userProfile.lookingFor.map( (val, i) => <p key={i}>{val}</p> )

            }
            <p>{props.userProfile.canCount ? 'Can Count' : 'Cannot Count'}</p>

        </div>);
}
