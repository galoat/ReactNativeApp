import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dimensions from 'Dimensions';
import {
  StyleSheet,
  KeyboardAvoidingView,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from 'react-native';

import UserInput from './UserInput';
import ButtonSubmit from './ButtonSubmit';
import SignupSection from './SignupSection';


import * as  appActions from '../../../actions/index';

export default class Form extends Component {
  render() {
    return (
    <View>
      <View>
        <UserInput
          inputValue= {this.props.username}
          handleChange={this.props.handleUserInput}
          nbTry = {this.props.nbTry}
          label={"Username"}
          errorLabel={"Can't authenticate"}
          error= {this.props.error}
        />
      </View>
        <View>
          <UserInput

            secureTextEntry={true}
            inputValue= {this.props.password}
            handleChange={this.props.handlePassword}
            label={"Password"}

          />
  </View>
</View>
    );
  }
}
