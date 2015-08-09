'use strict';

var React = require('react-native');
var MainStyleSheet = require('../stylesheets/Main');
var DashboardComponent = require('../components/DashboardComponent');
var NavigationBar = require('react-native-navbar');
var JobsStore = require('../stores/JobsStore');
var DashboardStore = require('../stores/DashboardStore');
var DashboardRoutes = require('./DashboardRoutes');
var FastJsonPatch = require('../components/FastJsonPatch');
var Actions = require('../actions/Actions');

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

var customPrev = <View/>

function getState() {
  return {
    isShowJobs: JobsStore.isShowJobs(),
    newView: DashboardStore.getNewView(),
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

  componentWillMount: function() {
  },

  componentDidMount: function() {
    JobsStore.addChangeListener(this._onChange);
    DashboardStore.addChangeListener(this._onChange);

    if (this.props.isDevelopment) {
      Actions.setNavToWorkersList();
    }
  },

  componentWillUnmount: function() {
    JobsStore.removeChangeListener(this._onChange);
    DashboardStore.removeChangeListener(this._onChange);
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

  setNav: function(nav, args ,route) {
    DashboardStore.resetView();

    var action = 'push';
    if (args) {
      action = args.action;
    }

    if (action == 'replace') {
      nav.popToTop();
      nav.replace(route);
    }
    else if (action == 'replacePrevious') {
      nav.replacePrevious(route);
      nav.pop();
    }
    else if (action == 'replaceAtIndex') {
      nav.replaceAtIndex(route, args.routeIndex);
      nav.popToTop();
    }
    else {
      nav.push(route);
    }
  },

  componentWillUpdate: function(newProps, newState) {
    var _new = newState.newView;

    if (_new.pop) {
      this.refs.navHome.pop();
      DashboardStore.resetView();
    }
    else {
      var options = undefined;
      if (_new.args) {
        if (_new.args.options) {
          options = _new.args.options;
        }
      };

      //save to json for diff
      var currentStateView = {
            view: this.state.newView.view,
          };

      var newStateView = {
            view: _new.view,
          };

      if (FastJsonPatch.hasDiff(currentStateView, newStateView)) {
        switch (_new.view) {
          case 'WorkersList':
              this.setNav(
                this.refs.navHome,
                {action: 'push'},
                DashboardRoutes.getWorkersList(options)
              );
            break;
          default:
            this.refs.navHome.pop();
            break;
        }
      }
    }
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
          ref="navHome"
          renderScene={this.renderScene}
          initialRoute={{
              component: DashboardComponent,
              navigationBar:
                <NavigationBar
                  style={styles.navBar}
                  statusBar='lightContent'
                  backgroundColor='#ef5350'
                  customPrev={<View />}
                  customTitle={customTitle}/>
            }}
        />
    )
  }
});

module.exports = Dashboard;