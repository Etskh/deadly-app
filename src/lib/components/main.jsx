'use strict';

import React from 'react';


export class MainComponent extends React.Component {
  constructor() {
    super();
    this.searchHandler = this.searchHandler.bind(this);
    this.checkoutHandler = this.checkoutHandler.bind(this);
  };

  searchHandler() {
    console.log('Searching...');
  }

  checkoutHandler() {
    console.log('Checkout...');
  }

  render() {
    return (
      <div className="main">
        <div className="header">
          <div id="user">Active User</div>
          <div id="logo">LOGO</div>
        </div>
        <div className="container">
          <div className="button-container">
            <button
              className="button main-button"
              onClick={this.searchHandler()}
              >Search</button>
            <button
              className="button main-button"
              onClick={this.checkoutHandler()}
              >Checkout</button>
          </div>
        </div>
      </div>
    );
  }
}
