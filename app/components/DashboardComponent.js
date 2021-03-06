'use strict';

var React = require('react-native');
var MainStyleSheet = require('../stylesheets/Main');
var deviceHeight = require('Dimensions').get('window').height;
var deviceWidth = require('Dimensions').get('window').width;
var Actions = require('../actions/Actions');

var {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView,
  MapView
} = React;

var styles = StyleSheet.create({
  ...MainStyleSheet,
  scrollView: {
    flex: 1,
    alignSelf: 'center',
  },
  scrollViewContent : {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    height: deviceHeight,
    width: deviceWidth
  },
  mapView: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'stretch',
    justifyContent: 'center',
    backgroundColor: '#CCCCCC'
  },
  content: {
    flex: 1,
  },

  mainSection: {
    flex: 1,
    flexDirection: 'column'
  },
  row: {
    flex: 1
  },
  searchRow: {
    paddingLeft: 8,
    paddingRight: 8,
    justifyContent: 'center',
    height: 60,
    backgroundColor: '#EF5350'
  },
    searchFormWrapper: {
      flex: 8,
      justifyContent: 'center',
      alignItems: 'stretch',
      alignSelf: 'stretch',
    },
    searchButtonWrapper: {
      flex: 1,
      marginLeft: 8,
      justifyContent: 'center',
      alignItems: 'stretch',
      alignSelf: 'stretch',
    },
      searchButton: {
        flex: 1,
      },
  search: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E7E7E7',
    borderWidth: 1,
    height: 34,
    fontFamily: 'Helvetica',
    fontSize: 16,
    paddingLeft: 8,
    borderRadius: 3,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  searchRowContent: {
    flex: 1,
    flexDirection: 'row'
  },
  searchImg: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 10
  },
  jobsSection: {
    flex: 2,
    backgroundColor: '#FFFFFF',
    paddingTop: 10,
  },
    jobsWrapper: {
      flex: 1,
    },
      jobsRow: {
        flex: 1,
        borderColor: '#990000',
        alignItems: 'stretch',
        alignSelf: 'stretch',
        justifyContent: 'center',
        flexDirection: 'row'
      },
        iconBtn: {
          padding: 20,
          flex: 1,
          borderColor: '#444444',
          justifyContent: 'center',
          alignItems: 'stretch',
          alignSelf: 'stretch'
        },
          colItem: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'stretch',
            alignSelf: 'stretch'
          },
            colItemText: {
              fontFamily: 'Helvetica',
              fontSize: 13,
              textAlign: 'center',
              color: '#EF5350'
            },
    cancelTextBtn: {
      flex: 1,
      backgroundColor: '#EF5350',
      height: 50,
      marginLeft: 20,
      marginRight: 20,
      justifyContent: 'center',
      alignItems: 'stretch',
      alignSelf: 'stretch',
      borderRadius: 3,
      marginTop: 10,
      marginBottom: 20
    },
      cancelText: {
        fontFamily: 'Helvetica',
        fontSize: 16,
        color: '#FFFFFF',
        textAlign: 'center'
      }
});

var markers = [
  {
    latitude: 14.55,
    longitude: 121.03,
    title: 'Foo Place',
    subtitle: '1234 Foo Drive'
  },
  {
    latitude: 14.5469,
    longitude: 121.0277,
    title: '1234',
    subtitle: '1234 Foo Drive'
  },
];

