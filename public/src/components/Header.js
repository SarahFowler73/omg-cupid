import React from 'react';
import { NavLink } from 'react-router-dom';

export const Header = (props) => {
  return (
      <div className='w3-top'>
          <div className='w3-padding w3-block w3-theme-l1 w3-left'>
              <div id='logo' className='w3-left'>
                  <h1 className='w3-bar-item w3-left'><img src='/assets/omg-logo2.png'/>
                  <p className='w3-bar-item w3-center'><em>A simulated dating experience!</em></p>
                  </h1>

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
                            to="/mail/inbox">
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
