import React, { useEffect, useRef, useState } from 'react'
import { Animated, Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import coinIcon from '../../../theme/assets/images/star.png';
import { Colors } from '../../../theme/colors';

function AnimationValue({ value }) {
    const [showValue, setShowValue] = useState(null)
    const fadeAnim = useRef(new Animated.Value(0)).current; // Initial opacity value
    const scaleAnim = useRef(new Animated.Value(0.8)).current; // Initial scale value

    useEffect(() => {
        if (value !== null) {
            // Trigger the animation whenever the value changes
            Animated.parallel([
                Animated.sequence([
                    Animated.timing(fadeAnim, {
                        toValue: 1,
                        duration: 500, // 0.5 second fade in
                        useNativeDriver: true,
                    }),
                    Animated.delay(1500), // Delay for 1.5 seconds
                    Animated.timing(fadeAnim, {
                        toValue: 0,
                        duration: 500, // 0.5 second fade out
                        useNativeDriver: true,
                    }),
                ]),
                Animated.sequence([
                    Animated.timing(scaleAnim, {
                        toValue: 1.2,
                        duration: 500, // 0.5 second scale up
                        useNativeDriver: true,
                    }),
                    Animated.delay(1500), // Delay for 1.5 seconds
                    Animated.timing(scaleAnim, {
                        toValue: 0.8,
                        duration: 500, // 0.5 second scale down
                        useNativeDriver: true,
                    }),
                ]),
            ]).start();
            const data = value.split("/")[0]
            const intValue = parseInt(data, 10);
            setShowValue(intValue);
        }
    }, [value]);
    return (
        <Animated.View style={{ opacity: fadeAnim, transform: [{ scale: scaleAnim }] }}>
            <FastImage
                source={coinIcon}
                style={{ height: 22, width: 22 }}
                resizeMode="contain"
            />
            {
                !!showValue &&
                <Text style={{ marginTop: 2, fontSize: 14, color: "yellow" }}>{showValue}</Text>
            }
        </Animated.View>
    )
}

export default AnimationValue
