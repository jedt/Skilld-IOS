'use strict';

var React = require('react-native');
var AppConstants = require('../constants/AppConstants');
var Actions = require('../actions/Actions');
var AppStore = require('../stores/AppStore');
var AppConfig = require('../config/AppConfig');
var MainStyleSheet = require('../stylesheets/Main');
var Login = require('../users/Login');
var Dashboard = require('../users/Dashboard');

var AppConfig = require('../config/AppConfig');
var LoadingStore = require('../stores/LoadingStore');
var ActivityDisplay = require('../components/ActivityDisplay');

var {
  StyleSheet,
  Text,
  View,
  AsyncStorage
} = React;

var styles = StyleSheet.create({
  ...MainStyleSheet
});

function getState() {
  return {
    newView: AppStore.getNewView(),
    loadingStatus: LoadingStore.getLoadingStatus()
  };
}

var App = React.createClass({
  getInitialState: function() {
    var init = getState();
    // init = React.addons.update(init, {
    //           $set: {
    //             loadingStatus: AppConstants.LOADING
    //           }
    //         });
    return init;
  },

  _onChange: function() {
    this.setState(getState());
  },

  componentWillMount: function() {

  },

  componentDidMount: function() {
    AppStore.addChangeListener(this._onChange);
    LoadingStore.addChangeListener(this._onChange);
  },

  componentWillUpdate: function(newProps, newState) {
    var loadingStatus = newState.loadingStatus;
  },

  componentWillUnmount: function() {
    AppStore.removeChangeListener(this._onChange);
    LoadingStore.removeChangeListener(this._onChange);
  },

  render: function() {
    var content = {};

    if (AppConfig.IS_DEVELOPMENT) {
      content =
        <Dashboard isDevelopment={true} />
    }
    else {
      content =
        <View style={styles.container}>
          <ActivityDisplay isLoading={true}/>
        </View>

      if (this.state.loadingStatus !== AppConstants.LOADING) {
        var login = <Login/>
        var dashboard = <Dashboard/>

        if (this.state.newView.view == 'Dashboard') {
          content = dashboard;
        }
        else {
          content = login;
        }
      }
    }


    return content;
  },

});

module.exports = App;