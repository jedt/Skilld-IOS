'use strict';

var React = require('react-native');
var MainStyleSheet = require('../stylesheets/Main');
var Actions = require('../actions/Actions');
var EmailInput = require('../components/EmailInput');
var PasswordInput = require('../components/PasswordInput');
var UsernameInput = require('../components/UsernameInput');
var SignUpStore = require('../stores/SignUpStore');

var {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  LinkingIOS
} = React;

var styles = StyleSheet.create({
  ...MainStyleSheet,
  mainSection: {
    flex: 11
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'stretch',
  },
  signupBtn: {
    flex: 1,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: '#EF5350',
    justifyContent: 'center',
    alignItems: 'stretch',
    alignSelf: 'stretch',
    borderRadius: 3
  }
});

function getState() {
  return {
    newView: SignUpStore.getNewView(),
    values: SignUpStore.getValues(),
    errors: SignUpStore.getErrors(),
  };
}

var SignUpForm = React.createClass({
  getInitialState: function() {
    var init = getState();
    return init;
  },

  onPressAbout: function(){
    Actions.viewAbout();
  },

  _handleOnChange: function(field, text) {
    var values = this.state.values;
    values[field] = text.trim();
    this.setState(values);
  },

  _onChange: function() {
    this.setState(getState());
  },

  componentDidMount: function() {
    SignUpStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    SignUpStore.removeChangeListener(this._onChange);
  },

  onPressSignUp: function() {
    var data = this.state.values;

    var valid = true;

    if (!data.username) {
      this.state.errors.username = {
        errorMsg: 'Please enter your username',
        hasError: true
      }

      this.setState(this.state);
      valid = false;
    }

    if (!data.email) {
      this.state.errors.email = {
        errorMsg: 'Please enter your email',
        hasError: true
      }

      this.setState(this.state);
      valid = false;
    }

    if (!data.password) {
      this.state.errors.password = {
        errorMsg: 'Please enter your password',
        hasError: true
      }

      this.setState(this.state);
      valid = false;
    }

    if (valid) {
      Actions.createNewAccount(data);
    }
  },

  render: function(){
    return (
      <View style={styles.container}>
        <View style={styles.itemGroup}>
            <View style={[styles.inputGroupSection]}>
              <View style={styles.loginInputGroup}>
                <UsernameInput
                  value={this.state.values.username ? this.state.values.username : null}
                  error={this.state.errors.username.errorMsg}
                  hasError={this.state.errors.username.hasError}
                  handleOnChange={(text)=>{
                    this._handleOnChange('username', text);
                  }}
                />
              </View>
              <View style={styles.loginInputGroup}>
                <EmailInput
                  value={this.state.values.email ? this.state.values.email : null}
                  error={this.state.errors.email.errorMsg}
                  hasError={this.state.errors.email.hasError}
                  handleOnChange={(text)=>{
                    this._handleOnChange('email', text);
                  }}
                />
              </View>
              <View style={[styles.loginInputGroup, {marginBottom: 20}]}>
                <PasswordInput
                  value={this.state.values.password ? this.state.values.password : null}
                  error={this.state.errors.password.errorMsg}
                  hasError={this.state.errors.password.hasError}
                  password={true}
                  handleOnChange={(text)=>{
                    this._handleOnChange('password', text);
                  }}
                />
              </View>
            </View>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity onPress={this.onPressSignUp}>
            <View style={styles.signupBtn}>
                <Text style={[styles.btnText]}>Sign Up</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
});

module.exports = SignUpForm;