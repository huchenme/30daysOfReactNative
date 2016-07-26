import React, {Component, PropTypes} from 'react'
import * as dimensions from './dimensions'
import {
  Animated,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  TouchableHighlight,
  View,
  PanResponder,
  LayoutAnimation,
} from 'react-native'
import Day22 from './Day22'
import Day24 from './Day24'
import Day25 from './Day25'

const menuWidth = 150
const minLeft = -menuWidth - 10
const customLayoutLinear = {
  duration: 200,
  create: {
    type: LayoutAnimation.Types.linear,
    property: LayoutAnimation.Properties.left,
  },
  update: {
    type: LayoutAnimation.Types.easeInEaseOut,
  },
}

const Row = ({children}) => (
  <TouchableHighlight
    underlayColor='rgba(255,255,255,0.15)'
    style={styles.row}
    onPress={this.props.onPress}>
    <Text style={styles.text}>
      {this.props.children}
    </Text>
  </TouchableHighlight>
)
Row.propTypes = {
  children: PropTypes.any.isRequired,
  onPress: PropTypes.func,
}

const Menu = () => (
  <View style={styles.menu}>
    <Row onPress={()=>{console.log('day 22')}}>Day 22</Row>
    <Row onPress={()=>{console.log('day 24')}}>Day 24</Row>
    <Row onPress={()=>{console.log('day 25')}}>Day 25</Row>
  </View>
)

export default class Day26 extends Component {
  state = {
    showDrop: false,
    dropOpacity: 0,
    menuLeft: minLeft,
  }

  previousMenuLeft = minLeft
  previousDropOpacity = 0

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderGrant: (evt, gestureState) => {
        this.setState({showDrop: true})
      },
      onPanResponderMove: this.onPanResponderMove,
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: this.onPanResponderEnd,
      onPanResponderTerminate: this.onPanResponderEnd,
      onShouldBlockNativeResponder: (evt, gestureState) => true,
    })
  }

  onPanResponderMove = (evt, gestureState) => {
    let newMenuLeft = this.previousMenuLeft + gestureState.dx
    let newDropOpacity = this.previousDropOpacity + Math.pow((gestureState.dx / -minLeft), 0.5)
    if (newMenuLeft > 0) {
      newMenuLeft = 0
      newDropOpacity = 1
    }
    if (newMenuLeft < minLeft) {
      newMenuLeft = minLeft
      newDropOpacity = 0
    }
    this.setState({
      menuLeft: newMenuLeft,
      dropOpacity: newDropOpacity,
    })
  }

  closeMenu = () => {
    this.previousMenuLeft = minLeft
    this.newDropOpacity = 0
    this.setState({
      dropOpacity: 0,
      menuLeft: minLeft,
      showDrop: false,
    })
    LayoutAnimation.configureNext(customLayoutLinear)
  }

  openMenu = () => {
    this.previousMenuLeft = 0
    this.newDropOpacity = 1
    this.setState({
      dropOpacity: 1,
      menuLeft: 0,
    })
    LayoutAnimation.configureNext(customLayoutLinear)
  }

  onPanResponderEnd = (evt, gestureState) => {
    if (gestureState.vx < 0 || gestureState.dx < 0) {
      this.closeMenu()
    } else if (gestureState.vx > 0 || gestureState.dx > 0) {
      this.openMenu()
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.menuContainer}>
          <Menu />
        </View>
        <Animated.View style={styles.container} {...this._panResponder.panHandlers}>
          <Day22 />
        </Animated.View>
        {false && this.state.showDrop && (
          <TouchableWithoutFeedback onPress={() => {this.closeMenu()}}>
            <View style={[styles.drop, {opacity: this.state.dropOpacity}]} />
          </TouchableWithoutFeedback>
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
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
  menuContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: menuWidth + 20,
  },
  menu: {
    backgroundColor: '#893D54',
    width: menuWidth,
    height: dimensions.screenHeight,
    justifyContent: 'center',
  },
})
