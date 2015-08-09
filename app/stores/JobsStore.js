'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var AppConstants = require('../constants/AppConstants');
var assign = require('object-assign');
var Actions = require('../actions/Actions');

var CHANGE_EVENT = 'change';
var _isShowJobs = false;
var JobsStore = assign({}, EventEmitter.prototype, {
  resetPanel: function() {
    _isShowJobs = false;
  },

  isShowJobs: function() {
    return _isShowJobs;
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
  },
});

AppDispatcher.register(function(action) {
  switch(action.actionType) {
    case AppConstants.SHOW_JOBS:
        _isShowJobs = true;
        JobsStore.emitChange();
      break;

    case AppConstants.HIDE_JOBS:
        _isShowJobs = false;
        JobsStore.emitChange();
      break;
    default:
      break;
  }
});

module.exports = JobsStore;