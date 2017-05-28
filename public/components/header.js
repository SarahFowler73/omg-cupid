import React from 'react';
import { NavLink } from 'react-router-dom';

export function Header(props) {
  return (
      <div className='w3-top'>
          <div className='w3-padding w3-block w3-theme-l1 w3-left'>
              <div className='w3-left'>
                  <h1 className='w3-bar-item'>OmgCupid</h1>
                  <p className='w3-bar-item'><em>A simulated dating experience!</em></p>
              </div>
              <nav className='w3-right-align'>
              { props.has_profile
                ?
                <ul className="nav">
                    <li>
                        <NavLink
                            className='w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white'
                            to="/profile">
                            Your Profile
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className='w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white'
                            to="/mail">
                            Mail
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className='w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white'
                            to="/users">
                            View Users
                        </NavLink>
                    </li>
                </ul>
                :
                ''
              }
             </nav>
        </div>
    </div>
  );
}
