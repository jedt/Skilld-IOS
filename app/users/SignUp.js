'use strict';

var React = require('react-native');
var MainStyleSheet = require('../stylesheets/Main');
var SignUpForm = require('./SignUpForm');

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
  content : {
    flex: 1,
  },
    imageSection: {
      flex: 1
    },
      imageSectionContent: {
        justifyContent: 'center',
        alignItems: 'center',

      },
        signUpImg: {
          width: 80
        },
    signUpSection: {
      flex: 1,
      paddingLeft: 34,
      paddingRight: 34,
    },
});

var SignUp = React.createClass({
  render: function(){

    return (
      <ScrollView
        bounces={false}
        scrollEventThrottle={200}
      >
        <View style={styles.content}>
          <View style={styles.imageSection}>
            <View style={styles.imageSectionContent}>
              <Text>Logo</Text>
            </View>
          </View>

          <View style={styles.signUpSection}>
            <SignUpForm
              errors={this.props.errors}
              values={this.props.values}
            />
          </View>
        </View>
      </ScrollView>
    )
  }
});

module.exports = SignUp;