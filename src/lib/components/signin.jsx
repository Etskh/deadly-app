'use strict';

import React from 'react';

const service = require('../service');

export class SignInComponent extends React.Component {
  constructor() {
    super();
    this.signinHandler = this.signinHandler.bind(this);
  };

  signinHandler() {
    const username= document.getElementById('username').value;
    const password= document.getElementById('password').value;
    service.authenticate( username, password )
    .then( token => {
      console.log(`Got me a token ${token}!`);
      return this.props.tokenHandler(token);
    }).catch( error => {
      console.error(error);
    })
  }

  render() {
    return (
      <div className="login-screen">
        <h1>Sign In</h1>
        <input type="text" name="username" id="username"/>
        <input type="password" name="password" id="password"/>
        <button onClick={this.signinHandler}>Sign In</button>
      </div>
    );
  }
}
