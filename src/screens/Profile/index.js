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
import { useMutation, useQuery } from '@tanstack/react-query';
import { getProfile, uploadImage } from '../../services/users/users';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useEffect, useRef, useState } from 'react';
import * as ImagePicker from "react-native-image-picker";
import ActionSheet from 'react-native-actionsheet'
import { customToastMessage } from '../../utils/UtilityHelper';

const ProfileScreen = props => {
  const [profileImage, setProfileImage] = useState(null);
  const actionSheetRef = useRef(null)
  const { isSuccess, data, isFetching, isLoading, refetch } = useQuery({
    queryKey: ["getProfile"],
    queryFn: () => {
      return getProfile();
    },
  });
  const mutation = useMutation({
    mutationFn: (payload) => {
      return uploadImage(payload);
    },
    onSuccess: (data) => {
      console.log('-----DATA---', data.data)
    },
    onError: (error) => {
      console.log('ERROR', error.error)
      customToastMessage(error.error ? error.error : error.message, "danger");
    },
  });
  useFocusEffect(
    useCallback(() => {
      refetch()
      return () => {
      };
    }, []), // Empty array means it will run every time the screen is focused
  );
  useEffect(() => {
    if (isSuccess) {
      console.log("profile success data", data.user);
      setProfileImage(data?.user.profile_image)
    }
  }, [isSuccess])
  const onGalleryButtonPress = useCallback(async () => {
    const options = {
      mediaType: "photo",
      quality: 0.2,
      includeBase64: true,
    };
    const result = await ImagePicker.launchImageLibrary(options);
    setProfileImage(result.assets[0].uri);
    console.log("image data", result.assets[0]);
    const formData = new FormData();
    formData.append(`image`, {
      uri: result.assets[0].uri,
      type: 'image/jpeg',
      name: 'photo.jpg',
    });
    // toggleImageModal();
    mutation.mutate(payload);

  }, []);
  const onCameraButtonPress = useCallback(async () => {
    // toggleImageModal();
    const options = {
      mediaType: "photo",
      quality: 0.2,
      includeBase64: true,
    };
    const result = await ImagePicker.launchCamera(options);
    console.log("image data", result.assets[0]);
    setProfileImage(result.assets[0].uri);
    const formData = new FormData();
    formData.append(`image`, {
      uri: result.assets[0].uri,
      type: result.assets[0].type,
      name: 'photo.jpg',
    });
    // toggleImageModal();
    mutation.mutate(payload);

  }, []);
  const openActionSheet = () => {
    if (actionSheetRef.current) {
      actionSheetRef.current.show();
    }
  }
  const onPressActionSheet = (index, data) => {
    if (index === 0) {
      onGalleryButtonPress()
    } else if (index === 1) {
      onCameraButtonPress()
    }
  }
  function renderActionSheet() {
    return (
      <ActionSheet
        ref={actionSheetRef}
        title={'Pick Media option'}
        options={['Gallery', 'Camera', 'Cancel']}
        cancelButtonIndex={2}
        destructiveButtonIndex={2}
        onPress={onPressActionSheet}
      />
    )
  }
  const _keyExtractor = (item, index) => index.toString();
  const navigateToScreen = url => {
    if (url == 'Logout') {
      storage.delete('auth_token');
      storage.delete('is_admin');
      // storage.delete('fcm_token');
      storage.delete('push_notification');
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
          <Pressable
            onPress={openActionSheet}
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
              source={profileImage == null ? dummy : { uri: profileImage }}
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
          </Pressable>
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
      {renderActionSheet()}
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
