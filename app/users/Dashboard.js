'use strict';

var React = require('react-native');
var MainStyleSheet = require('../stylesheets/Main');
var DashboardComponent = require('../components/DashboardComponent');
var NavigationBar = require('react-native-navbar');
var JobsStore = require('../stores/JobsStore');

var {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Navigator,

} = React;

var styles = StyleSheet.create({
  ...MainStyleSheet,
  scrollView: {
    flex: 1,
    alignSelf: 'flex-start',
  },
  scrollViewContent : {
    padding: 20,
    flex: 1,
    alignSelf: 'flex-start',
    justifyContent: 'flex-start',
  }
});

function getState() {
  return {
    isShowJobs: JobsStore.isShowJobs()
  };
}

var Dashboard = React.createClass({
  getInitialState: function() {
    var init = getState();
    return init;
  },

  _onChange: function() {
    this.setState(getState());
  },

  componentDidMount: function() {
    JobsStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    JobsStore.removeChangeListener(this._onChange);
  },

  renderScene: function(route, navigator) {
    var Component = route.component;
    var navBar = route.navigationBar;

    if (navBar) {
      navBar = React.addons.cloneWithProps(navBar, {
        navigator: navigator,
        route: route
      });
    }
    return (
      <View style={styles.nav}>
        {navBar}
          <View style={styles.navContent}>
            <Component
              isShowJobs={this.state.isShowJobs}
              navigator={navigator}
              options={route.options}
              route={route}
              beforeNavigatorPop={this.beforeNavigatorPop}
              _handleOnChange={this._handleOnChange}
              onPressLogin={this.onPressLogin}
            />
          </View>
      </View>
    );
  },

  render: function(){
    var customTitle =
      <View style={styles.navLogoSection}>
        <View style={styles.navLogoContent}>
          <Image resizeMode="contain" style={styles.signUpImg} source={require('image!logo-nav')} />
        </View>
      </View>

    return (
      <Navigator
          ref="navLogin"
          renderScene={this.renderScene}
          initialRoute={{
              component: DashboardComponent,
              navigationBar:
                <NavigationBar
                  style={styles.navBar}
                  statusBar='lightContent'
                  backgroundColor='#ef5350'
                  customPrev={customPrev}
                  customTitle={customTitle}/>
            }}
        />
    )
  }
});

module.exports = Dashboard;