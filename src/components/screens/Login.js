import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Logo from './loginScreen/Logo';
import Form from './loginScreen/Form';
import ButtonSubmit from './loginScreen/ButtonSubmit';
import Wallpaper from './loginScreen//Wallpaper';
import SignupSection from './loginScreen/SignupSection';

export default class LoginScreen extends Component {
  static navigationOptions = {
  header: null,
  }
  
  render() {
    return (
      <Wallpaper>
        <Logo />
        <Form />
        <SignupSection />
        <ButtonSubmit />
      </Wallpaper>
    );
  }
}
