import React, { useEffect } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './styles';
import homeImage from '../../../theme/assets/images/home.png';
import walletImage from '../../../theme/assets/images/wallet.png';
import gameImage from '../../../theme/assets/images/gameIcon.png';
import historyImage from '../../../theme/assets/images/history.png';
import profileImage from '../../../theme/assets/images/profile.png';
import { Colors } from '../../../theme/colors';
import LinearGradient from 'react-native-linear-gradient';

const getIcon = (route, isFocused) => {
  let iconName = homeImage;
  switch (route) {
    case 'Home':
    case 'AdminHome':
    case 'AgentHome':
      iconName = homeImage;
      break;
    case 'Wallet':
    case 'AdminWallet':
    case 'AgentWallet':
      iconName = walletImage;
      break;
    case 'Game':
    case 'AdminContest':
    case 'AgentContest':
      iconName = gameImage;
      break;
    case 'History':
    case 'AdminHistory':
    case 'AgentHistory':
      iconName = historyImage;
      break;
    case 'Profile':
    case 'AdminProfile':
    case 'AgentProfile':
      iconName = profileImage;
      break;
    default:
      iconName = homeImage;
      break;
  }
  return (
    <Image
      tintColor={
        route === 'Game' || route === 'AdminContest' || route === 'AgentContest'
          ? null
          : isFocused
            ? Colors.white
            : '#C4BCCA'
      }
      source={iconName}
      style={{
        width: route === 'Game' || route === 'AdminContest' || route === 'AgentContest' ? 85 : 25,
        height: route === 'Game' || route === 'AdminContest' || route === 'AgentContest' ? 85 : 25,
        marginTop: route === 'Game' || route === 'AdminContest' || route === 'AgentContest' ? -30 : 0,
      }}
      resizeMode="contain"
    />
  );
};

function CustomTabBars({ state, descriptors, navigation }) {
  return (
    <LinearGradient
      colors={['#412653', '#2E1B3B']}
      style={styles.bottomTabContainer}>
      {state.routes.map((route, minDex) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === minDex;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };
        return (
          <TouchableOpacity
            accessibilityRole="button"
            activeOpacity={1}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabbarContainer}
            key={minDex}>
            <View style={styles.tatbarView}>
              <View style={{ padding: 5, marginBottom: 5 }}>
                {getIcon(route.name, isFocused)}
              </View>
              {route.name !== 'Game' && route.name !== 'AdminContest' && route.name !== 'AgentContest' ? (
                <Text
                  style={[
                    styles.tatbarText,
                    {
                      color: isFocused ? Colors.white : '#C4BCCA',
                      opacity: isFocused ? 1 : 1,
                    },
                  ]}>
                  {label}
                </Text>
              ) : (
                <></>
              )}
            </View>
          </TouchableOpacity>
        );
      })}
    </LinearGradient>
  );
}

export default CustomTabBars;
