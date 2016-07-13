import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  Text,
  View,
} from 'react-native'
import Day1 from './Day1';

// TODO: run on iOS device and debug
// TODO: change Main to list view

export default class Main extends Component {
  goToDay1 = () => {
    this.props.navigator.push({
      title: 'Stopwatch',
      component: Day1
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight
          onPress={this.goToDay1}
          underlayColor="white">
          <Text>Day 1</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 64,
    alignItems: "center",
    justifyContent: "center",
  }
});
