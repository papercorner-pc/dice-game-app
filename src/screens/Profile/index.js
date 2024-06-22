import { SafeScreen } from '../../components/template';
import {
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { FlatList } from 'react-native-gesture-handler';
import { profileList } from '../../utils/constants';
import FastImage from 'react-native-fast-image';
import { FontFamily } from '../../theme/fonts';
import dummy from '../../theme/assets/images/dummy.jpeg';
import edit from '../../theme/assets/images/editImage.png';
import { navigate, navigateAndSimpleReset } from '../../navigators/utils';
import { storage } from '../../App';
import { useQuery } from '@tanstack/react-query';
import { getProfile } from '../../services/users/users';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

const ProfileScreen = props => {
  const { isSuccess, data, isFetching, isLoading, refetch } = useQuery({
    queryKey: ["getProfile"],
    queryFn: () => {
      return getProfile();
    },
  });
  useFocusEffect(
    useCallback(() => {
      refetch()
      return () => {
      };
    }, []), // Empty array means it will run every time the screen is focused
  );
  const _keyExtractor = (item, index) => index.toString();
  const navigateToScreen = url => {
    if (url == 'Logout') {
      storage.delete('auth_token');
      storage.delete('is_admin');
      navigateAndSimpleReset('LoginRoot');
    } else {
      if (!!data) {
        if (url == 'EditProfile') {
          navigate(url, { name: data?.user.name, phone: data?.user.phone_number });
        } else {
          navigate(url);
        }
      }
    }
  };
  const renderPaymentMethod = ({ item }) => {
    return (
      <Pressable
        style={styles.listContainer}
        onPress={() => {
          navigateToScreen(item.navigate);
        }}>
        <FastImage
          style={{ height: 17, width: 19, marginRight: 20 }}
          source={item.icon}
          resizeMode="contain"
        />
        <Text style={styles.listTitleText}>{item.title}</Text>
      </Pressable>
    );
  };
  const renderItemSeparator = ({ item }) => {
    return <View style={styles.lineStyle} />;
  };
  return (
    <SafeScreen>
      <View style={styles.topContainer}>
        <LinearGradient
          colors={['#412653', '#2E1B3B']}
          style={{
            flex: 1,
            // justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 20,
          }}>
          <View
            style={{
              borderWidth: 1,
              borderRadius: 100,
              borderColor: '#D9D9D9',
              marginBottom: 10,
            }}>
            <FastImage
              style={{
                height: 120,
                width: 120,
                borderRadius: 100,
              }}
              source={dummy}
              resizeMode="cover"
            />
            <View
              style={{
                position: 'absolute',
                backgroundColor: '#FBFBFB',
                height: 40,
                width: 40,
                borderRadius: 100,
                bottom: 20,
                right: -15,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <FastImage
                style={{
                  height: 18,
                  width: 18,
                }}
                source={edit}
                resizeMode="contain"
              />
            </View>
          </View>
          <Text style={styles.nameText}>{data?.user.name}</Text>
          <Text style={styles.numberText}>+91 {data?.user.phone_number}</Text>
        </LinearGradient>
      </View>
      <View style={styles.container}>
        <View style={styles.profileListContainer}>
          <FlatList
            data={profileList}
            renderItem={renderPaymentMethod}
            keyExtractor={_keyExtractor}
            ItemSeparatorComponent={renderItemSeparator}
            scrollEnabled={false}
            listKey={(item, index) => `${index}-item`}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </SafeScreen>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  topContainer: {
    height: '40%',
  },
  container: {
    flex: 1,
    backgroundColor: '#EEEDED',
  },
  profileListContainer: {
    marginHorizontal: 20,
    padding: 10,
    paddingVertical: 20,
    backgroundColor: '#FFF',
    // height: '85%',
    borderRadius: 20,
    position: 'relative',
    marginTop: -50,
  },
  listContainer: {
    flexDirection: 'row',
    marginTop: 1,
    padding: 10,
    paddingHorizontal: 20,
    // justifyContent: 'space-between',
    backgroundColor: '#FFF',
  },
  lineStyle: {
    borderWidth: 1,
    borderColor: '#E7E8E9',
    margin: 10,
  },
  listTitleText: {
    fontSize: 14,
    fontFamily: FontFamily.poppinsMedium,
    color: '#070A0D',
  },
  nameText: {
    fontSize: 22,
    fontFamily: FontFamily.poppinsSemiBold,
    color: '#FBFBFB',
  },
  numberText: {
    fontSize: 14,
    fontFamily: FontFamily.poppinsRegular,
    color: '#FBFBFB',
  },
});
