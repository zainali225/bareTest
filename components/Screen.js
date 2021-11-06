import Animated, {
    useSharedValue,
    withTiming,
    useAnimatedStyle,
    Easing,
} from 'react-native-reanimated';
import { View, Button, StatusBar, TouchableOpacity, Text } from 'react-native';
import React from 'react';

export default function AnimatedStyleUpdateExample(props) {
    const randomWidth = useSharedValue(10);

    const config = {
        duration: 500,
        easing: Easing.bezier(0.5, 0.01, 0, 1),
    };

    const style = useAnimatedStyle(() => {
        return {
            width: withTiming(randomWidth.value, config),
        };
    });

    return (
        <View
            style={{
                flex: 1,
                flexDirection: 'column',
            }}>

            <StatusBar backgroundColor='green' />
            <Animated.View
                style={[
                    { width: 100, height: 80, backgroundColor: 'black', margin: 30 },
                    style,
                ]}
            />

            <TouchableOpacity
                onPress={() => randomWidth.value = Math.random() * 350}
                style={{ width: 100, height: 50, backgroundColor: "cyan" }} >
<Text>aasdsad</Text>
            </TouchableOpacity>

        </View >
    );
}