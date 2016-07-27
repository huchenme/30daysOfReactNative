import React, {Component} from 'react'
import {
  Animated,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import {screenHeight, screenWidth} from './dimensions'
import {BlurView} from 'react-native-blur'

export default class Day10 extends Component {
  state = {
    show: false,
    shift: new Animated.Value(-120),
  }

  componentWillMount() {
    StatusBar.setBarStyle('light-content')
  }

  _showMenu = () => {
    this.setState({
      show: true,
    })

    Animated.spring(
      this.state.shift,
      {
        toValue: 50,
        tension: 80,
      },
    ).start()
  }

  _hideMenu = () => {
    Animated.spring(
      this.state.shift,
      {
        toValue: -120,
        tension: 100,
      },
    ).start()

    setTimeout(() => {
      this.setState({
        show: false,
      })
    }, 500)
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.bg}
          resizeMode='cover'
          source={require('./assets/day10/tumblr.png')} />
        <TouchableWithoutFeedback onPress={this._showMenu}>
          <View style={styles.touchBar} />
        </TouchableWithoutFeedback>
        {
          this.state.show && (
            <BlurView blurType='dark' style={styles.blur}>
              <Animated.View style={[styles.menuItem, styles.menuItem1, {left: this.state.shift}]}>
                <Image
                  style={styles.menuItemImage}
                  source={require('./assets/day10/tumblr-text.png')} />
                <Text style={styles.menuItemText}>Text</Text>
              </Animated.View>
              <Animated.View style={[styles.menuItem, styles.menuItem2, {right: this.state.shift}]}>
                <Image
                  style={styles.menuItemImage}
                  source={require('./assets/day10/tumblr-photo.png')} />
                <Text style={styles.menuItemText}>Photo</Text>
              </Animated.View>
              <Animated.View style={[styles.menuItem, styles.menuItem3, {left: this.state.shift}]}>
                <Image
                  style={styles.menuItemImage}
                  source={require('./assets/day10/tumblr-quote.png')} />
                <Text style={styles.menuItemText}>Quote</Text>
              </Animated.View>
              <Animated.View style={[styles.menuItem, styles.menuItem4, {right: this.state.shift}]}>
                <Image
                  style={styles.menuItemImage}
                  source={require('./assets/day10/tumblr-link.png')} />
                <Text style={styles.menuItemText}>Link</Text>
              </Animated.View>
              <Animated.View style={[styles.menuItem, styles.menuItem5, {left: this.state.shift}]}>
                <Image
                  style={styles.menuItemImage}
                  source={require('./assets/day10/tumblr-chat.png')} />
                <Text style={styles.menuItemText}>Chat</Text>
              </Animated.View>
              <Animated.View style={[styles.menuItem, styles.menuItem6, {right: this.state.shift}]}>
                <Image
                  style={styles.menuItemImage}
                  source={require('./assets/day10/tumblr-audio.png')} />
                <Text style={styles.menuItemText}>Audio</Text>
              </Animated.View>
              <TouchableHighlight
                underlayColor='transparent'
                onPress={this._hideMenu}
                style={styles.dismiss}>
                <Text style={styles.dismissText}>NeverMind</Text>
              </TouchableHighlight>
            </BlurView>
          )
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#37465c',
  },
  bg: {
    height: screenHeight - 20,
    width: screenWidth,
  },
  blur: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: screenWidth,
    height: screenHeight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuItem: {
    position: 'absolute',
  },
  menuItemImage: {
    width: 120,
    height: 100,
    resizeMode: 'contain',
  },
  menuItemText: {
    color: 'white',
    textAlign: 'center',
  },
  menuItem1: {
    top: 80,
    left: 50,
  },
  menuItem2: {
    top: 80,
    right: 50,
  },
  menuItem3: {
    top: 250,
    left: 50,
  },
  menuItem4: {
    top: 250,
    right: 50,
  },
  menuItem5: {
    top: 420,
    left: 50,
  },
  menuItem6: {
    top: 420,
    right: 50,
  },
  dismiss: {
    position: 'absolute',
    width: screenWidth,
    left: 0,
    bottom: 50,
  },
  dismissText: {
    textAlign: 'center',
    color: 'rgba(255,255,255,0.2)',
    fontWeight: '700',
  },
  touchBar: {
    position: 'absolute',
    backgroundColor: 'transparent',
    bottom: 0,
    left: 0,
    width: screenWidth,
    height: 50,
  },
})
