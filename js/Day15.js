import React, {Component} from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Modal,
  DatePickerIOS,
} from 'react-native'
import moment from 'moment'
import * as colors from './colors'
import NavigationBar from 'react-native-navbar'

export default class Day15 extends Component {
  state = {
    modalVisible: false,
    tempDate: new Date(),
    date: new Date(),
    timeZoneOffsetInHours: (-1) * (new Date()).getTimezoneOffset() / 60,
  }

  _showModal = () => {
    this.setState({
      modalVisible: true,
      tempDate: this.state.date,
    })
  }

  _hideModal = () => {
    this.setState({modalVisible: false})
  }

  _setTime = () => {
    this.setState({
      modalVisible: false,
      date: this.state.tempDate,
    })
  }

  onDateChange = (date) => {
    this.setState({tempDate: date})
  }

  render() {
    return (
      <View style={styles.container}>
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.modalVisible}>
          <View style={{
            flex: 1,
          }}>
            <NavigationBar
              style={styles.navBar}
              statusBar={{
                tintColor: '#F8F8F8',
              }}
              title={{
                title: 'Choose a time',
              }}
              leftButton={{
                title: 'Cancel',
                handler: this._hideModal,
              }}
              rightButton={{
                title: 'Set',
                handler: this._setTime,
              }}
            />
            <View style={{
              flex: 1,
              justifyContent: 'space-around',
            }}>
              <DatePickerIOS
                date={this.state.tempDate}
                mode="date"
                timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
                onDateChange={this.onDateChange}
              />
              <DatePickerIOS
                date={this.state.tempDate}
                mode="time"
                timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
                onDateChange={this.onDateChange}
                minuteInterval={10}
              />
            </View>
          </View>
        </Modal>
        <View>
          <Text
            style={{
              textAlign: 'center',
              marginBottom: 10,
            }}>
            {moment(this.state.date).format('MMMM Do YYYY, h:mm:ss a')}
          </Text>
          <TouchableHighlight
            underlayColor="transparent"
            onPress={this._showModal}>
            <Text
              style={{
                textAlign: 'center',
                color: colors.blue,
              }}>
              Open Modal
            </Text>
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  navBar: {
    backgroundColor: '#F8F8F8',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#D8D8D8',
  },
})
