import React, {Component} from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Modal,
  DatePickerIOS,
} from 'react-native'
import NavigationBar from 'react-native-navbar'

export default class Day15 extends Component {
  state = {
    modalVisible: false,
    date: new Date(),
    timeZoneOffsetInHours: (-1) * (new Date()).getTimezoneOffset() / 60,
  }

  _setModalVisible(value) {
    this.setState({modalVisible: value})
  }

  onDateChange = (date) => {
    console.log(date);
    this.setState({date: date})
  }

  onTimezoneChange = (event) => {
    var offset = parseInt(event.nativeEvent.text, 10)
    if (isNaN(offset)) {
      return
    }
    this.setState({timeZoneOffsetInHours: offset})
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
                handler: () => {
                  this._setModalVisible(false)
                },
              }}
              rightButton={{
                title: 'Set',
                handler: () => {
                  this._setModalVisible(false)
                },
              }}
            />
            <View style={{
              flex: 1,
              justifyContent: 'space-around',
            }}>
              <DatePickerIOS
                date={this.state.date}
                mode="date"
                timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
                onDateChange={this.onDateChange}
              />
              <DatePickerIOS
                date={this.state.date}
                mode="time"
                timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
                onDateChange={this.onDateChange}
                minuteInterval={10}
              />
            </View>
          </View>
        </Modal>
        <TouchableHighlight
          underlayColor="transparent"
          onPress={() => {this._setModalVisible(true)}}>
          <Text>Open Modal</Text>
        </TouchableHighlight>
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
