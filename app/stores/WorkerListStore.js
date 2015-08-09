'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var AppConstants = require('../constants/AppConstants');
var assign = require('object-assign');
var Actions = require('../actions/Actions');
var AppConfig = require('../config/AppConfig');
var Parse = require('parse').Parse;
var User = Parse.Object.extend('User');

var CHANGE_EVENT = 'change';

var _workers = [];

function getWorkersList() {
  Parse.initialize(AppConfig.APP_ID, AppConfig.JS_KEY);
  var query = new Parse.Query(User);

  query.find({
    success: function(results) {
      for (var i = 0; i < results.length; i++) {
         var object = results[i];
         _workers.push({
          id:object.id,
          fullName: object.get('fullName'),
          fullAddress: object.get('fullAddress')
        });
      }
      WorkerListStore.emitChange();
    }
  });
}

var WorkerListStore = assign({}, EventEmitter.prototype, {

  getWorkers: function() {
    return _workers;
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
    case AppConstants.BEFORE_GET_WORKERS_LIST:
        _workers = [];
        WorkerListStore.emitChange();

        setTimeout(()=>{
           getWorkersList();
        }, 1);

    default:
      break;
  }
});

module.exports = WorkerListStore;