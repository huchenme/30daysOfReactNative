import React, { Component } from 'react';
import * as colors from './colors';
import {
  View,
  Text,
  StyleSheet,
  ListView,
  TouchableHighlight,
} from 'react-native';

export default class Day1 extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      started: false,
      running: false,
      initialTime: 0,
      currentTime: 0,
      accumulatedTime: 0,
      dataSource: ds.cloneWithRows([
        {
          lap: 3,
          time: '00:00.51'
        },
        {
          lap: 2,
          time: '00:01.20'
        },
        {
          lap: 1,
          time: '00:04.49'
        },
      ])
    };
  }

  timeDisplay = (time) => {
    const mini_sec_num = Math.floor(time / 10);
    const sec_num = Math.floor(mini_sec_num / 100);
    const hours = Math.floor(sec_num / 3600);
    const minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    const seconds = sec_num - (hours * 3600) - (minutes * 60);
    const miniSeconds = mini_sec_num - sec_num * 100;

    const hoursString = hours < 10 ? `0${hours}` : hours;
    const miniutesString = minutes < 10 ? `0${minutes}` : minutes;
    const secondsString = seconds < 10 ? `0${seconds}` : seconds;
    const miniSecondsString = miniSeconds < 10 ? `0${miniSeconds}` : miniSeconds;
    return `${miniutesString}:${secondsString}.${miniSecondsString}`
  }

  totalTimeDisplay = () => {
    const totalTime = this.state.currentTime - this.state.initialTime + this.state.accumulatedTime;
    return this.timeDisplay(totalTime);
  }

  currentTime = () => {
    return (new Date()).getTime();
  }

  startTimer = () => {
    console.log('start timer');
    const currentTime = this.currentTime();
    if (!this.state.started) {
      this.setState({
        started: true,
        running: true,
        accumulatedTime: 0,
        initialTime: currentTime,
        currentTime
      })
    } else {
      this.setState({
        running: true,
        initialTime: currentTime,
        currentTime
      })
    }
    this._interval = setInterval(
      () => {
        this.setState({
          currentTime: this.currentTime(),
        })
        if (!this.state.running) {

          clearInterval(interval)
        }
      }
    , 10)
  }

  stopTimer = () => {
    console.log('stop timer');
    if (this._interval) {
      this.setState({
        running: false,
        initialTime: this.state.currentTime,
        accumulatedTime: this.state.currentTime - this.state.initialTime + this.state.accumulatedTime,
      })
      clearInterval(this._interval)
      this._interval = null;
    }
  }

  resetTimer = () => {
    this.setState({
      started: false,
      running: false,
      initialTime: 0,
      currentTime: 0,
      accumulatedTime: 0,
    })
  }

  startButton = () => (
    <TouchableHighlight
      style={styles.controlButton}
      underlayColor={colors.buttonUnderlay}
      onPress={this.startTimer}>
      <Text
        style={{
          color: colors.green,
          fontSize: 17,
        }}>
        Start
      </Text>
    </TouchableHighlight>
  )

  stopButton = () => (
    <TouchableHighlight
      style={styles.controlButton}
      underlayColor={colors.buttonUnderlay}
      onPress={this.stopTimer}>
      <Text
        style={{
          color: colors.red,
          fontSize: 17,
        }}>
        Stop
      </Text>
    </TouchableHighlight>
  )

  rightButton = () => {
    if (this.state.running) {
      return this.stopButton();
    } else {
      return this.startButton();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.watchFace}>
          <View style={{
              position: 'relative',
            }}>
            <Text style={{
                fontSize: 70,
                fontWeight: '100',
                color: colors.textPrimary
              }}>{this.totalTimeDisplay()}</Text>
            <View style={{
                position: 'absolute',
                top: -17,
                right: 0,
              }}>
              <Text style={{
                  color: colors.textSecondary,
                  fontSize: 21,
                  fontWeight: '300'
                }}>{this.totalTimeDisplay()}</Text>
            </View>
          </View>
        </View>
        <View style={{
            flex: 1,
            backgroundColor: '#EFEFF4'
          }}>
          <View
            style={{
              height: 118,
              flexDirection: 'row'
            }}>
            <View style={styles.controlButtonContainer}>
              <TouchableHighlight
                disabled
                style={[styles.controlButton, styles.buttonDisabled]}
                underlayColor={colors.buttonUnderlay}
                onPress={()=>{console.log("on press lap")}}>
                <Text
                  style={{
                    color: colors.textSecondary,
                    fontSize: 17,
                  }}>
                  Lap
                </Text>
              </TouchableHighlight>
            </View>
            <View style={styles.controlButtonContainer}>
              {this.rightButton()}
            </View>
          </View>
          <View style={{
              flex: 1,
            }}>
            <ListView
              automaticallyAdjustContentInsets={false}
              dataSource={this.state.dataSource}
              renderRow={(rowData) => (
                <View style={{
                    paddingLeft: 45,
                    paddingRight: 45,
                    height: 44,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={{
                      color: colors.textSecondary,
                      fontSize: 17
                    }}>Lap {rowData.lap}</Text>
                  <Text style={{
                      color: colors.textPrimary,
                      fontSize: 22,
                      fontWeight: '300'
                    }}>{rowData.time}</Text>
                </View>
              )}
              renderSeparator={(sectionID, rowID, adjacentRowHighlighted) => (
                <View
                  key={`${sectionID}-${rowID}`}
                  style={{
                    marginLeft: 15,
                    height: StyleSheet.hairlineWidth,
                    backgroundColor: colors.separator,
                  }}
                />
              )}
            />
          </View>
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
  watchFace: {
    height: 180,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: colors.separator,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  controlButtonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlButton: {
    borderRadius: 75,
    height: 75,
    width: 75,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#F7F7F9',
  },
});
