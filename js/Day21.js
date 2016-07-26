import React, {Component} from 'react'
import Realm from 'realm'
import {
  View,
  StyleSheet,
  TouchableHighlight,
  StatusBar,
  LayoutAnimation,
} from 'react-native'
import {Reminder} from './Day20'
import {screenHeight, screenWidth} from './dimensions'
import {Todo, TodoList} from './schema'

const realm = new Realm({
  path: 'day21.realm',
  schema: [Todo, TodoList],
})

const animations = {
  duration: 200,
  create: {
    type: LayoutAnimation.Types.linear,
  },
  update: {
    type: LayoutAnimation.Types.linear,
    springDamping: 0.5,
  },
}

function reminderTopPosition(index, state, totalCount) {
  if (state.init) {
    return 20 + 76 * index
  } else {
    const {activeIndex} = state
    if (activeIndex === index) {
      return 20
    } else {
      if (index < activeIndex) {
        return screenHeight - 7 * (totalCount - index - 1)
      } else {
        return screenHeight - 7 * (totalCount - index)
      }
    }
  }
}

function reminderScale(index, state, totalCount) {
  if (state.init) {
    return 1
  } else {
    const {activeIndex} = state
    if (activeIndex === index) {
      return 1
    } else {
      if (index < activeIndex) {
        return 1 - 0.01 * (totalCount - index - 1)
      } else {
        return 1 - 0.01 * (totalCount - index)
      }
    }
  }
}

export default class Day21 extends Component {
  constructor(props) {
    super(props)

    this.listsData = realm.objects('TodoList')
    if (this.listsData.length < 1) {
      realm.write(() => {
        realm.create('TodoList', {title: 'Scheduled', theme: '#979797'})
        realm.create('TodoList', {title: 'Movie', theme: '#cb7adf'})
        realm.create('TodoList', {title: 'Work', theme: '#f9005f'})
        realm.create('TodoList', {title: 'Home', theme: '#00a8f4'})
        realm.create('TodoList', {title: 'Reminder', theme: '#68d746'})
        const development = realm.create('TodoList', {title: 'Development', theme: '#fe952b'})
        development.list.push({text: 'day20'})
        development.list.push({text: 'day21'})
        development.list.push({text: 'day22'})
        development.list.push({text: 'day23'})
        development.list.push({text: 'day24'})
        development.list.push({text: 'day25'})
      })
    }
    this.state = {
      init: true,
      activeIndex: null,
    }
  }

  toggleTab = (index) => {
    if (this.state.activeIndex === index) {
      this.reset()
    } else {
      this.setState({
        activeIndex: index,
        init: false,
      })
      LayoutAnimation.configureNext(animations)
    }
  }

  reset = () => {
    this.setState({
      activeIndex: null,
      init: true,
    })
    LayoutAnimation.configureNext(animations)
  }

  componentWillMount() {
    StatusBar.setBarStyle('light-content')
  }

  render() {
    return (
      <View style={styles.container}>
        {this.listsData.map((listData, index) => (
          <Reminder
            key={index}
            realm={realm}
            style={{
              top: reminderTopPosition(index, this.state, this.listsData.length),
              transform: [
                {
                  scale: reminderScale(index, this.state, this.listsData.length),
                },
              ],
            }}
            toggleTab={()=>this.toggleTab(index)}
            title={listData.title}
            themeColor={listData.theme}
            remainCount={listData.list.filtered('completed = false').length}
            todos={listData.list} />
        ))}
        <TouchableHighlight
          underlayColor='transparent'
          style={styles.reset}
          onPress={this.reset}>
          <View />
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1F3C',
  },
  reset: {
    height: 30,
    width: screenWidth,
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
})
