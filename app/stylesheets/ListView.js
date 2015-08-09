'use strict';

var React = require('react-native');

var {
  StyleSheet
} = React;

var defaults = {
  borderWidthStyle: 0,
  borderRadius: 0
};

var listViewStyleSheet = {
  row: {
    paddingLeft: 4,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    alignSelf: 'stretch',
    height: 50,
    backgroundColor: '#FFFFFF'
  },
  rowPressed: {
    paddingLeft: 4,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    alignSelf: 'stretch',
    backgroundColor: '#F6F6F6',
    height: 50,
  },
  separator: {
    height: 1,
    backgroundColor: '#F0F0F0',
  },
  thumb: {
    width: 64,
    height: 64,
    borderRadius: 31
  },
  text: {
    fontFamily: 'Avenir Next',
    fontSize: 16,
    flex: 1,
  },
  centerText: {
    textAlign: 'center'
  },
  centerView: {
    justifyContent: 'center'
  },
  more: {
    width: 44,
    height: 44
  }
};

module.exports = listViewStyleSheet;