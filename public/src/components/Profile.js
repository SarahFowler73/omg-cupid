import React from 'react';

const ProfileHeader = (props) => {
    return (
        <div className="w3-bar w3-center">
            <h2><img className='avatar' src={ '/assets/avatar_' + props.userProfile.sex[0] + '.png'} /></h2>
            <h2 className="w3-center line-height-min"> {props.userProfile.username} </h2>
            <p className='line-height-min'>
                <i className={ props.userProfile.sex === 'male' ? 'fa fa-mars' : 'fa fa-venus' }/>
            </p>
        </div>
    )
}

const TableRow = (props) => {
    return (
        <tr>
            <td>{props.label}</td>
            <td>{props.value}</td>
        </tr>
    )
}

const ProfileAttributes = (props) => {
    return (
        <table id="profile-fields" className="w3-padding w3-table w3-bordered"><tbody>
            <TableRow label="Age Range" value={ props.userProfile.age } />
            <TableRow label="Three-Syllable Description" value={ props.userProfile.description } />
            <TableRow label="Looking For" value={
                <ul>
                    { props.userProfile.lookingFor.map( (val, i) =>
                        <li key={i}>{val}</li>
                    )}
                </ul>
            } />
            <TableRow label="Can Count" value={
                props.userProfile.canCount
                    ?
                    'Yes'
                    :
                    `No. Wait. You really thought ${props.userProfile.description} was three syllables?`
                     } />

        </tbody></table>
    )
}

export const Profile = (props) => {
    return (
        <div className='w3-card-4 w3-round w3-white w3-margin w3-padding'>
            <div className='content-w-50'>
                <ProfileHeader userProfile={ props.userProfile } />
                <ProfileAttributes userProfile= { props.userProfile } />
            </div>
        </div>);
}
