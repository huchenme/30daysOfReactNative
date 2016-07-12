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
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TouchableHighlight
                style={styles.controlButton}
                underlayColor={colors.buttonUnderlay}
                onPress={()=>{console.log("on press start")}}>
                <Text
                  style={{
                    color: colors.green,
                    fontSize: 17,
                  }}>
                  Start
                </Text>
              </TouchableHighlight>
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
