'use strict';

var React = require('react-native');
var MainStyleSheet = require('../stylesheets/Main');
var NavigationBar = require('react-native-navbar');
var SignUp = require('./SignUp');
var Actions = require('../actions/Actions');
var LoginComponent = require('./LoginComponent');
var Dashboard = require('./Dashboard');

var {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity
} = React;

var styles = StyleSheet.create({
  ...MainStyleSheet,
  backText: {
    color: '#FFFFFF',
    marginLeft: 4
  },
  navPrevContent: {
    flex: 1,
    flexDirection: 'row'
  }
});

function onPressPrevHandler() {
  Actions.popLoginNav();
}

var customTitle =
  <View style={styles.navLogoSection}>
    <View style={styles.navLogoContent}>
      <Image resizeMode="contain" style={styles.signUpImg} source={require('image!logo-nav')} />
    </View>
  </View>

var customPrev=
  <View style={styles.navPrevSection}>
    <TouchableOpacity onPress={onPressPrevHandler}>
      <View style={styles.navPrevContent}>
        <Image resizeMode="contain" style={styles.signUpImg} source={require('image!back-arrow')} />
        <Text style={styles.backText}>Back</Text>
      </View>
    </TouchableOpacity>
  </View>

var LoginRoutes = {
  onPressPrevHandler: function() {
    Actions.popLoginNav();
  },

  getSignUp: function(options) {
    return {
      options: options,
      component: SignUp,
      navigationBar:
        <NavigationBar
          style={styles.navBar}
          backgroundColor='#ef5350'
          onPrev={this.onPressPrevHandler}
          statusBar='lightContent'
          customTitle={customTitle}
          customPrev={customPrev}
        />
      };
  },

  getDashboard: function(options) {
    return {
      options: options,
      component: Dashboard,
      navigationBar:
        <NavigationBar
          title="Dashboard"
        />
      };
  }
};

module.exports = LoginRoutes;