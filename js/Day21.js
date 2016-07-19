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
import {screenHeight, screenWidth} from './dimensions'

const animations = {
  duration: 200,
  create: {
    type: LayoutAnimation.Types.linear,
  },
  update: {
    type: LayoutAnimation.Types.linear,
    springDamping: 0.5,
  },
};

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

function reminderTopPosition(index, state, totalCount) {
  if (state.init) {
    return 20 + 76*index
  } else {
    const {activeIndex} = state;
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
    const {activeIndex} = state;
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
  state = {
    init: true,
    activeIndex: null
  }

  toggleTab = (index) => {
    if (this.state.activeIndex === index) {
      this.reset()
    } else {
      this.setState({
        activeIndex: index,
        init: false
      })
      LayoutAnimation.configureNext(animations);
    }
  }

  reset = () => {
    this.setState({
      activeIndex: null,
      init: true
    })
    LayoutAnimation.configureNext(animations);
  }

  componentWillMount() {
    StatusBar.setBarStyle('light-content');
  }

  render() {
    return (
      <View style={styles.container}>
        {listsData.map((listData, index) => (
          <Reminder
            key={index}
            style={{
              top: reminderTopPosition(index, this.state, listsData.length),
              transform: [
                {
                  scale: reminderScale(index, this.state, listsData.length)
                }
              ]
            }}
            toggleTab={()=>this.toggleTab(index)}
            title={listData.title}
            themeColor={listData.theme}
            todos={listData.list} />
        ))}
        <TouchableHighlight
          underlayColor="transparent"
          style={styles.reset}
          onPress={this.reset}>
          <View></View>
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1F3C'
  },
  reset: {
    height: 30,
    width: screenWidth,
    position: "absolute",
    bottom: 0,
    left: 0,
  }
});
