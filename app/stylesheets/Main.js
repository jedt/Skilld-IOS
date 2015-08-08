'use strict';

var React = require('react-native');

var {
  StyleSheet
} = React;

var defaults = {
  borderWidthStyle: 0,
  borderRadius: 0
};

var Main = {
  spacer: {marginTop: 10},
  navBar: {
    borderWidth: 0,
    flexDirection: 'row'
  },
  container: {
    borderWidth: defaults.borderWidthStyle,
    borderColor: '#00FFBB',
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
    scrollViewContent: {
      flex: 1,
      alignSelf: 'stretch',
      alignItems: 'stretch',
      backgroundColor: '#FFFFFF'
    },
  itemGroup: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'stretch',
    alignItems: 'stretch',
    borderWidth: defaults.borderWidthStyle,
    borderColor: '#990099'
  },
  title: {
    color: '#000',
    fontFamily: 'Helvetica',
    fontSize: 18,
    borderWidth: defaults.borderWidthStyle,
    borderColor: '#000000',
    fontWeight: '500'
  },
  inputGroupSection: {
    flex: 1,
  },
  inputGroup: {
    flex: 1,
    alignSelf: 'stretch',
    borderWidth: defaults.borderWidthStyle,
    borderColor: '#000000',
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  formLabel: {
    fontFamily: 'Helvetica',
    fontSize: 20
  },
  textInputError: {
    backgroundColor: '#FAFAFA',
    height: 50,
    fontFamily: 'Helvetica',
    fontSize: 20,
    paddingLeft: 8,
    borderColor: '#9B1414',
    borderWidth: 1,
  },
  errorMsg: {
    fontSize: 16,
    color: '#9B1414'
  },
  input: {
    backgroundColor: 'transparent',
    borderColor: '#E7E7E7',
    borderWidth: 1,
    height: 50,
    fontFamily: 'Helvetica',
    fontSize: 14,
    paddingLeft: 8,
    marginBottom: 10,
    borderRadius: 3,
  },
  headline: {
    fontFamily: 'Helvetica-Light',
    fontSize: 18,
  },
  p: {
    fontFamily: 'Helvetica',
    fontSize: 16,
    marginBottom: 10
  },
  btn: {
    flex: 1,
    justifyContent: 'center',
    height: 50,
    backgroundColor: '#E3E3E3',
    borderRadius: 2
  },
  btnText: {
    color: '#FFFFFF',
    fontFamily: 'Helvetica',
    fontSize: 16,
    textAlign: 'center'
  },
  navTitle: {
    fontFamily: 'Helvetica',
    fontSize: 18,
  },
  nav: {
    flex: 1,
  },
    navContent: {
      flex: 1,
    },
      navLogoSection: {
      },

      navPrevSection: {
        marginLeft: 10,
        width: 80,
      },

      signUpImg: {
      },

      navPrevContent: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'flex-start',
        alignSelf: 'center',
        width: 80,
        height: 25,
        marginTop: 60
      }
};

module.exports = Main;