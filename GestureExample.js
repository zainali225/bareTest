import React, { useState, Component } from 'react';
import { ScrollView, View, TouchableOpacity, Text, StyleSheet, Image, } from 'react-native';


import { GestureHandlerRootView, PanGestureHandler, State, } from 'react-native-gesture-handler'
import Animated, { add, cond, eq, event, set, Value, } from 'react-native-reanimated';
import { wp, hp } from './helper'

const circleRadius = 30;
export default class Circle extends Component {
  _touchX = new Value(circleRadius);
  _onPanGestureEvent = Animated.event([{ nativeEvent: { x: this._touchX } }], {
    useNativeDriver: true,
  });
  render() {
    return (
      <PanGestureHandler onGestureEvent={this._onPanGestureEvent}>

        <Animated.View >
          <Animated.View
            style={[
              {
                backgroundColor: '#42a5f5',
                borderRadius: circleRadius,
                height: circleRadius * 2,
                width: circleRadius * 2,
              },
              {
                transform: [{ translateX: this._touchX, }],
              },
            ]}
          />
        </Animated.View>
      </PanGestureHandler>
    );
  }
}