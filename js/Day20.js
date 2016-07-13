import React, { Component, PropTypes } from 'react';
import * as colors from './colors';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ListView,
  TouchableHighlight,
  StatusBar
} from 'react-native';
import Separator from './Separator';

const Header = ({themeColor, count = 0}) => {
  return (
    <View>
      <View style={styles.header}>
        <Text style={[styles.headerText, {color: themeColor}]}>Reminders</Text>
        <Text style={[styles.headerText, {color: themeColor}]}>{count}</Text>
      </View>
      <Separator />
    </View>
  )
};

const TodoToggle = ({themeColor, completed = false}) => {
  return (
    <View style={[styles.toggle, completed && {borderColor: themeColor}]}>
      <View style={completed && [styles.fill, {backgroundColor:themeColor}]}></View>
    </View>
  )
}

// TODO: show addTodo view
// TODO: addTodo function
// TODO: toggleTodo function
// TODO: toggle animation
// TODO: background
// TODO: separator marginLeft
// TODO: dynamic height
// TODO: tap anywhere will focus on textinput

// TODO: text shadow
// TODO: toggle completed
// TODO: edit

const initialData = [
  {
    text: 'Day 1',
    completed: false
  },
  {
    text: 'Day 2',
    completed: true
  }
];

export default class Day20 extends Component {
  static propTypes = {
    themeColor: PropTypes.string.isRequired,
  }

  static defaultProps = {
    themeColor: colors.purple
  }

  ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

  state = {
    todos: initialData,
    dataSource: this.ds.cloneWithRows(initialData)
  }

  componentDidMount() {
    StatusBar.setBarStyle('light-content');
  }

  render() {
    const remainCount = this.state.todos.filter(t => !t.completed).length;
    return (
      <View style={styles.container}>
        <View style={styles.reminderContainer}>
          <Header
            themeColor={this.props.themeColor}
            count={remainCount} />
          <ListView
            automaticallyAdjustContentInsets={false}
            dataSource={this.state.dataSource}
            enableEmptySections
            renderRow={(rowData, sectionID, rowID) => (
              <View style={styles.todoRow}>
                <TodoToggle themeColor={this.props.themeColor} completed={rowData.completed} />
                <TextInput
                  style={styles.todoText}
                  defaultValue={rowData.text} />
              </View>
            )}
            renderSeparator={(sectionID, rowID, adjacentRowHighlighted) => (
              <Separator key={`${sectionID}-${rowID}`} />
            )}
          />
        </View>
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
    fontWeight: '500'
  },
  todoRow: {
    paddingLeft: 15,
    paddingRight: 15,
    height: 44,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  todoText: {
    flex: 1,
    color: '#3F3F3F',
    fontSize: 17,
  },
  toggle: {
    width: 23,
    height: 23,
    borderRadius: 23,
    marginRight: 15,
    borderWidth: 1,
    borderColor: '#bbb',
    alignItems: 'center',
    justifyContent: 'center'
  },
  fill: {
    width: 15,
    height: 15,
    borderRadius: 15,
  },
});
