import React, { Component, PropTypes } from 'react';
import * as colors from '../colors';
import styles from './styles';
import realm from './realm';
import {
  View,
  Text,
  TextInput,
  Image,
  StatusBar,
  TouchableWithoutFeedback,
  LayoutAnimation
} from 'react-native';
import { ListView } from 'realm/react-native';
import Separator from '../Separator';
import Icon from 'react-native-vector-icons/Ionicons';

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
    realm.write(() => {
      this.props.todo.completed = !this.props.todo.completed;
    });
    LayoutAnimation.configureNext(animations)
    this.forceUpdate();
  }

  onChangeText = (text) => {
    realm.write(() => {
      this.props.todo.text = text;
    });
    this.forceUpdate();
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
    remainCount: PropTypes.number.isRequired,
  }

  static defaultProps = {
    remainCount: 0
  }

  state = {
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
      dataSource: this.state.dataSource.cloneWithRows(this.props.todos)
    })
    LayoutAnimation.configureNext(animations)
  }

  addTodo = (event) => {
    const text = event.nativeEvent.text.trim();
    if (text !== '') {
      realm.write(() => {
        realm.create('Todo', {text});
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
    const remainCount = this.props.remainCount;
    return (
      <View style={[styles.reminderContainer, this.props.style]}>
        <Image
          style={styles.reminderBg}
          source={require('../assets/packed.png')}
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
    this.todos = realm.objects('Todo');
    if (this.todos.length < 1) {
      realm.write(() => {
        realm.create('Todo', {text: 'Todo 1'});
        realm.create('Todo', {text: 'Todo 2'});
        realm.create('Todo', {text: 'Todo 3', completed: true});
      });
    }
    this.listData = {
      title: "Reminders",
      theme: colors.purple,
      list: this.todos,
    }
  }

  componentWillMount() {
    StatusBar.setBarStyle('light-content');
  }

  render() {
    return (
      <View style={styles.container}>
        <Reminder
          title={this.listData.title}
          themeColor={this.listData.theme}
          todos={this.listData.list}
          remainCount={this.todos.filtered('completed = false').length} />
      </View>
    )
  }
}
