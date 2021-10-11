import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import Animated, { EasingNode } from 'react-native-reanimated';
import { runTiming } from '../helper';

const {
    Clock,
    Value,
    set,
    cond,
    startClock,
    clockRunning,
    timing,
    debug,
    stopClock,
    block,
    concat,
} = Animated;

 
export default class ProgressBar extends React.Component {
    static propTypes = {
        progress: PropTypes.number.isRequired,
        height: PropTypes.number,
        color: PropTypes.string,
        borderRadius: PropTypes.number,
    };

    static defaultProps = {
        height: 10,
        color: 'green',
        borderRadius: 2,
        width: 100,
        backgroundColor: 'red',
    };

    clock = new Clock();
    progress = new Value(0);
    animation = new Value(0);
    transX = runTiming(this.clock, this.progress, this.animation);

    componentDidUpdate() {
        const progress = Math.max(Math.min(this.props.progress, 1), 0);
        this.animation.setValue(progress * 100);
    }

    render() {
        const progressStyle = {
            width: concat(this.transX, '%'),
            height: this.props.height,
            backgroundColor: this.props.color,
            borderRadius: this.props.borderRadius,
        };
        return (
            <View
                style={[
                    {
                        backgroundColor: this.props.backgroundColor,
                        width: this.props.width,
                    },
                    this.props.style,
                ]}>
                <Animated.View style={progressStyle} />
            </View>
        );
    }
}