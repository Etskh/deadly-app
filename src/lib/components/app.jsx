'use strict';

import React from 'react';


import { SignInComponent } from './signin.jsx';
import { LogInComponent } from './login.jsx';
import { MainComponent } from './main.jsx';

const service = require('../service');


export class AppComponent extends React.Component {
  constructor() {
    super();

    // Create the application state
    this.state = {
      store: this.getStore(),
      isAlive: true,
      token: null,
    };

    // bind our functions
    this.tokenHandler = this.tokenHandler.bind(this);
    this.signInHandler = this.signInHandler.bind(this);
  };

  componentDidMount() {
    /*
    service.test().then( isAlive => {
      this.setState(Object.assign({
        isAlive: isAlive,
      }, this.state));
      console.log('We checked - the thing is there');
    });
    */
  }

  getStore() {
    // Get the store
    const storage = window.localStorage;
    const store = JSON.parse(storage.getItem('store'));
    return store;
  }

  setStore( store ) {
    // Get the store
    const storage = window.localStorage;
    storage.getItem('store', JSON.stringify(store));
    this.state.store;
    this.setState(newState);
  }

  signInHandler( token ) {

    console.log(`Setting the token here`);
    // TODO: hide the form
    const newState = Object.assign({}, this.state);
    newState.token = token;

    return service.getActiveUser(token).then( user => {
      console.log(`This is the service after`);
      // get the store from the
      return service.getStore(token, user.storeId);
    }).then( store => {
      // Set the store in storage locally
      this.setStore(store);
      newState.store = store;
      // finally set the state
      this.setState(newState);
    }).catch(err => {
      console.error(err);
    });
  }

  tokenHandler( token ) {
    const newState = Object.assign({}, this.state);
    newState.token = token;
    this.setState(newState);
  }

  render() {
    // TODO: add loading screen at the end
    // because we're waiting on all kinds of state

    // If there's no store id, then ask for the user to signin
    // and then retrieve it from their user
    if( !this.state.store ) {
      return (
        <SignInComponent
          tokenHandler={this.signInHandler}
        />
      )
    }

    // if we have a token, then render the main screen
    if( !this.state.token ) {
      return (
        <LogInComponent
          storeId={ this.state.store }
          tokenHandler={ this.tokenHandler }
        />
      );
    }

    // No token yet? Show the sign-in service
    if( this.state.isAlive ) {
      return (
        <MainComponent/>
      );
    }
    // No sign-in service, show service unavailable
    return (
      <ErrorComponent
        error='Service unavailable'
      />
    );
  }
}
