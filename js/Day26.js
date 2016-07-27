import React, {Component, PropTypes} from 'react'
import {
  Animated,
  LayoutAnimation,
  PanResponder,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native'
import Day22 from './Day22'
import Day24 from './Day24'
import Day25 from './Day25'
import {screenWidth, screenHeight} from './dimensions'

const menuWidth = 150
const touchWidth = 10

const CustomLayoutLinear = {
  duration: 200,
  create: {
    type: LayoutAnimation.Types.linear,
    property: LayoutAnimation.Properties.opacity,
  },
  update: {
    type: LayoutAnimation.Types.easeInEaseOut,
  },
}

const Row = ({children, onPress}) => (
  <TouchableHighlight
    underlayColor='rgba(255,255,255,0.15)'
    style={styles.row}
    onPress={onPress}>
    <Text style={styles.text}>
      {children}
    </Text>
  </TouchableHighlight>
)
Row.propTypes = {
  children: PropTypes.any.isRequired,
  onPress: PropTypes.func,
}

const Menu = ({goToDay}) => (
  <View style={styles.menu}>
    <Row onPress={() => {goToDay(22)}}>Day 22</Row>
    <Row onPress={() => {goToDay(24)}}>Day 24</Row>
    <Row onPress={() => {goToDay(25)}}>Day 25</Row>
  </View>
)
Menu.propTypes = {
  goToDay: PropTypes.func.isRequired,
}

class Main extends Component {
  static propTypes = {
    day: PropTypes.any.isRequired,
  }

  state = {
    showMenu: true,
    left: new Animated.Value(0),
    touchWidth,
  }

  previousLeft = 0

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderGrant: (evt, gestureState) => true,
      onPanResponderMove: this.onPanResponderMove,
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: this.onPanResponderEnd,
      onPanResponderTerminate: this.onPanResponderEnd,
      onShouldBlockNativeResponder: (evt, gestureState) => true,
    })
  }

  componentWillReceiveProps() {
    this.closeMenu()
    LayoutAnimation.configureNext(CustomLayoutLinear)
  }

  onPanResponderMove = (evt, gestureState) => {
    let newLeft = this.previousLeft + gestureState.dx
    if (newLeft < 0) {
      newLeft = 0
    }
    if (newLeft > menuWidth) {
      newLeft = menuWidth
    }
    this.state.left.setValue(newLeft)
  }

  openMenu = () => {
    this.previousLeft = menuWidth
    this.setState({touchWidth: screenWidth})
    Animated.spring(
      this.state.left,
      {
        toValue: menuWidth,
      }
    ).start()
  }

  closeMenu = () => {
    this.previousLeft = 0
    this.setState({touchWidth})
    Animated.spring(
      this.state.left,
      {
        toValue: 0,
      }
    ).start()
  }

  onPanResponderEnd = (evt, gestureState) => {
    const left = this.previousLeft + gestureState.dx
    if (left > menuWidth / 2) {
      this.openMenu()
    } else {
      this.closeMenu()
    }
  }

  render() {
    const Day = this.props.day
    return (
      <Animated.View
        style={[styles.main, this.state.showMenu && {
          left: this.state.left,
        }]}>
        <Day />
        <View
          {...this._panResponder.panHandlers}
          style={[styles.touchArea, {
            width: this.state.touchWidth,
          }]} />
      </Animated.View>
    )
  }
}

export default class Day26 extends Component {
  state = {
    day: Day22,
  }

  _goToDay = (index) => {
    let day
    switch (index) {
    case 22:
      day = Day22
      break
    case 24:
      day = Day24
      break
    case 25:
      day = Day25
      break
    default:
      day = Day22
    }
    this.setState({day})
  }

  render() {
    return (
      <View style={styles.container}>
        <Menu goToDay={(index) => this._goToDay(index)} />
        <Main day={this.state.day} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    height: 48,
    justifyContent: 'center',
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#fff',
  },
  text: {
    color: 'white',
    fontWeight: '500',
    textAlign: 'center',
  },
  main: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: screenHeight,
    width: screenWidth,
    backgroundColor: 'white',
  },
  menu: {
    backgroundColor: '#893D54',
    width: menuWidth,
    height: screenHeight,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
  },
  touchArea: {
    width: touchWidth,
    position: 'absolute',
    height: screenHeight,
    left: 0,
    top: 0,
  },
})
