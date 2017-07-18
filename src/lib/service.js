'use strict';

import axios from 'axios';
import url from 'url';

const config = require('./config').posService;


/**
  Authenticates a user and password against the service
  and returns a token

    @param {string} username
    @param {string} password

    @returns {Promise} (token {string})
*/
export const authenticate = ( username, password ) => {

  const authUrl = url.format(Object.assign({
    pathname: '/authenticate',
  }, config.url));

  return axios.post( authUrl, {
    username: username,
    password: password,
  }).then ( response => {
    if (response.data.token) {
      return response.data.token;
    }
    return Promise.reject(response.data.error);
  });
}

/*
  Returns a promise which resolves to true if the service
  is active, and false if it isn't reachable
*/
export const test = () => {
  const versionUrl = url.format(Object.assign({
    pathname: '',
  }, config.url));

  return axios.get( versionUrl, {
    timeout: 1000,
  }).then(function (response) {
    return true;
  }).catch(function (error) {
    // Let's find if we timed out or if it doesn't
    // exist... because it's down?
    if( error.code === 'ECONNABORTED' ||
        error.code === 'ERR_CONNECTION_REFUSED' ) {
      return Promise.resolve(false);
    }
    // Not sure what happened, but it wasn't good.
    return Promise.reject(error);
  });
};

const getObject = ( token, object, path ) => {
  const getUrl = url.format(Object.assign({
    pathname: '/api' + path,
    query: {
      token: token,
    },
  }, config.url));

  return axios.get( getUrl, {
    // empty
  }).then ( response => {
    if (response.data[object]) {
      return response.data[object];
    }
    if( !response.data.error ) {
      return Promise.reject(`No field ${object} in returned data`);
    }
    return Promise.reject(response.data.error);
  });
};

/*
  Returns the active user
*/
export const getActiveUser = (token) => {
  return getObject(token, 'user', '/user');
}

export const getStore = (token, storeId) => {
  if ( !storeId ) {
    return Promise.reject('No store Id given to service.getStore');
  }

  return getObject(token, 'store', '/store/' + storeId );
};
