import { Dimensions } from "react-native";
import { clockRunning, Value, set, startClock, cond, stopClock, spring } from "react-native-reanimated";


const HEIGHT = Dimensions.get('window').height
const WIDTH = Dimensions.get('window').width



export function wp(float) {
    return WIDTH * float / 100
}
export function hp(float) {
    return HEIGHT * float / 100
}

export function runSpring(clock, value, velocity, dest) {
    const state = {
        finished: new Value(0),
        velocity: new Value(0),
        position: new Value(0),
        time: new Value(0)
    };

    const config = {
        damping: 10,
        mass: 1,
        stiffness: 121.6,
        overshootClamping: false,
        restSpeedThreshold: 0.001,
        restDisplacementThreshold: 0.001,
        toValue: new Value(0)
    };

    return [
        cond(clockRunning(clock), 0, [
            set(state.finished, 0),
            set(state.velocity, velocity),
            set(state.position, value),
            set(config.toValue, dest),
            startClock(clock)
        ]),
        spring(clock, state, config),
        cond(state.finished, stopClock(clock)),
        state.position
    ];
}