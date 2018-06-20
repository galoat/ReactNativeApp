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
  constructor(props){
     super(props);
     this.passwordRef = this.updateRef.bind(this, 'password');
     this.onSubmitUser = this.onSubmitUser.bind(this);

  }
  render() {
    return (
      <View>
          <UserInput
            inputValue= {this.props.username}
            handleChange={this.props.handleUserInput}
            nbTry = {this.props.nbTry}
            label={"Username"}
            errorLabel={"Can't authenticate"}
            error= {this.props.error}
            onSubmitEditing={this.onSubmitUser} />

          <UserInput
            ref={this.passwordRef}
            secureTextEntry={true}
            inputValue= {this.props.password}
            handleChange={this.props.handlePassword}
            label={"Password"}  />

          <ButtonSubmit
            nb_try = {this.props.nbTry}
            sucess = { this.props.sucess}
            onPushLogin = {this.props.onPushLogin}
            isLoading = {this.props.isLoading}/>
    </View>

    );
  }

  updateRef(name, ref) {
        this[name] = ref;
  }

  onSubmitUser() {
      this.password.focus();
  }
}
