import React, {Component, PropTypes} from 'react'
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
} from 'react-native'
import PasswordGesture from 'react-native-gesture-password'

class SetPassword extends Component{
  static propTypes = {
    password: PropTypes.string.isRequired,
    setPassword: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props)
    this.state = {
      password: this.props.password,
      message: 'Please set your password.',
      status: 'normal',
    }
  }

  onStart = () => {
    if (this.state.password === '') {
      this.setState({
        message: 'Please set your password.',
      })
    } else {
      this.setState({
        message: 'Please input your password for the second time.',
      })
    }
  }

  onEnd(password) {
    if (this.state.password === '') {
      this.setState({
        password,
        status: 'normal',
        message: 'Please input your password for the second time.',
      })
    } else {
      if (password === this.state.password) {
        this.setState({
          status: 'right',
          message: 'Your password is set',
        })
        this.props.setPassword(password)
      } else {
        this.setState({
          status: 'wrong',
          message: 'Not the same, try again.',
        })
      }
    }
  }

  render() {
    return (
      <PasswordGesture
        style={styles.setPg}
        status={this.state.status}
        message={this.state.message}
        allowCross
        onStart={this.onStart}
        onEnd={(password) => this.onEnd(password)}
      />
    )
  }
}

export class EnterPassword extends Component{
  static propTypes = {
    enterPassword: PropTypes.func.isRequired,
    password: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props)
    this.state = {
      password: this.props.password,
      message: 'Unlock with your password.',
      status: 'normal',
    }
  }

  onStart = () => {
    this.setState({
      status: 'normal',
      message: 'Unlock your password.',
    })
  }

  onEnd = (password) => {
    if (password == this.state.password) {
      this.setState({
        status: 'right',
        message: 'Password is right, success.',
      })
      this.props.enterPassword()
    } else {
      this.setState({
        status: 'wrong',
        message: 'Password is wrong, try again.',
      })
    }
  }

  render() {
    return (
      <PasswordGesture
        status={this.state.status}
        message={this.state.message}
        allowCross
        onStart={this.onStart}
        onEnd={(password) => this.onEnd(password)}
      />
    )
  }
}

export default class Day16 extends Component {
  state = {
    password: '',
    hasSet: false,
    enterApp: false,
  }

  componentWillMount() {
    StatusBar.setBarStyle('light-content')
  }

  _setPassword = (password) => {
    this.setState({
      password: password,
      hasSet: true,
    })
  }

  _enterPassword = () => {
    this.setState({
      enterApp: true,
    })
  }

  renderContent = () => {
    if (this.state.hasSet) {
      if (this.state.enterApp) {
        return (
          <View style={styles.app}>
            <Text style={styles.appText}>You are in the app!</Text>
          </View>
        )
      } else {
        return (
          <EnterPassword
            enterPassword={this._enterPassword}
            password={this.state.password}
          />
        )
      }
    } else {
      return (
        <SetPassword
          setPassword={(password) => this._setPassword(password)}
          password={this.state.password}
        />
      )
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderContent()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#012642',
  },
  app: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appText: {
    color: '#fff',
    fontSize: 25,
  },
})
