import React, { Component, PropTypes } from 'react';
import * as colors from './colors';
import Realm from 'realm';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  StatusBar,
  TouchableWithoutFeedback,
  LayoutAnimation
} from 'react-native';
import { ListView } from 'realm/react-native';
import Separator from './Separator';
import {screenWidth, screenHeight} from './dimensions';
import Icon from 'react-native-vector-icons/Ionicons';
import {Todo, TodoList} from './schema';

const realm = new Realm({
  path: 'day20.realm',
  schema: [Todo, TodoList]
});

// FIXME: known issue that if user type too fast on existing item, console will complain
// "Native TextInput(xxx) is x events ahead of JS - try to make your JS faster."
// it is fixed for new todo item by not call setState directly

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

class TodoItem extends Component {
  static propTypes = {
    todo: PropTypes.shape({
      completed: PropTypes.bool,
      text: PropTypes.string,
    }).isRequired,
    themeColor: PropTypes.string.isRequired,
  }

  toggleTodo = () => {
    this.props.realm.write(() => {
      this.props.todo.completed = !this.props.todo.completed;
    });
    this.props.resetDataSource()
  }

  onChangeText = (text) => {
    this.props.realm.write(() => {
      this.props.todo.text = text;
    });
    this.props.resetDataSource()
  }

  render() {
    const {
      todo,
      themeColor,
    } = this.props;

    return (
      <View>
        <View style={styles.todoRow}>
          <TodoToggle
            themeColor={themeColor}
            completed={todo.completed}
            onPress={this.toggleTodo} />
          <TextInput
            style={[styles.todoTextInput, todo.completed && styles.todoTextCompleted]}
            defaultValue={todo.text}
            onChangeText={this.onChangeText} />
        </View>
        <View style={styles.separator}>
          <Separator />
        </View>
      </View>
    )
  }
}

export class Reminder extends Component {
  static propTypes = {
    themeColor: PropTypes.string.isRequired,
    todos: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    toggleTab: PropTypes.func,
    realm: PropTypes.any
  }

  static defaultProps = {
    remainCount: 0
  }

  state = {
    remainCount: this.props.todos.filtered('completed = false').length,
    newTodo: '',
    dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => {
      return row1 !== row2
    }}),
  }

  componentDidMount() {
    this.resetDataSource()
  }

  resetDataSource = () => {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.props.todos),
      remainCount: this.props.todos.filtered('completed = false').length
    })
    LayoutAnimation.configureNext(animations)
  }

  addTodo = (event) => {
    const text = event.nativeEvent.text.trim();
    if (text !== '') {
      this.props.realm.write(() => {
        this.props.todos.push({text});
      });
      this.resetDataSource()
    }
    this._addTextInput.setNativeProps({
      text: '',
    });
  }

  renderRow = (rowData, sectionID, rowID) => {
    return (
      <TodoItem
        todo={rowData}
        resetDataSource={this.resetDataSource}
        realm={this.props.realm}
        themeColor={this.props.themeColor}
      />
    )
  }

  renderFooter = () => {
    return (
      <View>
        <View style={styles.todoRow}>
          <View style={styles.addIcon}>
            <Icon name="ios-add" color="#C6C6C6" size={35}/>
          </View>
          <TextInput
            ref={component => this._addTextInput = component}
            autoFocus
            enablesReturnKeyAutomatically
            onEndEditing={this.addTodo}
            style={styles.todoTextInput} />
        </View>
        <View style={styles.separator}>
          <Separator />
        </View>
      </View>
    )
  }

  render() {
    const remainCount = this.state.remainCount;
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
          renderFooter={this.renderFooter}
          renderRow={this.renderRow}
        />
      </View>
    )
  }
}

export default class Day20 extends Component {
  constructor(props) {
    super(props);
    console.log(realm.path)
    this.listsData = realm.objects('TodoList');
    if (this.listsData.length < 1) {
      realm.write(() => {
        const reminder = realm.create('TodoList', {title: 'Reminders', theme: colors.purple});
        reminder.list.push({text: 'Todo 1'})
        reminder.list.push({text: 'Todo 2'})
        reminder.list.push({text: 'Todo 3', completed: true})
      });
    }
    this.listData = this.listsData[0]
  }

  componentWillMount() {
    StatusBar.setBarStyle('light-content');
  }

  render() {
    return (
      <View style={styles.container}>
        <Reminder
          realm={realm}
          title={this.listData.title}
          themeColor={this.listData.theme}
          todos={this.listData.list} />
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