var DashboardComponent = React.createClass({

  onSearchPressed: function() {
    Actions.showJobs();
  },

  componentWillUpdate: function(newProps, newState) {

  },

  onPressJob: function(jobName) {
    Actions.hideJobs();
    Actions.jobSelected(jobName);
  },

  onCloseJob: function() {
    Actions.hideJobs();
  },

  _getAnnotations(region) {
    return [{
      longitude: region.longitude,
      latitude: region.latitude,
      title: 'You Are Here',
    }];
  },

  _onRegionChange(region) {
    console.log(region)
  },

  render: function(){
    var jobsSection = {};
    var searchSection = {};
    if (this.props.isShowJobs) {
      jobsSection =
        <View style={[styles.row, styles.jobsSection]}>
          <View style={styles.jobsWrapper}>
            <View style={[styles.jobsRow, {marginBottom: 20}]}>
              <View style={[styles.colItem, {marginRight: 10}]}>
                <TouchableHighlight onPress={()=>{this.onPressJob('Plumbing')}}
                    underlayColor='#E7E7E7' style={styles.iconBtn}>
                  <View>
                    <Image resizeMode="contain" style={styles.searchImg} source={require('image!wrench')} />
                    <Text style={styles.colItemText}>Plumbing</Text>
                  </View>
                </TouchableHighlight>
              </View>
              <View style={styles.colItem}>
                <TouchableHighlight onPress={()=>{this.onPressJob('HomeRepair')}}
                  underlayColor='#E7E7E7' style={styles.iconBtn}>
                  <View>
                    <Image resizeMode="contain" style={styles.searchImg} source={require('image!wrench')} />
                    <Text style={styles.colItemText}>Home Repair</Text>
                  </View>
                </TouchableHighlight>
              </View>
            </View>
            <View style={[styles.jobsRow, {marginBottom: 20}]}>
              <View style={[styles.colItem, {marginRight: 10}]}>
                <TouchableHighlight onPress={()=>{this.onPressJob('Electrical')}}
                  underlayColor='#E7E7E7' style={styles.iconBtn}>
                  <View>
                    <Image resizeMode="contain" style={styles.searchImg} source={require('image!wrench')} />
                    <Text style={styles.colItemText}>Electrical</Text>
                  </View>
                </TouchableHighlight>
              </View>
              <View style={styles.colItem}>
                <TouchableHighlight onPress={()=>{this.onPressJob('Mechanical')}}
                  underlayColor='#E7E7E7' style={styles.iconBtn}>
                  <View>
                    <Image resizeMode="contain" style={styles.searchImg} source={require('image!wrench')} />
                    <Text style={styles.colItemText}>Mechanical</Text>
                  </View>
                </TouchableHighlight>
              </View>
            </View>
            <View style={[styles.jobsRow, {marginBottom: 20}]}>
              <View style={[styles.colItem, {marginRight: 10}]}>
                <TouchableHighlight onPress={()=>{this.onPressJob('Furniture Assembly')}}
                  underlayColor='#E7E7E7' style={styles.iconBtn}>
                  <View>
                    <Image resizeMode="contain" style={styles.searchImg} source={require('image!wrench')} />
                    <Text style={styles.colItemText}>Furniture Assembly</Text>
                  </View>
                </TouchableHighlight>
              </View>
              <View style={styles.colItem}>
                <TouchableHighlight onPress={()=>{this.onPressJob('Carpentry')}}
                  underlayColor='#E7E7E7' style={styles.iconBtn}>
                  <View>
                    <Image resizeMode="contain" style={styles.searchImg} source={require('image!wrench')} />
                    <Text style={styles.colItemText}>Carpentry</Text>
                  </View>
                </TouchableHighlight>
              </View>
            </View>
          </View>
          <View>
            <TouchableOpacity onPress={this.onCloseJob}>
              <View style={styles.cancelTextBtn}>
                <Text style={styles.cancelText}>
                  Cancel
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
    }
    else {
      searchSection =
        <View style={styles.searchRow}>
          <View style={styles.searchRowContent}>
            <View style={styles.searchFormWrapper}>
              <TextInput onFocus={this.onSearchPressed} style={styles.search} />
            </View>
            <View style={styles.searchButtonWrapper}>
              <TouchableOpacity onPress={this.onSearchPressed}>
                <View style={styles.searchButton}>
                  <Image resizeMode="contain" style={styles.searchImg} source={require('image!search')} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
    }

    return (
          <View style={styles.content}>
            <View style={styles.mainSection}>
              {searchSection}
              {jobsSection}
              <View style={[styles.row]}>
                <MapView
                  region={{
                    latitude: 14.55,
                    longitude: 121.03,
                    longitudeDelta: 0.01,
                    latitudeDelta: 0.01
                  }}
                  style={styles.mapView}
                  showsUserLocation={true}
                  annotations={markers}
                />
              </View>
            </View>
          </View>
    )
  }
});

module.exports = DashboardComponent;