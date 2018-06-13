import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dimensions from 'Dimensions';
import {StyleSheet, View, TextInput, Image} from 'react-native';
import { TextField } from 'react-native-material-textfield';

export default class UserInput extends Component {
  render() {

    return (
      <View style={styles.container}>
        <TextField
          value={this.props.inputValue}
          label={this.props.label}
          secureTextEntry={this.props.password}
          autoCapitalize='none'
          autoCorrect={false}
          onChangeText={(e) => this.props.handleChange(e)}
          textColor="white"
          baseColor="white"
        />
      </View>
    );
  }
}

UserInput.propTypes = {
  password: PropTypes.bool,
  label: PropTypes.string,
};

UserInput.defaultProp = {
  password : false,
  label : ""
}

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
   margin: 15,
   marginTop: 20,
  }
});
