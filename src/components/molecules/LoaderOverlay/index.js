import React from 'react';
import {  View, ActivityIndicator } from 'react-native';
import styles from './styles';
import { Colors } from '../../../theme/colors';

const LoaderOverlay = ({show, color, overrideOverlayStyle = {}, size, containerOverrideStyles = {}}) => {

    if (!show) {
      return null;
    }

    return (
      <View style={[styles.overlay, overrideOverlayStyle]}>
        <View style={[styles.container, containerOverrideStyles]}>
          <ActivityIndicator size={size || 'small'} color={color || Colors.themeColor} />
        </View>
      </View>
    );
}
export default LoaderOverlay;
