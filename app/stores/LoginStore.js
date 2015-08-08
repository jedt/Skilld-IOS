'use strict';
var React = require('react-native');
var AppConfig = require('../config/AppConfig');

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var AppConstants = require('../constants/AppConstants');
var assign = require('object-assign');
var Actions = require('../actions/Actions');

var CHANGE_EVENT = 'change';

var {
  AsyncStorage,
  AlertIOS
} = React;

var _newView = {
  view: null,
  args: null,
};

var _errors = {
      username: {
        hasError: false,
        errorMsg: null
      },
      password: {
        hasError: false,
        errorMsg: null
      },
    };

var _values = {
      username: null,
      password: null
    };

function loginUser(data) {
}

var LoginStore = assign({}, EventEmitter.prototype, {

  getNewView: function() {
    return _newView;
  },

  getValues: function() {
    return _values;
  },

  getErrors: function() {
    return _errors;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

AppDispatcher.register(function(action) {
  switch(action.actionType) {
    case AppConstants.POP_LOGIN_NAV:
        _newView = {
          view: null,
          args: null,
          pop: true
        };

        LoginStore.emitChange();
      break;
    case AppConstants.SET_LOGIN_NAV_TO_SIGNUP:
        _newView = {
          view: 'SignUp',
          args: null,
          pop: false
        };

        LoginStore.emitChange();
      break;
    case AppConstants.BEFORE_CREATE_NEW_ACCOUNT_SUCCESSFUL:
        _newView = {
          view: null,
          args: null,
          pop: true
        };

        LoginStore.emitChange();
      break;
    case AppConstants.BEFORE_LOGIN_USER:
        loginUser(action.data);
      break;
    default:
      break;
  }
});

module.exports = LoginStore;