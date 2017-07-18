import React from 'react';

export function Profile (props) {
    return (
        <div className='w3-card-4 w3-round w3-white w3-margin w3-padding'>
            <h2 className="w3-center">{props.userProfile.username}</h2>
            <table id="profile-fields" className="w3-padding w3-table "><tbody>
                <tr><td><label>Age:</label>{props.userProfile.age}</td></tr>
                <tr><td>Sex:</td><td>{props.userProfile.sex}</td></tr>
                <tr><td>Three-Syllable Description:</td><td>{props.userProfile.description}</td></tr>
                <tr><td>Looking For:</td>
                    <td>
                        <ul>
                            {props.userProfile.lookingFor.map( (val, i) =>
                                <li key={i}>{val}</li>
                            )}
                        </ul>
                    </td>
                </tr>
                <tr><td>Can Count:</td><td>{
                    props.userProfile.canCount
                    ?
                    'Yes'
                    :
                    `No. Wait. You really thought ${props.userProfile.description} was three syllables?`
                }</td></tr>
            </tbody></table>

        </div>);
}
