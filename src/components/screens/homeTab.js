import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {Navigation} from 'react-native-navigation';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as  appActions from '../../actions/index';
import { Button } from 'react-native';

export default class Hometab extends Component {

onPressLearnMore(){
  appActions.returnLogin()
}

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
            HOME
        </Text>
        <Button
          onPress={this.onPressLearnMore}
          title="Back"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
          />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
