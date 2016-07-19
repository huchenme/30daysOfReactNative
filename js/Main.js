import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  Text,
  View,
  StatusBar,
  ListView,
  DeviceEventEmitter,
} from 'react-native'
import Separator from './Separator';
import * as colors from './colors';
import days from './days';
// TODO: run on iOS device and debug
// TODO: nav styles
// TODO: app icon

export default class Main extends Component {
  ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

  state = {
    dataSource: this.ds.cloneWithRows(days)
  }

  componentWillMount() {
    StatusBar.setBarStyle('default');
    DeviceEventEmitter.addListener(
    'quickActionShortcut', (data) => {
      switch(data.type){
        case "day1":
          this.jumpToDay(0);
          break;
        case "day3":
          this.jumpToDay(1);
          break;
        case "day4":
          this.jumpToDay(2);
          break;
        case "day5":
          this.jumpToDay(3);
          break;
      }
    });
  }

  jumpToDay = (index) => {
    const day = days[index];
    this.props.navigator.resetTo({
      title: day.title,
      component: day.component,
      navigationBarHidden: day.hideNav
    });
  }

  goToDay = (index) => {
    const day = days[index];
    this.props.navigator.push({
      title: day.title,
      component: day.component,
      navigationBarHidden: day.hideNav
    });
  }

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        enableEmptySections
        renderRow={(rowData, sectionID, rowID, highlightRow) => (
          <TouchableHighlight
            underlayColor={colors.tableUnderlay}
            onPress={() => {
              this.goToDay(rowID);
              highlightRow(sectionID, rowID);
            }}
            style={styles.rowContainer}>
            <View style={styles.row}>
              <Text style={{
                  color: colors.textSecondary,
                  fontSize: 17
                }}>Day {rowData.day}</Text>
              <Text style={{
                  color: colors.textPrimary,
                  fontSize: 17,
                }}>{rowData.title}</Text>
            </View>
          </TouchableHighlight>
        )}
        renderSeparator={(sectionID, rowID, adjacentRowHighlighted) => (
          <Separator key={`${sectionID}-${rowID}`} />
        )}
      />
    )
  }
}

const styles = StyleSheet.create({
  rowContainer: {
    paddingLeft: 15,
    paddingRight: 15,
    height: 44,
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  }
});
