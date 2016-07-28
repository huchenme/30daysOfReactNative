import React, {Component} from 'react'
import {
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableOpacity,
  ActivityIndicator,
  AlertIOS,
} from 'react-native'

const API_URL = 'http://demo9383702.mockable.io/users'

export default class Day22 extends Component {
  constructor(props) {
    super(props)
    this.state = this._getInitialState()
    this.bindMethods()
  }

  _getInitialState() {
    const getSectionData = (dataBlob, sectionID) => {
      return dataBlob[sectionID]
    }

    const getRowData = (dataBlob, sectionID, rowID) => {
      return dataBlob[`${sectionID}:${rowID}`]
    }

    return {
      loaded: false,
      dataSource: new ListView.DataSource({
        getSectionData,
        getRowData,
        rowHasChanged: (row1, row2) => row1 !== row2,
        sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
      }),
    }
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData () {
    fetch(API_URL).then((response) => response.json()).then((responseData) => {
      const organizations = responseData.results
      const length = organizations.length
      const dataBlob = {}
      const sectionIDs = []
      const rowIDs = []
      let organization
      let users
      let userLength
      let user
      let i
      let j

      for (i = 0; i < length; i++) {
        organization = organizations[i]

        sectionIDs.push(organization.id)
        dataBlob[organization.id] = organization.organization

        users = organization.users
        userLength = users.length

        rowIDs[i] = []

        for(j = 0; j < userLength; j++) {
          user = users[j].user
          rowIDs[i].push(user.md5)

          dataBlob[`${organization.id}:${user.md5}`] = user
        }
      }

      this.setState({
        dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs),
        loaded: true,
      })
    }).done()
  }

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView()
    }

    return this.renderListView()
  }

  renderLoadingView() {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>User List</Text>
        <View style={styles.container}>
          <ActivityIndicator
            animating={!this.state.loaded}
            style={[styles.activityIndicator, {height: 80}]}
            size='large'
          />
        </View>
      </View>
    )
  }

  renderListView() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>User List</Text>
        </View>
        <ListView
          dataSource={this.state.dataSource}
          style={styles.listview}
          renderRow={this.renderRow}
          renderSectionHeader={this.renderSectionHeader}
        />
      </View>
    )
  }

  renderSectionHeader(sectionData, sectionID) {
    return (
      <View style={styles.section}>
        <Text style={styles.text}>{sectionData}</Text>
      </View>
    )
  }

  renderRow = (rowData, sectionID, rowID) => {
    return (
      <TouchableOpacity onPress={() => this.onPressRow(rowData, sectionID)}>
        <View style={styles.rowStyle}>
          <Text style={styles.rowText}>{rowData.name.title} {rowData.name.first} {rowData.name.last}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  onPressRow = (rowData, sectionID) => {
    AlertIOS.alert(`User's Email is ${rowData.email}`)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  activityIndicator: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3F51B5',
    flexDirection: 'column',
    paddingTop: 25,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
  },
  text: {
    color: 'white',
    paddingHorizontal: 8,
    fontSize: 16,
  },
  rowStyle: {
    paddingVertical: 20,
    paddingLeft: 16,
    borderTopColor: 'white',
    borderLeftColor: 'white',
    borderRightColor: 'white',
    borderBottomColor: '#E0E0E0',
    borderWidth: 1,
  },
  rowText: {
    color: '#212121',
    fontSize: 16,
  },
  subText: {
    fontSize: 14,
    color: '#757575',
  },
  section: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 6,
    backgroundColor: '#2196F3',
  },
})
