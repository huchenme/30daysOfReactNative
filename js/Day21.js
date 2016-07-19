import React, { Component, PropTypes } from 'react';
import * as colors from './colors';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ListView,
  TouchableHighlight,
  StatusBar,
  TouchableWithoutFeedback,
  LayoutAnimation
} from 'react-native';
import {Reminder} from './Day20'

const listsData = [
  {
    title: "Scheduled",
    theme: "#979797",
    list: [],
  },
  {
    title: "Movie",
    theme: "#cb7adf",
    list: [],
  },
  {
    title: "Work",
    theme: "#f9005f",
    list: [],
  },
  {
    title: "Home",
    theme: "#00a8f4",
    list: [],
  },
  {
    title: "Reminder",
    theme: "#68d746",
    list: [],
  },
  {
    title: "Development",
    theme: "#fe952b",
    list: [
      {
        completed: false,
        text: "day20",
      },{
        completed: false,
        text: "day21",
      },{
        completed: false,
        text: "day22",
      },{
        completed: false,
        text: "day23",
      },{
        completed: false,
        text: "day24",
      },{
        completed: false,
        text: "day25",
      }
    ],
  }
];

const listData = listsData[5]

export default class Day21 extends Component {
  componentWillMount() {
    StatusBar.setBarStyle('light-content');
  }

  render() {
    return (
      <View style={styles.container}>
        <Reminder
          title={listData.title}
          themeColor={listData.theme}
          todos={listData.list} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1F3C'
  },
  reminderContainer: {
    flex: 1,
    marginTop: 20,
    marginBottom: 43,
    borderRadius: 10,
    backgroundColor: '#F9F9F9',
    overflow: 'hidden'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 15,
    paddingRight: 15
  },
  headerText: {
    fontSize: 30,
    fontWeight: '500',
    textShadowColor:"rgba(0, 0, 0, 0.3)",
    textShadowOffset:{width:0, height:1},
    textShadowRadius:1,
  },
  todoRow: {
    paddingLeft: 15,
    paddingRight: 15,
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  todoTextInput: {
    flex: 1,
    color: '#3F3F3F',
    fontSize: 17,
  },
  todoTextCompleted: {
    color: colors.textSecondary
  },
  toggle: {
    width: 23,
    height: 23,
    borderRadius: 23,
    marginRight: 15,
    borderWidth: 1,
    borderColor: '#C6C6C6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fill: {
    width: 15,
    height: 15,
    borderRadius: 15,
  },
  separator: {
    marginLeft: 38
  }
});
