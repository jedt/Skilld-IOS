'use strict';

var React = require('react-native');
var MainStyleSheet = require('../stylesheets/Main');
var Actions = require('../actions/Actions');
var PasswordInput = require('../components/PasswordInput');
var UsernameInput = require('../components/UsernameInput');
var LoginStore = require('../stores/LoginStore');

var {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  LinkingIOS,
} = React;

var styles = StyleSheet.create({
  ...MainStyleSheet,
  mainSection: {
    flex: 6,
    paddingLeft: 34,
    paddingRight: 34,
  },
    formGroup: {
      flex: 1,
      justifyContent: 'flex-end'
    },
      formGroupContent: {
      },
  loginBtn: {
    backgroundColor: '#EF5350',
    borderRadius: 3
  },
  loginBg: {
    width: 240
  },
  logoWrapper: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
    logoContent: {
    },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignSelf: 'stretch',
    alignItems: 'stretch',
  },
    footerContent: {

    },
      footerItem: {
        height: 44,
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'stretch',
        alignSelf: 'stretch'
      },
  signUpText: {
    fontFamily: 'Helvetica',
    fontSize: 13,
    textAlign: 'center',
    color: '#444444'
  },
  connectRow: {
    flex: 1,
  },
    connectRowContent: {
      marginTop: 10,
      paddingLeft: 34,
      paddingRight: 34,
    },
        buttonCols: {
          alignSelf: 'center',
          alignItems: 'center',
          flexDirection: 'row'
        },
        twitterLogo: {
          width: 25,
          marginRight: 4
        },
        connectWithTwitterBtnText: {
          fontFamily: 'Helvetica',
          fontSize: 13,
          textAlign: 'center',
          color: '#FFFFFF'
        }

});

function getState() {
  return {
    values: LoginStore.getValues(),
    errors: LoginStore.getErrors(),
  };
}

var LoginComponent = React.createClass({

  getInitialState: function() {
    var init = getState();
    return init;
  },

  onPressSignUp: function() {
    Actions.setLoginNavToSignUp();
  },

  onPressLogIn: function() {
      Actions.loginUser({
                  username: 'demo',
                  password: 'demo'
                });
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
    LoginStore.addChangeListener(this._onChange);
    this.setState({
      values: this.props.values,
      errors: this.props.errors
    });
  },

  componentWillUnmount: function() {
    LoginStore.removeChangeListener(this._onChange);
  },

  render: function(){
    return (
      <View style={styles.container}>
        <View style={styles.mainSection}>
          <View style={styles.logoWrapper}>
            <View style={styles.logoContent}>
              <Image resizeMode="contain" style={styles.signUpImg} source={require('image!logo')} />
            </View>
          </View>
          <View style={styles.formGroup}>
            <View style={styles.formGroupContent}>
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
              <View style={[styles.loginInputGroup]}>
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
              <View style={styles.spacer}></View>
              <TouchableOpacity onPress={this.onPressLogIn}>
                <View style={[styles.btn, styles.loginBtn]}><Text style={styles.btnText}>Log In</Text></View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View stye={styles.connectRow}>
          <View style={styles.connectRowContent}>
            <View style={{borderTopWidth: 1, borderColor: '#EAEAEA', marginBottom: 10}}></View>
          </View>
        </View>
        <View style={styles.footer}>
          <View style={styles.footerContent}>
            <View style={styles.footerItem}>
              <TouchableOpacity onPress={this.onPressSignUp}>
                <View style={[styles.btn]}><Text style={styles.btnText, styles.signUpText}>Sign up using Email</Text></View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    )
  }
});

module.exports = LoginComponent;