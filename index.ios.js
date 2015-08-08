/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var App = require('./app/components/App');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} = React;

var Skylld = React.createClass({
  render: function() {
    return (
      <App />
    );
  }
});

AppRegistry.registerComponent('Skylld', () => Skylld);
