import {
  Image,
  PanResponder,
  StatusBar,
  StyleSheet,
} from 'react-native'
import React, {Component} from 'react'
import {screenHeight, screenWidth} from './dimensions'
import Icon from 'react-native-vector-icons/Ionicons'

const ballRadius = 45
const minLeft = 0
const minTop = 20
const maxTop = screenHeight - ballRadius * 2
const maxLeft = screenWidth - ballRadius * 2

export default class Day7 extends Component {
  constructor(props) {
    super(props)
    this.previousBallLeft = screenWidth/2 - ballRadius
    this.previousBallTop = screenHeight/2 - ballRadius
    this.state = {
      opacity: 1,
      ballLeft: this.previousBallLeft,
      ballTop: this.previousBallTop,
    }
  }

  componentWillMount() {
    StatusBar.setBarStyle('light-content')
    Icon.getImageSource('ios-baseball', 100, 'white').then((source) => this.setState({ballIcon: source}))
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderGrant: this._handlePanResponderGrant,
      onPanResponderMove: this._handlePanResponderMove,
      onPanResponderRelease: this._handlePanResponderEnd,
      onPanResponderTerminate: this._handlePanResponderEnd,
    })
  }

  _handlePanResponderGrant = (evt, gestureState) => {
    this.setState({
      opacity: 0.7,
    })
  }

  _handlePanResponderMove = (evt, gestureState) => {
    let newBallLeft = this.previousBallLeft + gestureState.dx
    let newBallTop = this.previousBallTop + gestureState.dy
    if (newBallLeft < minLeft) {
      newBallLeft = minLeft
    }
    if (newBallTop < minTop) {
      newBallTop = minTop
    }
    if (newBallLeft > maxLeft) {
      newBallLeft = maxLeft
    }
    if (newBallTop > maxTop) {
      newBallTop = maxTop
    }
    this.setState({
      ballLeft: newBallLeft,
      ballTop: newBallTop,
    })
  }

  _handlePanResponderEnd = (evt, gestureState) => {
    this.previousBallLeft = this.state.ballLeft
    this.previousBallTop = this.state.ballTop
    this.setState({
      opacity: 1,
    })
  }

  render() {
    return (
      <Image
        resizeMode="cover"
        source={require('./assets/agrass.png')}
        style={styles.container}>
        <Image
          {...this._panResponder.panHandlers}
          source={this.state.ballIcon}
          style={[styles.icon, {
            left: this.state.ballLeft,
            top: this.state.ballTop,
            opacity: this.state.opacity,
          }]} />
      </Image>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    width: screenWidth,
    height: screenHeight,
    justifyContent: 'center',
  },
  icon: {
    position: 'absolute',
    height: ballRadius*2,
    width: ballRadius*2,
    borderRadius: ballRadius,
  },
})
