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
  constructor(props) {
    super(props);
    this.state = {
      showPass: true,
      press: false,
    };
    this.showPass = this.showPass.bind(this);
  }

  showPass() {
    this.state.press === false
      ? this.setState({showPass: false, press: true})
      : this.setState({showPass: true, press: false});
  }



  render() {
    return (
      <KeyboardAvoidingView behavior="padding" >

        <UserInput
          inputValue= {this.props.username}
          handleChange={this.props.handleUserInput}
          nbTry = {this.props.nbTry}
          label={"Username"}
          errorLabel={"Can't authenticate"}
          error= {this.props.error}
        />

          <UserInput

            secureTextEntry={this.state.showPass}
            inputValue= {this.props.password}
            handleChange={this.props.handlePassword}
            label={"Password"}

          />

      </KeyboardAvoidingView>
    );
  }
}
