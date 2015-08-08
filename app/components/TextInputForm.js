var React = require('react-native');
var MainStyleSheet = require('../stylesheets/Main');

var {
  StyleSheet,
  Text,
  TextInput,
  View,
} = React;

var styles = StyleSheet.create({
  ...MainStyleSheet
});

var TextInputForm = React.createClass({
  render: function() {
    var errorMsg = {};
    if (this.props.hasError) {
      errorMsg = <Text style={styles.errorMsg}>{this.props.error}</Text>;
    }

    var textInput = {};

    if (this.props.showLabel && this.props.showLabel === true) {
      textInput =
        <View style={[styles.inputGroup]}>
          <Text style={styles.formLabel}>{this.props.label}</Text>
          <TextInput
            value={this.props.value}
            autoFocus={this.props.autoFocus ? this.props.autoFocus : undefined}
            style={[this.props.hasError ? styles.textInputError : styles.input]}
            onChangeText={this.props.onChangeTextHandler}
            password={this.props.password}
          />
          {errorMsg}
        </View>
    }
    else {
      textInput =
        <View style={[styles.inputGroup]}>
          <TextInput
            value={this.props.value}
            autoFocus={this.props.autoFocus ? this.props.autoFocus : undefined}
            style={[this.props.hasError ? styles.textInputError : styles.input]}
            placeholder={this.props.label}
            onChangeText={this.props.onChangeTextHandler}
            password={this.props.password}
          />
          {errorMsg}
        </View>;
    }
    return textInput;
  }

});

module.exports = TextInputForm;