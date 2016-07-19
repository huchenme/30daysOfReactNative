import React, { Component, PropTypes } from 'react';
import * as colors from './colors';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ListView,
  Image,
  TouchableHighlight,
  StatusBar,
  TouchableWithoutFeedback,
  LayoutAnimation
} from 'react-native';
import Separator from './Separator';
import Icon from 'react-native-vector-icons/Ionicons';
import {screenWidth, screenHeight} from './dimensions';

const Header = ({title, themeColor, count = 0, toggleTab}) => {
  return (
    <TouchableWithoutFeedback onPress={toggleTab}>
      <View>
        <View style={styles.header}>
          <Text style={[styles.headerText, {color: themeColor}]}>{title}</Text>
          <Text style={[styles.headerText, {color: themeColor}]}>{count}</Text>
        </View>
        <Separator />
      </View>
    </TouchableWithoutFeedback>
  )
};

const TodoToggle = ({onPress, themeColor, completed = false}) => {
  return (
    <TouchableWithoutFeedback
      onPress={onPress}>
      <View style={[styles.toggle, completed && {borderColor: themeColor}]}>
        <View style={completed && [styles.fill, {backgroundColor:themeColor}]}></View>
      </View>
    </TouchableWithoutFeedback>
  )
}

const animations = {
  duration: 200,
  update: {
    type: LayoutAnimation.Types.linear,
    springDamping: 0.7,
  },
};

// TODO: row dynamic height
// TODO: tap anywhere will focus on textinput
// TODO: autofocus on next one
// TODO: should able to toggle when keyboard open

export class Reminder extends Component {
  static propTypes = {
    themeColor: PropTypes.string.isRequired,
    todos: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    toggleTab: PropTypes.func,
  }

  static defaultProps = {
    todos: []
  }

  ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

  state = {
    newTodo: '',
    todos: this.props.todos,
    dataSource: this.ds.cloneWithRows(this.props.todos)
  }

  addTodo = () => {
    if (this.state.newTodo.trim() !== '') {
      const newTodos = [
        ...this.state.todos,
        {
          text: this.state.newTodo.trim(),
          complete: false
        }
      ];
      this.setState({
        newTodo: '',
        todos: newTodos,
        dataSource: this.ds.cloneWithRows(newTodos)
      })
    }
  }

  toggleTodo = (index) => {
    const todos = this.state.todos;
    const toggledTodo = {
      ...todos[index],
      completed: !todos[index].completed
    }
    const newTodos = [
      ...todos.slice(0, index),
      toggledTodo,
      ...todos.slice(index + 1)
    ];
    this.setState({
      todos: newTodos,
      dataSource: this.ds.cloneWithRows(newTodos)
    })
    LayoutAnimation.configureNext(animations)
  }

  render() {
    const remainCount = this.state.todos.filter(t => !t.completed).length;
    return (
      <View style={[styles.reminderContainer, this.props.style]}>
        <Image
          style={styles.reminderBg}
          source={require('./assets/packed.png')}
        />
        <Header
          toggleTab={this.props.toggleTab}
          title={this.props.title}
          themeColor={this.props.themeColor}
          count={remainCount} />
        <ListView
          automaticallyAdjustContentInsets={false}
          dataSource={this.state.dataSource}
          enableEmptySections
          renderFooter={() => (
            <View>
              <View style={styles.todoRow}>
                <View style={styles.addIcon}>
                  <Icon name="ios-add" color="#C6C6C6" size={35}/>
                </View>
                <TextInput
                  autoFocus
                  enablesReturnKeyAutomatically
                  value={this.state.newTodo}
                  onChangeText={(text) => this.setState({newTodo: text})}
                  onEndEditing={this.addTodo}
                  style={styles.todoTextInput} />
              </View>
              <View style={styles.separator}>
                <Separator />
              </View>
            </View>
          )}
          renderRow={(rowData, sectionID, rowID) => {
            return (
              <View>
                <View style={styles.todoRow}>
                  <TodoToggle
                    themeColor={this.props.themeColor}
                    completed={rowData.completed}
                    onPress={this.toggleTodo.bind(null, parseInt(rowID), 10)} />
                  <TextInput
                    style={[styles.todoTextInput, rowData.completed && styles.todoTextCompleted]}
                    defaultValue={rowData.text} />
                </View>
                <View style={styles.separator}>
                  <Separator />
                </View>
              </View>
            )
          }}
        />
      </View>
    )
  }
}

const listData = {
  title: "Reminders",
  theme: colors.purple,
  list: [],
}

export default class Day20 extends Component {
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
    position: 'absolute',
    top: 20,
    left: 0,
    width: screenWidth,
    height: screenHeight - 63,
    borderRadius: 10,
    backgroundColor: '#F9F9F9',
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    shadowOffset: {
      height: -1,
      width: 0,
    }
  },
  reminderBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: screenWidth,
    height: screenHeight - 63,
    borderRadius: 10,
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
    backgroundColor: 'transparent',
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
  addIcon: {
    width: 23,
    height: 23,
    marginRight: 15,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center'
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
