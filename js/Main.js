import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  Text,
  View,
  StatusBar,
  ListView,
} from 'react-native'
import Separator from './Separator';
import Day1 from './Day1';
import Day3 from './Day3';
import Day4 from './Day4';
import Day5 from './Day5';
import Day6 from './Day6';
import Day8 from './Day8';
import Day9 from './Day9';
import Day17 from './Day17';
import Day20 from './Day20';
import * as colors from './colors';

// TODO: run on iOS device and debug
// TODO: nav styles
// TODO: app icon

const days = [
  {
    day: 1,
    title: "Stopwatch",
    component: Day1,
    hideNav: false
  },
  {
    day: 3,
    title: "Twitter",
    component: Day3,
    hideNav: true
  },
  {
    day: 4,
    title: "Cocoapods",
    component: Day4,
    hideNav: false
  },
  {
    day: 5,
    title: "Find my location",
    component: Day5,
    hideNav: false
  },
  {
    day: 6,
    title: "Spotify",
    component: Day6,
    hideNav: true
  },
  {
    day: 8,
    title: "Swipe Menu",
    component: Day8,
    hideNav: true
  },
  {
    day: 9,
    title: "Twitter Profile",
    component: Day9,
    hideNav: true
  },
  {
    day: 17,
    title: "Fuzzy search",
    component: Day17,
    hideNav: false
  },
  {
    day: 20,
    title: "Reminders",
    component: Day20,
    hideNav: true
  }
];

export default class Main extends Component {
  ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

  state = {
    dataSource: this.ds.cloneWithRows(days)
  }

  componentDidMount() {
    StatusBar.setBarStyle('default');
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
