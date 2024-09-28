import { StyleSheet, Text, View } from 'react-native';
import ZegoUIKitPrebuiltLiveStreaming, { HOST_DEFAULT_CONFIG, AUDIENCE_DEFAULT_CONFIG, ZegoMenuBarButtonName }
  from '@zegocloud/zego-uikit-prebuilt-live-streaming-rn'
import { Colors } from '../../../theme/colors';
import banner from '../../../theme/assets/images/banner.png';
import { useRef, useState } from 'react';
import FastImage from 'react-native-fast-image';

export default function LiveStreaming({ isHost }) {
  const prebuiltRef = useRef();

  const randomUserID = String(Math.floor(Math.random() * 100000))
  return (
    <View style={styles.container}>
      {
        <ZegoUIKitPrebuiltLiveStreaming
          ref={prebuiltRef}
          appID={2147675132} // Your App ID
          appSign='3d9f1baee59519de5a0ec4f4ac55128ad47a9be67a7cebf9f514c7cc961704be'
          userID={randomUserID}
          userName={isHost ? 'admin' : 'user_' + randomUserID}
          liveID='dice_dash'
          frontCamera={false} // Use the back camera
          layout='single'
          config={{
            ...(isHost == true ? HOST_DEFAULT_CONFIG : AUDIENCE_DEFAULT_CONFIG),
            onStartLiveButtonPressed: () => { console.log('########HostPage onStartLiveButtonPressed'); },
            onLiveStreamingEnded: () => {
              console.log('########HostPage onLiveStreamingEnded');
            },
            turnOnCameraWhenJoining: isHost ? true : false,
            useFrontFacingCamera: false,
            /* topMenuBarConfig: {
              buttons: [ZegoMenuBarButtonName.leaveButton, ZegoMenuBarButtonName.toggleMicrophoneButton, ZegoMenuBarButtonName.switchCameraButton],
            }, */
          }}
        />
      }
    </View>
  )
}

const styles = StyleSheet.create({
  flexed: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
  },
  text: {
    alignSelf: 'center',
    color: 'white',
    backgroundColor: 'blue',
    padding: 6,
    margin: 4,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    zIndex: 0,
  }
});
