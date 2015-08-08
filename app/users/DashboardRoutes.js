'use strict';

var React = require('react-native');
var MainStyleSheet = require('../stylesheets/Main');
var NavigationBar = require('react-native-navbar');
var WorkersList = require('./WorkersList');

var {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity
} = React;

var styles = StyleSheet.create({
  ...MainStyleSheet,
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 10,
    paddingLeft: 10,
    height: 50,
    backgroundColor: '#426FA3'
  },
  headerCol: {
    flex: 1
  },
  headerText: {
    fontFamily: 'Helvetica',
    fontSize: 16,
    flex: 1,
    color: '#FFFFFF',
    fontWeight: '600'
  },
  customerHeaderCol: {
    flex: 2
  },
  backText: {
    color: '#FFFFFF',
    marginLeft: 4
  },
  navPrevContent: {
    flex: 1,
    flexDirection: 'row'
  }
});

function onPressPrevHandler() {
  Actions.popDashbboardNav();
}

var customTitle = <Image resizeMode="contain" style={styles.signUpImg} source={require('image!logo-nav')} />

var customPrev=
  <View style={styles.navPrevSection}>
    <TouchableOpacity onPress={onPressPrevHandler}>
      <View style={styles.navPrevContent}>
        <Image resizeMode="contain" style={styles.signUpImg} source={require('image!back-arrow')} />
        <Text style={styles.backText}>Back</Text>
      </View>
    </TouchableOpacity>
  </View>

var DashboardRoutes = {

  getWorkersList: function(options) {
    var header =
        <View style={styles.headerRow}>
          <View style={styles.headerCol}>
            <Text style={styles.headerText}>No.</Text>
          </View>
          <View style={[styles.headerCol, styles.customerHeaderCol]}>
            <Text style={styles.headerText}>Customer</Text>
          </View>
          <View style={styles.headerCol}>
            <Text style={styles.headerText}>Amount</Text>
          </View>
        </View>

    return {
      options: options,
      component: WorkersList,
      header: header,
      navigationBar:
        <NavigationBar
          style={styles.navBar}
          customTitle={customTitle}
          backgroundColor='#ef5350'
          statusBar='lightContent'
          customPrev={customPrev}
        />
      };
  },

};

module.exports = DashboardRoutes;