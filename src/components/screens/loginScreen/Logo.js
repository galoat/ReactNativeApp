import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dimensions from 'Dimensions';
import {StyleSheet, Image, View} from 'react-native';

import bgSrc from '../../../img/logo.png';

export default class Wallpaper extends Component {
  render() {
    return (
      <View style={styles.container}>
      <Image style={styles.picture} source={bgSrc}  testID='welcome'>
        {this.props.children}
      </Image>
    </View>
    );
  }
}
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    marginTop:20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  picture: {
    paddingTop: 50,
    height: DEVICE_HEIGHT*30/100,
    width:DEVICE_WIDTH *80 / 100,
    resizeMode: 'contain',
  },
});
