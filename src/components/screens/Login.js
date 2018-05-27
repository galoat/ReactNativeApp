import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Logo from './loginScreen/Logo';
import Form from './loginScreen/Form';
import ButtonSubmit from './loginScreen/ButtonSubmit';
import Wallpaper from './loginScreen//Wallpaper';
import SignupSection from './loginScreen/SignupSection';
import {connect} from 'react-redux';
import {store} from "../../store/store"
import * as appActions from '../../actions/index';
import {Alert} from 'react-native';

 class LoginScreen extends Component {
  static navigationOptions = {
      header: null,
  }
  constructor(props){
     super(props);
     this.state = { try: 0 };
     store.dispatch(appActions.loginInitialized(this.state.try));
  }
  componentWillReceiveProps(nextProps){
    console.log("LoginComponent: will recive props");
    this.setState(nextProps)
  }

    componentWillUpdate(nextProps) {
          console.log("Login: will recive props");
          if (nextProps.try !== this.props.try) {
              if(nextProps.try != 0){
                Alert.alert(
                  'Wrong password',
                  'Wrong password',
                  {
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                  ],
                  { cancelable: false }
                )
              }
          }
      }


  render() {
    return (
      <Wallpaper>
        <Logo />
        <Form />
        <ButtonSubmit  />
        <SignupSection />
      </Wallpaper>
    );
  }

}


const mapStateToProps = (state) => {
  console.log("LoginScreenComponent: map state to props:  try ", state.loginReducer.login_try);
  return Object.assign({}, state, {
    try : state.loginReducer.login_try
  });
};

export default connect(mapStateToProps)(LoginScreen);
