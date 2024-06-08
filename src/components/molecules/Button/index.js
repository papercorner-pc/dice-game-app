import React from 'react'
import { TouchableOpacity, Text, ActivityIndicator, Image } from 'react-native'
import Styles from './styles'
import FastImageWrapper from '../FastImage'
import { Colors } from '../../../theme/colors'
import { useTheme } from '../../../theme'

const ButtonComponent = ({
  wrapperStyles = {},
  textStyles = {},
  onPress,
  loaderColor = '#fff',
  text,
  isLoading,
  isDisabled,
  buttonColor = Colors.themeColor,
  showImage = false,
  image
}) => {
  const { layout } = useTheme();
  return (
    <>
      <TouchableOpacity
        style={[Styles.wrapper, wrapperStyles, {backgroundColor: isDisabled ? Colors.disabledColor: buttonColor}]}
        onPress={onPress}
        disabled={isDisabled}
        activeOpacity={0.9}
      >
        {isLoading ? (
          <ActivityIndicator color={loaderColor} />
        ) : (
          <>
            {showImage ? 
            <FastImageWrapper source={image} tintColor={Colors.white} resizeMode="contain" style={{ height: 20, width: 20}} />
            :
          <Text style={[Styles.text, textStyles]}>{text}</Text>}
          </>
        )}
      </TouchableOpacity>
    </>
  )
}

export default ButtonComponent
