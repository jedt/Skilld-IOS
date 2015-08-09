'use strict';

var React = require('react-native');
var MainStyleSheet = require('../stylesheets/Main');
var ListViewStyleSheet = require('../stylesheets/ListView');
var deviceHeight = require('Dimensions').get('window').height;
var deviceWidth = require('Dimensions').get('window').width;
var WorkersListStore = require('../stores/WorkerListStore');
var Actions = require('../actions/Actions');

var {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  ListView
} = React;

var styles = StyleSheet.create({
  ...MainStyleSheet,
  ...ListViewStyleSheet,
  scrollView: {
    flex: 1,
    alignSelf: 'flex-start',
  },
  scrollViewContent : {
    padding: 20,
    flex: 1,
    alignSelf: 'flex-start',
    justifyContent: 'flex-start',
  },

  content: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'stretch',
    alignItems: 'stretch',
    height: deviceHeight,
  },
  rowListContentPressed: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    height: 180
  },
  rowListContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  invoiceDetailText: {
    fontFamily: 'Avenir Next',
    fontSize: 16,
    textAlign: 'right'
  },
  invoiceDetailAmount: {
    marginLeft: 10,
    marginRight: 10
  },
  invoiceDetailMore: {
    flex: 2,
    justifyContent: 'flex-end',
    alignItems: 'stretch',
    borderWidth: 1,
    borderColor: '#990000'
  },
  dueDateCol: {
    flex:2,
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  dueDateColRow1: {
    flex:1,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  dueDateColRow2: {
    flex:2,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'stretch'
  },
    buttonWrapper: {
      flex: 1,
      justifyContent: 'center',
      alignItems:'flex-end'
    },
  colAmountDetails: {
    flex: 3,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  col: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  footer: {
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: 'center'
  },
  //pull to refresh
  header: {
  },
  centerText: {
    textAlign: 'center'
  },
  centerView: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center'
  },
  pullRefreshTextWrapper: {
    flex:1
  },
  pullToRefreshText: {
    fontFamily: 'Helvetica',
    fontSize: 14,
  },
  rowItems: {
    margin: 10,
    flex: 1,
    flexDirection: 'row'
  },
    colAvatar: {
      flex: 1
    },
      workerImg: {
        height: 64,
        width: 64
      },
    colDescription: {
      flex: 4,
      marginLeft: 14
    },
      fullNameText: {
        fontFamily: 'Helvetica',
        fontSize: 18,
      },
      fullAddressText: {
        fontFamily: 'Helvetica',
        fontSize: 14,
      },
    callWorkerSection: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'stretch',
      alignSelf: 'stretch',
      marginTop: 40,
      marginBottom: 10,
      marginLeft: 30,
      marginRight: 30
    },
    callButton: {
      flex: 1,
      backgroundColor: '#EF5350',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'stretch',
      height: 50,
      borderRadius: 3
    },

      callButtonContent: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        flex: 1,
        flexDirection: 'row'
      },
        callButtonContentIcon: {
          flex: 1,
          alignItems: 'flex-end',
          marginRight: 4
        },
        callButtonContentText: {
          flex: 2
        },
          callButtonText: {
            color: '#FFFFFF',
            fontFamily: 'Helvetica',
            fontSize: 20,
          },

});

function getState() {
  return {
    workers: WorkersListStore.getWorkers()
  };
}

var WorkersList = React.createClass({
  ds: new ListView.DataSource({
    rowHasChanged: function(r1, r2) {
      return (r1 !== r2);
    }
  }),

  getInitialDataSourceState: function() {
    var data = this._genRows({}, []);
    return {
      dataSource: this.ds.cloneWithRows(data)
    };
  },

  getInitialState: function() {
    var init = this.getInitialDataSourceState();
    init = React.addons.update(init, {
                $merge: {
                  workers: [],
                }
              });
    return init;
  },

  _onChange: function() {
    var newState = getState();

    newState = React.addons.update(this.state, {
              $merge: {
                workers: newState.workers
              }
            });

    var data = this._genRows({}, newState.workers);
    var dataSource = this.ds.cloneWithRows(data);

    newState = React.addons.update(newState, {
              $merge: {
                dataSource: dataSource
              }
            });

    this.setState(newState);
  },

  componentDidMount: function() {
    WorkersListStore.addChangeListener(this._onChange);
    Actions.getWorkersList();
  },

  componentWillUnmount: function() {
    WorkersListStore.removeChangeListener(this._onChange);
  },

  _renderHeader: function() {
    return (
      <View style={styles.header}></View>
    )
  },

  _genRows: function(pressData, workers) {
    var dataBlob = [];
    if (typeof workers !== 'undefined' && workers.length > 0) {
      for (var i = 0; i < workers.length; i++) {
        var text = workers[i];
        var row = {
          text: text,
          pressed: pressData[i]
        };

        dataBlob.push(row);
      }
    }

    return dataBlob;
  },

  _pressData: (
    {}: {
      [key: number]: boolean
    }
  ),

  _pressRow: function(rowID: number) {

    if (!this._pressData[rowID]) {
      var newPressData = [];
      for (var i = 0;i < this._pressData.length; i++) {
        newPressData[i] = false;
      }

      this._pressData = newPressData;

      this._pressData[rowID] = true;

      this.setState({dataSource: this.state.dataSource.cloneWithRows(
        this._genRows(this._pressData, this.state.workers)
      )});
    }
    else {
      console.log('pressed again')
    }
  },

  _renderRow: function(rowDataArr, sectionID, rowID) {
    var rowData = rowDataArr.text;
    var fullName = rowData.fullName;
    var fullAddress = rowData.fullAddress;
    var pressed = rowDataArr.pressed;
    var content = {};
    var contentStyle = {};
    var callWorkerSection = {};

    if (pressed) {
      callWorkerSection =
              <View style={styles.callWorkerSection}>
                <View style={styles.callButton}>
                  <TouchableOpacity onPress={this.onPressCall}>
                    <View style={styles.callButtonContent}>
                        <View style={styles.callButtonContentIcon}>
                          <Image resizeMode="contain" style={styles.searchImg} source={require('image!phone-icon')} />
                        </View>
                        <View style={styles.callButtonContentText}>
                          <Text style={styles.callButtonText}>Call</Text>
                        </View>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
      contentStyle = styles.rowListContentPressed;
    }
    else {
      contentStyle = styles.rowListContent;
    }

    content =
      <View style={contentStyle}>
        <TouchableOpacity onPress={() => this._pressRow(rowID)}>
          <View style={styles.rowItems}>
            <View style={styles.colAvatar}>
              <Image resizeMode="contain" style={styles.workerImg} source={require('image!avatar')} />
            </View>
            <View style={styles.colDescription}>
              <View style={styles.infoRow}>
                <Text style={styles.fullNameText}>
                  {fullName}
                </Text>
                <Text style={styles.fullAddressText}>
                  {fullAddress}
                </Text>
                <Text style={styles.fullAddressText}>
                  1.5km
                </Text>
              </View>
              {callWorkerSection}
            </View>
          </View>
        </TouchableOpacity>
      </View>

    return (
        <View>
          {content}
          <View style={styles.separator} />
        </View>
    );
  },

  render: function(){
    return (
      <View style={styles.content}>
        <ListView
            bounces={true}
            dataSource={this.state.dataSource}
            renderRow={this._renderRow}
            renderHeader={this._renderHeader}
            renderFooter={this._renderFooter}
        />
      </View>
    );
  }
});

module.exports = WorkersList;