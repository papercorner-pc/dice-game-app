import React from 'react';
import FastImage from 'react-native-fast-image';
import {StyleSheet, Text, View} from 'react-native';
import {FontFamily} from '../../../theme/fonts';

function EmptyComponent({image, text}) {
  return (
    <View style={styles.container}>
      <FastImage
        source={image}
        style={{
          height: 80,
          width: 80,
          marginBottom: 10,
        }}
        resizeMode="contain"
      />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

export default EmptyComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 14,
    fontFamily: FontFamily.poppinsMedium,
    color: '#070A0D',
  },
});
