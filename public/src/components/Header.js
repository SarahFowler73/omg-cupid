import React from 'react';
import { NavLink } from 'react-router-dom';

const NavigationItem = (props) => {
    return(
        <li>
            <NavLink
                className='w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white'
                to={ props.to }
            >
                { props.name }
            </NavLink>
        </li>
    )
}

const LogoSection = () => {
    return (
        <div id='logo' className='w3-left'>
            <h1 className='w3-bar-item w3-left'><img src='/assets/omg-logo2.png'/>
            <p className='w3-bar-item w3-center'><em>A simulated dating experience!</em></p>
            </h1>
        </div>
    )
}

export const Header = (props) => {
  return (
      <div className='w3-top'>
          <div className='w3-padding w3-block w3-theme-l1 w3-left'>
              <LogoSection />
              <nav className='w3-right-align'>
              { props.hasProfile
                ?
                <ul className="nav">
                    <NavigationItem to="/profile" name="Your Profile" />
                    <NavigationItem to="/mail/inbox" name="Mail" />
                    <NavigationItem to="/users" name="View Users" />
                </ul>
                :
                ''
              }
             </nav>
        </div>
    </div>
  );
}
