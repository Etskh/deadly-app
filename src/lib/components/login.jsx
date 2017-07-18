'use strict';

import React from 'react';

const service = require('../service');

export class LogInComponent extends React.Component {
  constructor() {
    super();
    this.loginHandler = this.loginHandler.bind(this);
    this.render = this.render.bind(this);
  };

  keyHandler(key) {
    this.state.keys.push(key);
    // TODO: highlight the key
  }

  loginHandler() {
    // TODO: write the service.login function
    // Wow so logged in!
    console.log('Wow! So logged in!');
    /*
    // then log in
    service.login( user )
    .then( token => {
      console.log(`Got token ${token}!`);
      this.props.tokenHandler(token);
    }).catch( error => {
      console.error(error);
    });
    */
  }

  render() {
    const possibleKeys = [
      'dog',
      'unicorn',
      'rainbow',
      'bat',
      //
      'glitter',
      'cat',
      'witch hat',
      'shoe',
      //
      'pumpkin',
      'goat',
      'ferret',
      'donut',
      //
      'phone',
      'candle',
      'boxing glove',
      'fish',
    ];
    const rows = [];
    let row = [];
    let r = 0;
    const keyWidth = parseInt(Math.sqrt(
      possibleKeys.length));

    // Add all the keys to a list
    possibleKeys.forEach( k => {
      row.push(<td key="{k}">{k}</td>);
      // If we've reached our desired key count per row
      // then let's add the row to the big row, and empty
      // the array
      if( row.length === keyWidth ) {
        rows.push(<tr key="{++r}">{row}</tr>);
        row = [];
      }
    });

    return (
      <div className="login-screen">
        <h1>Login</h1>
        <table>
          <tbody>
            {rows}
          </tbody>
        </table>
        <button onClick={this.loginHandler}>Log in</button>
      </div>
    );
  }
}
