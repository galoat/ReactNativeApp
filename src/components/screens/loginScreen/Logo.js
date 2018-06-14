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
    flex:0.8,
    paddingTop:40,
    height: DEVICE_HEIGHT*20/100,
    width:DEVICE_WIDTH *70 / 100,
    resizeMode: 'contain',
  },
});
