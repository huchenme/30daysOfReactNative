import React, {Component, PropTypes} from 'react'
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import {UIManager} from 'NativeModules'
import ReactNative from 'react/lib/ReactNative'
import {screenHeight} from './dimensions'

// FIXME: performence is really bad using this approach, use Animated instead

const messages = [
  'Ok',
  'good',
  'key?',
  'very long text very long textvery long textvery long text',
]

const initialColors = messages.map(message => ['white', 'white'])

const opacityPerLength = 0.36 / (screenHeight - 64)

class Message extends Component {
  static propTypes = {
    children: PropTypes.any.isRequired,
    colors: PropTypes.array.isRequired,
  }
  render() {
    return (
      <View style={styles.message}>
        <LinearGradient colors={this.props.colors} style={styles.innterMessage}>
          <Text numberOfLines={100} style={styles.text}>{this.props.children}</Text>
        </LinearGradient>
      </View>
    )
  }
}

export default class Day27 extends Component {
  state = {
    colors: initialColors,
  }

  _calculateColor = (position) => {
    const opacity = 1 - (667 - position) * opacityPerLength
    return `rgba(0,122,255,${Math.max(Math.min(opacity, 1), 0)})`
  }

  _changeColor = (index) => {
    const handle = ReactNative.findNodeHandle(this.refs[`message${index}`])
    UIManager.measure(handle, (fx, fy, width, height, px, py) => {
      const colorTop = this._calculateColor(py)
      const colorBottom = this._calculateColor(py + height)
      const colors = this.state.colors
      colors[index] = [colorTop, colorBottom]
      this.setState({
        colors,
      })
    })
  }

  _handleScroll = () => {
    for (let i = 0; i < messages.length; i++) {
      this._changeColor(i)
    }
  }

  render() {
    return (
      <ScrollView
        onScroll={this._handleScroll}
        scrollEventThrottle={16}
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
        {messages.map((message, index) => (
          <Message
            ref={`message${index}`}
            key={index}
            colors={this.state.colors[index]}>
            {message}
          </Message>
        ))}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    alignItems: 'flex-end',
  },
  message: {
    width: 250,
    alignItems: 'flex-end',
  },
  innterMessage: {
    paddingHorizontal: 10,
    borderRadius: 17,
    marginTop: 1,
    marginRight: 16,
    paddingVertical: 8,
  },
  text: {
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
})
