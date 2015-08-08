'use strict';

var React = require('react-native');
var MainStyleSheet = require('../stylesheets/Main');
var TextInputForm = require('./TextInputForm');

var {
  StyleSheet,
  Text,
  TextInput,
  View,
} = React;

var styles = StyleSheet.create({
  ...MainStyleSheet
});

var EmailInput = React.createClass({
  render: function() {
    return (
        <TextInputForm
                label='Email'
                password={false}
                value={this.props.value}
                error={this.props.error}
                hasError={this.props.hasError}
                onChangeTextHandler={this.props.handleOnChange}
              />
    );
  }
});

module.exports = EmailInput;