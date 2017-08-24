import React from 'react';

export function Profile (props) {
    return (
        <div className='w3-card-4 w3-round w3-white w3-margin w3-padding'>
            <div className='content-w-50'>
                <div className="w3-bar w3-center">
                    <h2><img className='avatar' src={ '/assets/avatar_' + props.userProfile.sex[0] + '.png'} /></h2>
                    <h2 className="w3-center line-height-min"> {props.userProfile.username} </h2>
                    <p className='line-height-min'>
                        <i className={ props.userProfile.sex === 'male' ? 'fa fa-mars' : 'fa fa-venus' }/>
                    </p>
                </div>
            <table id="profile-fields" className="w3-padding w3-table w3-bordered"><tbody>
                <tr><td>Age Range</td><td>{props.userProfile.age}</td></tr>
                <tr><td>Three-Syllable Description</td><td>{props.userProfile.description}</td></tr>
                <tr><td>Looking For</td>
                    <td>
                        <ul>
                            {props.userProfile.lookingFor.map( (val, i) =>
                                <li key={i}>{val}</li>
                            )}
                        </ul>
                    </td>
                </tr>
                <tr><td>Can Count</td><td>{
                    props.userProfile.canCount
                    ?
                    'Yes'
                    :
                    `No. Wait. You really thought ${props.userProfile.description} was three syllables?`
                }</td></tr>
            </tbody></table>
            </div>
        </div>);
}
