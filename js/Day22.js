import React, {Component} from 'react'
import {
  View,
  Text,
  Image,
  Animated,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native'
import {screenWidth, screenHeight} from './dimensions'
import Icon from 'react-native-vector-icons/Ionicons'
const AnimatedIcon = Animated.createAnimatedComponent(Icon)

export default class Day22 extends Component {
  state = {
    scale: new Animated.Value(1),
    bottom: new Animated.Value(-50),
    on: false,
    scaleOn: false,
    micBottom: new Animated.Value(202),
  }

  _onMic = () => {
    this.setState({
      on: true,
    })
    Animated.parallel([
      Animated.spring(
        this.state.micBottom,
        {
          toValue: 77,
        },
      ),
      Animated.spring(
        this.state.scale,
        {
          toValue: 15,
          tension: 100,
          friction: 10,
        },
      ),
      Animated.sequence([
        Animated.delay(200),
        Animated.spring(
          this.state.bottom,
          {
            toValue: 0,
          }
        ),
      ]),
    ]).start()
    setTimeout(() => {
      this.setState({
        scaleOn: true,
      })
    }, 200)
  }

  _offMic = () => {
    Animated.parallel([
      Animated.spring(
        this.state.scale,
        {
          toValue: 1,
          tension: 100,
          friction: 10,
        },
      ),
      Animated.spring(
        this.state.micBottom,
        {
          toValue: 202,
        },
      ),
      Animated.spring(
        this.state.bottom,
        {
          toValue: -50,
          tension: 80,
          friction: 10,
        }
      ),
    ]).start(() => {
      this.setState({
        scaleOn: false,
        on: false,
      })
    })
  }

  render() {
    const textTop = this.state.bottom.interpolate({
      inputRange: [-50, 0],
      outputRange: [-50, 50],
    })
    // const buttonColor = this.state.micBottom.interpolate({
    //   inputRange: [77, 202],
    //   outputRange: ['rgb(254, 34, 34)', 'rgb(255,255,255)'],
    // })
    return (
      <View style={styles.container}>
        <Image source={require('./assets/day22.png')} />
        {this.state.on && (
          <Animated.View style={[styles.mic, {transform: [{scale: this.state.scale}]}]} />
        )}
        <TouchableWithoutFeedback onPress={this._onMic}>
          <Animated.View style={[styles.mic, styles.shadow, {bottom: this.state.micBottom}]}>
            <Image style={styles.micIcon} source={require('./assets/mic.png')} />
          </Animated.View>
        </TouchableWithoutFeedback>
        {this.state.scaleOn && (
          <View style={styles.scaleContainer}>
            <Animated.Text style={[styles.scaleText, {top: textTop}]}>Speak Now</Animated.Text>
            <TouchableWithoutFeedback onPress={this._offMic}>
              <AnimatedIcon
                name='md-close'
                style={[styles.closeIcon, {bottom: this.state.bottom}]}
                color='#969696'
                size={25}
              />
            </TouchableWithoutFeedback>
          </View>
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mic: {
    position: 'absolute',
    left: screenWidth / 2 - 32,
    bottom: 202,
    alignItems: 'center',
    justifyContent: 'center',
    width: 64,
    height: 64,
    backgroundColor: 'white',
    borderRadius: 32,
  },
  shadow: {
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
      width: 0,
    },
  },
  scaleText: {
    color: '#969696',
    fontSize: 25,
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 50,
    left: 25,
  },
  scaleContainer: {
    position: 'absolute',
    height: screenHeight,
    width: screenWidth,
    top: 0,
    left: 0,
  },
  closeIcon: {
    height: 50,
    width: 50,
    position: 'absolute',
    bottom: 0,
    left: 30,
    backgroundColor: 'transparent',
  },
})
