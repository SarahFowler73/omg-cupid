import React from 'react';

export function Header(props) {
  return (
      <div className='w3-top'>
          <div className='w3-padding w3-block w3-theme-l1 w3-left'>
              <div className='w3-left'>
                  <h1 className='w3-bar-item'>OmgCupid</h1>
                  <p className='w3-bar-item'><em>A simulated dating experience!</em></p>
              </div>
              <nav className='w3-right-align'>
              { true
                ?
                <ul className=''>
                    <li className='w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white'>Link1</li>
                    <li className='w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white'>Link2</li>
                    <li className='w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white'>Link3</li>
                </ul>
                :
                ''
              }
             </nav>
        </div>
    </div>
  );
}
