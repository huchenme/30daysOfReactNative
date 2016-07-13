import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  Text,
  View,
  ListView,
} from 'react-native'
import Day1 from './Day1';
import * as colors from './colors';

// TODO: run on iOS device and debug

const days = [
  {
    day: 1,
    title: "Stopwatch",
    component: Day1,
    hideNav: false
  }
];

export default class Main extends Component {
  ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

  state = {
    dataSource: this.ds.cloneWithRows(days)
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
            style={{
              paddingLeft: 15,
              paddingRight: 15,
              height: 44,
              justifyContent: 'center',
            }}>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
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
          <View
            key={`${sectionID}-${rowID}`}
            style={{
              marginLeft: 15,
              height: StyleSheet.hairlineWidth,
              backgroundColor: colors.separator,
            }}
          />
        )}
      />
    )
  }
}

const styles = StyleSheet.create({
});
