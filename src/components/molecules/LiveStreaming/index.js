import { StyleSheet, Text, View } from 'react-native';
import ZegoUIKitPrebuiltLiveStreaming, { HOST_DEFAULT_CONFIG, AUDIENCE_DEFAULT_CONFIG, ZegoMenuBarButtonName }
  from '@zegocloud/zego-uikit-prebuilt-live-streaming-rn'
import { Colors } from '../../../theme/colors';
import banner from '../../../theme/assets/images/banner.png';
import { useState } from 'react';
import FastImage from 'react-native-fast-image';

export default function LiveStreaming({ isHost }) {

  const randomUserID = String(Math.floor(Math.random() * 100000))
  return (
    <View style={styles.container}>
      {
        <ZegoUIKitPrebuiltLiveStreaming
          appID={165204148} // Your App ID
          appSign='47cb859ebf381471d1cc516e283e825d3d75ac106ff15cc753f03485cf43c7'
          userID={randomUserID}
          userName={'user_' + randomUserID}
          liveID='dice_dash'
          frontCamera={false} // Use the back camera
          layout='single'
          config={{
            ...(isHost == true ? HOST_DEFAULT_CONFIG : AUDIENCE_DEFAULT_CONFIG),
            onLeaveLiveStreaming: () => { },
            turnOnCameraWhenJoining: isHost ? true : false,
            useFrontFacingCamera: false,
            onStartLiveButtonPressed: () => {
              setIsStreamStart(true)
            },
            topMenuBarConfig: {
              buttons: [ZegoMenuBarButtonName.leaveButton, ZegoMenuBarButtonName.toggleMicrophoneButton, ZegoMenuBarButtonName.switchCameraButton],
            },
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
