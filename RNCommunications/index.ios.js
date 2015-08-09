'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} = React;

var Communications = require('react-native-communications');

var RNCommunications = React.createClass({

  render: function() {
    return (
      <View style={styles.container}>
      <TouchableOpacity onPress={() => Communications.phonecall('0123456789', true)}>
        <View style={styles.phone}>
          <Text style={styles.text}>Make phonecall</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => Communications.email(['emailAddress1', 'emailAddress2'],null,null,'My Subject','My body text')}>
        <View style={styles.email}>
          <Text style={styles.text}>Send an email</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => Communications.text('0123456789')}>
        <View style={styles.sms}>
          <Text style={styles.text}>Send a text/iMessage</Text>
        </View>
      </TouchableOpacity>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgb(253,253,253)',
  },
  phone: {
    flex: 33,
    justifyContent: 'center',
  },
  email: {
    flex: 33,
    justifyContent: 'center',
  },
  sms: {
    flex: 33,
    justifyContent: 'center',
  },
  text: {
    fontSize: 32,
  },
});

AppRegistry.registerComponent('RNCommunications', () => RNCommunications);