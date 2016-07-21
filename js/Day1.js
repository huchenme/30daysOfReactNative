import React, {Component} from 'react';
import * as colors from './colors';
import {
  View,
  Text,
  StyleSheet,
  ListView,
  TouchableHighlight,
  Dimensions
} from 'react-native';
import Separator from './Separator';

function convertLapTimingsToDataSource(timings = [], row = 6) {
  let newTimings = timings;
  for (let i = timings.length; i < row; i++) {
    newTimings = [...newTimings, 0];
  }
  return newTimings;
}

export default class Day1 extends Component {
  ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

  state = {
    started: false,
    running: false,
    initialTime: 0,
    initialLapTime: 0,
    currentTime: 0,
    accumulatedTime: 0,
    accumulatedLapTime: 0,
    lapTimings: [],
    rowCount: 0,
    dataSource: this.ds.cloneWithRows([])
  }

  componentWillMount() {
    const {height} = Dimensions.get('window');
    const rowCount = Math.floor((height - 64 - 180 - 118) / 44);
    this.setState({
      rowCount,
      dataSource: this.ds.cloneWithRows(convertLapTimingsToDataSource([], rowCount))
    })
  }

  timeDisplay = (time) => {
    const mini_sec_num = Math.floor(time / 10);
    const sec_num = Math.floor(mini_sec_num / 100);
    const hours = Math.floor(sec_num / 3600);
    const minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    const seconds = sec_num - (hours * 3600) - (minutes * 60);
    const miniSeconds = mini_sec_num - sec_num * 100;

    const miniutesString = minutes < 10 ? `0${minutes}` : minutes;
    const secondsString = seconds < 10 ? `0${seconds}` : seconds;
    const miniSecondsString = miniSeconds < 10 ? `0${miniSeconds}` : miniSeconds;
    return `${miniutesString}:${secondsString}.${miniSecondsString}`
  }

  totalTimeDisplay = () => {
    const totalTime = this.state.currentTime - this.state.initialTime + this.state.accumulatedTime;
    return this.timeDisplay(totalTime);
  }

  lapTimeDisplay = () => {
    const lapTime = this.state.currentTime - this.state.initialLapTime + this.state.accumulatedLapTime;
    return this.timeDisplay(lapTime);
  }

  currentTime = () => {
    return (new Date()).getTime();
  }

  startTimer = () => {
    const currentTime = this.currentTime();
    if (!this.state.started) {
      this.setState({
        started: true,
        running: true,
        accumulatedTime: 0,
        accumulatedLapTime: 0,
        initialTime: currentTime,
        initialLapTime: currentTime,
        currentTime
      })
    } else {
      this.setState({
        running: true,
        initialTime: currentTime,
        initialLapTime: currentTime,
        currentTime
      })
    }
    this._interval = setInterval(
      () => {
        this.setState({
          currentTime: this.currentTime()
        })
      }
    , 10)
  }

  stopTimer = () => {
    if (this._interval) {
      this.setState({
        running: false,
        initialTime: this.state.currentTime,
        initialLapTime: this.state.currentTime,
        accumulatedTime: this.state.currentTime - this.state.initialTime + this.state.accumulatedTime,
        accumulatedLapTime: this.state.currentTime - this.state.initialLapTime + this.state.accumulatedLapTime,
      })
      clearInterval(this._interval)
      this._interval = null;
    }
  }

  lap = () => {
    const currentLapTiming = this.state.currentTime - this.state.initialLapTime + this.state.accumulatedLapTime;
    const newLapTimings = [currentLapTiming, ...this.state.lapTimings]
    this.setState({
      lapTimings: newLapTimings,
      dataSource: this.ds.cloneWithRows(convertLapTimingsToDataSource(newLapTimings, this.state.rowCount)),
      initialLapTime: this.currentTime(),
      accumulatedLapTime: 0
    })
  }

  resetTimer = () => {
    this.setState({
      started: false,
      running: false,
      initialTime: 0,
      initialLapTime: 0,
      currentTime: 0,
      accumulatedTime: 0,
      accumulatedLapTime: 0,
      lapTimings: [],
      dataSource: this.ds.cloneWithRows(convertLapTimingsToDataSource([], this.state.rowCount))
    })
    clearInterval(this._interval)
    this._interval = null;
  }

  componentWillUnmount() {
    clearInterval(this._interval)
    this._interval = null;
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

  lapButton = () => {
    const style = this.state.started ? styles.controlButton : [styles.controlButton, styles.buttonDisabled];
    const textColor = this.state.started ? colors.textPrimary : colors.textSecondary;
    return (
      <TouchableHighlight
        disabled={!this.state.started}
        style={style}
        underlayColor={colors.buttonUnderlay}
        onPress={this.lap}>
        <Text
          style={{
            color: textColor,
            fontSize: 17,
          }}>
          Lap
        </Text>
      </TouchableHighlight>
    )
  }

  resetButton = () => (
    <TouchableHighlight
      style={styles.controlButton}
      underlayColor={colors.buttonUnderlay}
      onPress={this.resetTimer}>
      <Text
        style={{
          color: colors.textPrimary,
          fontSize: 17,
        }}>
        Reset
      </Text>
    </TouchableHighlight>
  )

  leftButton = () => {
    if (this.state.started && !this.state.running) {
      return this.resetButton();
    } else {
      return this.lapButton();
    }
  }

  rightButton = () => {
    if (this.state.running) {
      return this.stopButton();
    } else {
      return this.startButton();
    }
  }

  render() {
    const totalLaps = this.state.lapTimings.length;
    return (
      <View style={styles.container}>
        <View style={styles.watchFace}>
          <View style={{
              position: 'relative',
            }}>
            <Text style={{
                fontSize: 70,
                fontWeight: '100',
                color: colors.textPrimary,
                fontFamily: 'Helvetica Neue'
              }}>{this.totalTimeDisplay()}</Text>
            <View style={{
                position: 'absolute',
                top: -17,
                right: 0,
              }}>
              <Text style={{
                  color: colors.textSecondary,
                  fontSize: 21,
                  fontWeight: '300',
                  fontFamily: 'Helvetica Neue'
                }}>{this.lapTimeDisplay()}</Text>
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
              {this.leftButton()}
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
              enableEmptySections
              renderRow={(rowData, sectionID, rowID) => (
                <View style={{
                    paddingLeft: 45,
                    paddingRight: 45,
                    height: 44,
                    justifyContent: 'center',
                  }}>
                  {rowData > 0 && (
                    <View style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                      <Text style={{
                          color: colors.textSecondary,
                          fontSize: 17
                        }}>Lap {totalLaps - rowID}</Text>
                      <Text style={{
                          color: colors.textPrimary,
                          fontSize: 22,
                          fontWeight: '300',
                          fontFamily: 'HelveticaNeue'
                        }}>{this.timeDisplay(rowData)}</Text>
                    </View>
                  )}
                </View>
              )}
              renderSeparator={(sectionID, rowID, adjacentRowHighlighted) => (
                <Separator key={`${sectionID}-${rowID}`} />
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
