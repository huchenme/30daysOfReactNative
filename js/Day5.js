import React, { Component, PropTypes } from 'react';
import * as colors from './colors';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  MapView,
  TouchableHighlight
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class Day5 extends Component {
  state = {
    isFirstLoad: true,
    mapRegion: undefined,
    annotations: [],
    showsUserLocation: false,
    followUserLocation: false,
  };

  onRegionChangeComplete(region) {
    if (this.state.isFirstLoad) {
      this.setState({
        annotations: [{
          longitude: region.longitude,
          latitude: region.latitude,
          title: 'You Are Here',
        }],
        isFirstLoad: false,
      });
    }
  }

  onButtonPress = () => {
    this.setState({
      showsUserLocation: true,
      followUserLocation: true,
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={{flex: 1}}
          showsUserLocation={this.state.showsUserLocation}
          followUserLocation={this.state.followUserLocation}
          onRegionChangeComplete={(region) => this.onRegionChangeComplete(region)}
          region={this.state.mapRegion}
          annotations={this.state.annotations}
        />
        <View style={styles.buttonContainer}>
          <TouchableHighlight
            style={styles.button}
            underlayColor="#00bd03"
            onPress={this.onButtonPress}>
            <View style={styles.buttonTextWrapper}>
              <Icon name="md-navigate" size={20} color="white" style={styles.icon} />
              <Text style={styles.buttonText}>Find my location</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 64,
  },
  buttonContainer: {
    backgroundColor: '#eee',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 40,
  },
  button: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00a803',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#009302",
    borderRadius: 4,
  },
  buttonTextWrapper: {
    flexDirection: 'row',
  },
  buttonText: {
    color: 'white',
    fontSize: 18
  },
  icon: {
    marginRight: 8,
  }
})
