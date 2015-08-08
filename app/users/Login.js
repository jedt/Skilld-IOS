'use strict';

var React = require('react-native');
var MainStyleSheet = require('../stylesheets/Main');
var Actions = require('../actions/Actions');
var LoginComponent = require('./LoginComponent');
var NavigationBar = require('react-native-navbar');
var LoginStore = require('../stores/LoginStore');
var LoginRoutes = require('./LoginRoutes');
var FastJsonPatch = require('../components/FastJsonPatch');
var AppConstants = require('../constants/AppConstants');

var {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Navigator,
  AsyncStorage
} = React;

var styles = StyleSheet.create({
  ...MainStyleSheet,
  content : {
    padding: 20
  },
  welcomeText: {
    fontFamily: 'Helvetica',
    fontSize: 16,
    color: '#FFFFFF'
  }
});

function getState() {
  return {
    newView: LoginStore.getNewView(),
    values: LoginStore.getValues(),
    errors: LoginStore.getErrors(),
  };
}

var About = React.createClass({
  getInitialState: function() {
    var init = getState();
    init = React.addons.update(init,
          {
            values: {
                $merge: {
                  username: 'demo',
                  password: 'demo'
                }
              }
          });
    return init;
  },

  _onChange: function() {
    this.setState(getState());
  },

  componentDidMount: function() {
    LoginStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    LoginStore.removeChangeListener(this._onChange);
  },

  setNav: function(nav, args ,route) {
    var action = 'push';
    if (args) {
      action = args.action;
    }
    if (action == 'replace') {
      nav.replace(route);
    }
    else if (action == 'replacePrevious') {
      nav.replacePrevious(route);
      nav.pop();
    }
    else {
      nav.push(route);
    }
  },

  _handleOnChange: function(field, text) {
    var values = this.state.values;
    values[field] = text.trim();
    this.setState(values);
  },

  componentWillUpdate: function(newProps, newState) {
    var _new = newState.newView;
    if (_new.pop) {
      this.refs.navLogin.pop();
    }
    else {
      if (FastJsonPatch.hasDiff(this.state.newView.view, _new.view)) {
        var options = undefined;
          if (_new.args) {
            if (_new.args.options) {
              options = _new.args.options;
            }
          }

        switch (_new.view) {
          case 'SignUp':
              this.setNav(
                this.refs.navLogin,
                _new.args,
                LoginRoutes.getSignUp(options)
              );
            break;
          default:
            break;
        }
      }
    }
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
              errors={this.state.errors}
              values={this.state.values}
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
          <Text style={styles.welcomeText}>Welcome</Text>
        </View>
      </View>

    var content =
        <Navigator
          ref="navLogin"
          bounces={false}
          configureScene={() => {
            return Navigator.SceneConfigs.HorizontalSwipeJump
          }}
          renderScene={this.renderScene}
          initialRoute={{
              component: LoginComponent,
              navigationBar:
                <NavigationBar
                  style={styles.navBar}
                  statusBar='lightContent'
                  backgroundColor='#ef5350'
                  customPrev={<View></View>}
                  customTitle={customTitle}/>
            }}
        />

    return content;
  }
});

module.exports = About;