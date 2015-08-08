'use strict';

var React = require('react-native');
var MainStyleSheet = require('../stylesheets/Main');

var {
  StyleSheet,
  Text,
  View,
  ActivityIndicatorIOS,
  Image
} = React;

var styles = StyleSheet.create({
  ...MainStyleSheet,
  logoWrapper : {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activity: {
    margin: 20,
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityDisplayWrapper: {
    flex: 1
  }
});

var ActivityDisplay = React.createClass({
  render: function() {
    return (
      <View style={styles.activityDisplayWrapper}>
        <View style={styles.activity}>
          <ActivityIndicatorIOS hidden='false' size='large'/>
          <Text style={[styles.headline, {marginTop: 8, textAlign: 'center', fontSize: 16}]}>Loading...</Text>
        </View>
      </View>
    );
  }
});

module.exports = ActivityDisplay;