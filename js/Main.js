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

export default class Main extends Component {
  ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

  state = {
    dataSource: this.ds.cloneWithRows([
      {
        day: 1,
        title: "Stopwatch"
      }
    ])
  }

  goToDay = (day) => {
    if (day === 1) {
      this.props.navigator.push({
        title: 'Stopwatch',
        component: Day1
      });
    }
  }

  render() {
    return (
      <ListView
        style={{
          flex: 1
        }}
        dataSource={this.state.dataSource}
        enableEmptySections
        renderRow={(rowData, sectionID, rowID) => (
          <TouchableHighlight
            onPress={this.goToDay.bind(null, rowData.day)}
            underlayColor={colors.tableUnderlay}
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
