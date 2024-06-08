import React, {useState} from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import {Colors} from '../../../theme/colors';
import {FontFamily} from '../../../theme/fonts';

export default function GameTab({data, onSelect, selectedOption}) {
  const [userOption, setUserOption] = useState(selectedOption);
  const selectHandler = value => {
    onSelect(value);
    setUserOption(value);
  };
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      {data.map((item, index) => {
        return (
          <Pressable
            key={index}
            style={[
              item.value === userOption ? styles.selected : styles.unselected,
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

const styles = StyleSheet.create({
  selected: {
    // paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DC9C40',
    flex: 1,
    height: 30,
  },
  unselected: {
    // paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    flex: 1,
    height: 30,
  },
  selectedText: {
    fontFamily: FontFamily.poppinsMedium,
    fontSize: 12,
    color: '#070A0D',
    paddingTop: 10,
    marginHorizontal: 10,
  },
  unSelectedText: {
    fontFamily: FontFamily.poppinsMedium,
    fontSize: 12,
    color: '#5F646A',
    paddingTop: 10,
    marginHorizontal: 10,
  },
});
