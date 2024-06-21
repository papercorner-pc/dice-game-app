import { StyleSheet, Text, View } from 'react-native';
import ZegoUIKitPrebuiltLiveStreaming, { HOST_DEFAULT_CONFIG, AUDIENCE_DEFAULT_CONFIG }
  from '@zegocloud/zego-uikit-prebuilt-live-streaming-rn'
import { Colors } from '../../../theme/colors';
import banner from '../../../theme/assets/images/banner.png';
import { useState } from 'react';
import FastImage from 'react-native-fast-image';

export default function LiveStreaming({ isHost }) {

  const [isStreamStart, setIsStreamStart] = useState(false)

  const randomUserID = String(Math.floor(Math.random() * 100000))
  return (
    <View style={styles.container}>
      {
        // (isHost || isStreamStart) ?
        <ZegoUIKitPrebuiltLiveStreaming
          appID={580759072} // Your App ID
          appSign='dcb7b9d16a5f4e9b3edffb273fec877934ba8c83158652764bb8b772d6722015'
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
          }}
        />
        // :
        // <FastImage
        //   source={banner}
        //   style={{ flex: 1 }}
        //   resizeMode="contain"
        // />
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
