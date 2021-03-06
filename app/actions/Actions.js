'use strict';
var React = require('react-native');

var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var _React = React;
var AsyncStorage = _React.AsyncStorage;

var Actions = {

  loginUser: function(data) {
    AppDispatcher.dispatch({
      actionType: AppConstants.BEFORE_LOGIN_USER,
      data: data
    });
  },

  setLoginNavToSignUp: function() {
    AppDispatcher.dispatch({
      actionType: AppConstants.SET_LOGIN_NAV_TO_SIGNUP
    });
  },

  popLoginNav: function() {
    AppDispatcher.dispatch({
      actionType: AppConstants.POP_LOGIN_NAV,
    });
  },

  showJobs: function() {
    AppDispatcher.dispatch({
      actionType: AppConstants.SHOW_JOBS,
    });
  },

  hideJobs: function() {
    AppDispatcher.dispatch({
      actionType: AppConstants.HIDE_JOBS,
    });
  },

  jobSelected: function(data) {
    AppDispatcher.dispatch({
      actionType: AppConstants.JOB_SELECTED,
      data: data
    });
  },

  popDashboardNav: function() {
    AppDispatcher.dispatch({
      actionType: AppConstants.POP_DASHBOARD_NAV,
    });
  },

  setNavToDashboard: function() {
    AppDispatcher.dispatch({
      actionType: AppConstants.SET_NAV_TO_DASHBOARD,
    });
  },

  setNavToWorkersList: function() {
    AppDispatcher.dispatch({
      actionType: AppConstants.SET_NAV_TO_WORKERS_LIST,
    });
  },

  getWorkersList: function() {
    AppDispatcher.dispatch({
      actionType: AppConstants.BEFORE_GET_WORKERS_LIST,
    });
  }
};

module.exports = Actions;