/**
EmptyStore - a blank store template for creating a new store
*/
'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var AppConstants = require('../constants/AppConstants');
var assign = require('object-assign');
var Actions = require('../actions/Actions');

var CHANGE_EVENT = 'change';

var _newView = {
  view: null,
  args: null,
};

var AppStore = assign({}, EventEmitter.prototype, {

  getNewView: function() {
    return _newView;
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
    case AppConstants.SET_NAV_TO_DASHBOARD:
          _newView = {
            view: 'Dashboard',
            args: null,
            pop: false
          };

        AppStore.emitChange();
      break;
    default:
      break;
  }
});

module.exports = AppStore;