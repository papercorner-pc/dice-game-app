import React, {useState} from 'react';
import {View, Text, Pressable} from 'react-native';
import styles from './styles';

export default function MaterialTab({data, onSelect, selectedOption}) {
  const [userOption, setUserOption] = useState(selectedOption);
  const selectHandler = value => {
    onSelect(value);
    setUserOption(value);
  };
  return (
    <View style={styles.tabContainer}>
      {data.map((item, index) => {
        return (
          <Pressable
            key={index}
            style={[
              item.value === userOption ? styles.selected : styles.unselected,
              index === 0 && {
                borderTopLeftRadius: 12,
                borderBottomLeftRadius: 12,
              },
              data.length === index + 1 && {
                borderTopRightRadius: 12,
                borderBottomRightRadius: 12,
              },
            ]}
            onPress={() => selectHandler(item.value)}>
            <Text
              style={[
                item.value === userOption
                  ? styles.selectedText
                  : styles.unSelectedText,
              ]}>
              {item.value}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
