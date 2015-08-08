var React = require('react-native');
var MainStyleSheet = require('../stylesheets/Main');
var TextInputForm = require('../components/TextInputForm');

var {
  StyleSheet,
  Text,
  TextInput,
  View,
} = React;

var styles = StyleSheet.create({
  ...MainStyleSheet
});

var PasswordInput = React.createClass({
  render: function() {
    return (
        <TextInputForm
                label='Password'
                error={this.props.error}
                value={this.props.value}
                password={true}
                hasError={this.props.hasError}
                onChangeTextHandler={this.props.handleOnChange}
              />
    );
  }
});

module.exports = PasswordInput;