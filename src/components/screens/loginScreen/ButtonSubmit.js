import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dimensions from 'Dimensions';
import {store} from "../../../store/store"
import {connect} from 'react-redux';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  Animated,
  Easing,
  Image,
  Alert,
  View,
} from 'react-native';

import * as appActions from '../../../actions/index';

import spinner from '../../../img/loading.gif';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const MARGIN = 40;

class ButtonSubmit extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
      nb_try: 0,
      sucess:false
    };

    this.buttonAnimated = new Animated.Value(0);
    this.growAnimated = new Animated.Value(0);
    this._onPress = this._onPress.bind(this);
  }

  componentWillReceiveProps(nextProps){
   console.log("ButtonSubmit: will receive props");
   this.setState(nextProps)
  }
  componentWillUpdate() {
        console.log("ButtonSubmit: will update");
        if (this.state.isLoading == true && this.state.sucess == false) {
          if (this.state.nb_try != 0) {
            this.setState({isLoading: false});
            this.buttonAnimated.setValue(0);
            this.growAnimated.setValue(0);
          }
        }
        if(this.state.sucess){
          console.log("ButtonSubmit - login Sucess - apply _onGrow")
          this._onGrow()
          setTimeout(() => {
              console.log("ButtonSubmit - OnGrow finsh go to next page")
             appActions.afterAnimationSucess();
           }, 300);
        }
  }

  _onPress() {
    if (this.state.isLoading) return;

    store.dispatch(appActions.login(this.state.nb_try));


    this.setState({isLoading: true});
    Animated.timing(this.buttonAnimated, {
      toValue: 1,
      duration: 200,
      easing: Easing.linear,
    }).start();

  }

  _onGrow() {
    Animated.timing(this.growAnimated, {
      toValue: 1,
      duration: 200,
      easing: Easing.linear,
    }).start();
  }


  render() {
    const changeWidth = this.buttonAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [DEVICE_WIDTH - MARGIN, MARGIN],
    });
    const changeScale = this.growAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [1, MARGIN],
    });

    return (
      <View style={styles.container}>
        <Animated.View style={{width: changeWidth}}>
          <TouchableOpacity
            style={styles.button}
            onPress={this._onPress}
            activeOpacity={1}>
            {this.state.isLoading ? (
              <Image source={spinner} style={styles.image} />
            ) : (
              <Text style={styles.text}>LOGIN</Text>
            )}
          </TouchableOpacity>
          <Animated.View
            style={[styles.circle, {transform: [{scale: changeScale}]}]}
          />
        </Animated.View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F035E0',
    height: MARGIN,
    borderRadius: 20,
    zIndex: 100,
  },
  circle: {
    height: MARGIN,
    width: MARGIN,
    marginTop: -MARGIN,
    borderWidth: 1,
    borderColor: '#F035E0',
    borderRadius: 100,
    alignSelf: 'flex-end',
    zIndex: -10,

    backgroundColor: '#F035E0',
  },
  text: {
    color: 'white',
    backgroundColor: 'transparent',
  },
  image: {
    width: 24,
    height: 24,
  },
});


const mapStateToProps = (state) => {
  console.log("Button Submit: map state to props:  try ", state.loginReducer.login_try, " - sucess -", state.loginReducer.login_sucess);
  return Object.assign({}, state, {
    nb_try : state.loginReducer.login_try,
    sucess: state.loginReducer.login_sucess
  });
};

export default connect(mapStateToProps)(ButtonSubmit);
