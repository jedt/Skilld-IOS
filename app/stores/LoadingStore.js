'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var AppConstants = require('../constants/AppConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _loadingStatus = null;

var LoadingStore = assign({}, EventEmitter.prototype, {
  getLoadingStatus: function() {
    return _loadingStatus;
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
    case AppConstants.BEFORE_LOGIN_USER:
    case AppConstants.BEFORE_LOGIN_TOKEN:

      setTimeout(()=>{
          _loadingStatus = AppConstants.LOADING;
            LoadingStore.emitChange();
      }, 1);

      break;
    case AppConstants.AFTER_LOGIN_USER_SUCCESSFUL:
    case AppConstants.AFTER_LOGIN_USER_ERROR:

      setTimeout(()=>{
        _loadingStatus = null;
        LoadingStore.emitChange();
      }, 1);

      break;
    default:
      break;
  }
});

module.exports = LoadingStore;