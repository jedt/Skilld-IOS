'use strict';

var StyleSheet = require('react-native').StyleSheet;

module.exports = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#000000',
    opacity: 0.60,
  },
  closeButton: {
    position: 'absolute',
    borderColor: '#ffffff',
    borderRadius: 2,
    borderWidth: 1,
    right: 20,
    top: 20,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
  },
  closeButtonText: {
    color: '#ffffff',
  },
  modal: {
    margin: 20,
    backgroundColor: '#ffffff',
    borderRadius: 0,
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowColor: '#000000',
    shadowOpacity: 0.6,
    shadowRadius: 1,
  }
});