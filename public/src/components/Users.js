import React from 'react';

export const Users = (props) => {
    return (
        <div className="w3-content">
            {
                props.users.map( (user, i) =>
                    <div key={i} className='w3-card-4 w3-round w3-white w3-margin w3-padding'>
                        <ul>
                            <li>{ user.username }</li>
                            <li>{ user.age }</li>
                            <li>{ user.quote }</li>
                        </ul>
                    </div>
                )
            }
        </div>
    );
}
