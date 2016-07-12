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
  render() {
    return (
      <View style={styles.container}>
        <View style={{
            height: 180,
            alignItems: 'center',
            justifyContent: 'center',
            borderBottomColor: colors.separator,
            borderBottomWidth: StyleSheet.hairlineWidth
          }}>
          <View style={{
              position: 'relative',
            }}>
            <Text style={{
                fontSize: 70,
                fontWeight: '100',
                color: colors.textPrimary
              }}>00:06.20</Text>
            <View style={{
                position: 'absolute',
                top: -17,
                right: 0,
              }}>
              <Text style={{
                  color: colors.textSecondary,
                  fontSize: 21,
                  fontWeight: '300'
                }}>00:02.23</Text>
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
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TouchableHighlight
                disabled
                style={[styles.button, styles.buttonDisabled]}
                underlayColor={colors.buttonUnderlay}
                onPress={()=>{console.log("on press lap")}}>
                <Text
                  style={{
                    color: colors.textSecondary,
                  }}>
                  Lap
                </Text>
              </TouchableHighlight>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TouchableHighlight
                style={styles.button}
                underlayColor={colors.buttonUnderlay}
                onPress={()=>{console.log("on press start")}}>
                <Text
                  style={{
                    color: colors.green,
                  }}>
                  Start
                </Text>
              </TouchableHighlight>
            </View>
          </View>
          <View style={{
              flex: 1,
            }}>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 64
  },
  button: {
    borderRadius: 75,
    height: 75,
    width: 75,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#F7F7F9'
  }
});
