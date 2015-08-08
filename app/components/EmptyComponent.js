'use strict';

var React = require('react-native');
var MainStyleSheet = require('../stylesheets/Main');

var {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  ScrollView
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

var Dashboard = React.createClass({
  render: function(){
    return (
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        automaticallyAdjustContentInsets={false}
        bounces={false}
        scrollEventThrottle={200}
      >
        <View style={styles.content}>
          <Text style={styles.title}>About</Text>

        </View>
      </ScrollView>
    )
  }
});

module.exports = Dashboard;