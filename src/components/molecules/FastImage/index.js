import React, { useState, useMemo, memo } from "react";
import { View, StyleSheet, Image } from "react-native";
 import FastImage from 'react-native-fast-image'
 import Icon from 'react-native-vector-icons/MaterialIcons'

const FastImageWrapper = memo(
  ({
    renderPlaceholder,
    renderErrorImage,
    onError,
    onLoad,
    style,
    tintColor,
    ...otherProps
  }) => {
    const [isLoading, setLoading] = useState(true);
    const [isErrored, setIsErrored] = useState(false);

    const CachedImageMemoized = useMemo(() => {
      return (
        <FastImage
          {...otherProps}
          style={[style]}
          tintColor={tintColor}
          onError={() => {
            setLoading(false);
            setIsErrored(true);
            onError && onError();
          }}
          onLoad={e => {
            setLoading(false);
            onLoad && onLoad(e);
          }}
        />
      );
    }, [onError, onLoad, style, otherProps]);


    const renderPlaceholders = () => {
      return <Icon name="airplay" />
    }

    return (
      <View style={style}>
        {CachedImageMemoized}
        {/* {isLoading && renderPlaceholders()} */}
        {/* {isErrored && renderErrorImage()} */}
      </View>
    );
  }
);
export default FastImageWrapper;