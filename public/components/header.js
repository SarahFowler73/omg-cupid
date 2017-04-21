var React = require('react');
var ReactDOM = require('react-dom');

export function Header(props) {
  return (
  <div className='w3-padding w3-block w3-theme-l1 w3-left-align'>
      <h1>Welcome to OmgCupid!</h1>
      <p><em>A simulated dating experience!</em></p>
    </div>
  );
}
