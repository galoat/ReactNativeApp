import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dimensions from 'Dimensions';
import {StyleSheet, Image, View} from 'react-native';

import bgSrc from '../../../img/logo.png';

export default class Wallpaper extends Component {
  render() {
    return (
      <View style={styles.container}>
      <Image style={styles.picture} source={bgSrc}>
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  picture: {
    flex: 0.8,
    height: DEVICE_HEIGHT,
    width:DEVICE_WIDTH / 2,
    resizeMode: 'contain',
  },
});
