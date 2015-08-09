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
  pop: false
};

var DashboardStore = assign({}, EventEmitter.prototype, {

  resetView: function() {
    _newView = {
      view: null,
      args: null,
      pop: false
    };
  },

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
    case AppConstants.JOB_SELECTED:
        _newView = {
          view: 'WorkersList',
          args: action.data,
          pop: false
        };

        DashboardStore.emitChange();
      break;
    case AppConstants.POP_DASHBOARD_NAV:
          _newView = {
            view: null,
            args: null,
            pop: true
          };
        DashboardStore.emitChange();
      break;
    case AppConstants.SET_NAV_TO_WORKERS_LIST:
          _newView = {
            view: 'WorkersList',
            args: null,
            pop: false
          };
        DashboardStore.emitChange();
      break;
    default:
      break;
  }
});

module.exports = DashboardStore;