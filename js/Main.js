import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  Text,
  View
} from 'react-native';
import Day1 from './components/Day1';

export default class Main extends Component {
  goToDay1 = () => {
    this.props.navigator.push({
      title: 'Day 1',
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
    alignItems: 'center',
    justifyContent: 'center',
  }
});
