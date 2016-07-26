import React, {Component} from 'react'
import {
  View,
  Text,
  StyleSheet,
} from 'react-native'

import TouchID from 'react-native-touch-id'

export default class Day19 extends Component {
  state = {
    authenticated: false,
  }

  componentDidMount() {
    TouchID.authenticate('Authenticate Day 19')
    .then(success => {
      this.setState({authenticated: true})
    })
    .catch(error => {
      // Failure code
    })
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.authenticated ? <Text>Day 19</Text> : <Text>You are not authenticated</Text>}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
