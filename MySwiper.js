import React, { useState } from 'react';
import { ScrollView, View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';


import { GestureHandlerRootView, PanGestureHandler, State } from 'react-native-gesture-handler'
import Animated, { add, cond, eq, event, set, Value, debug, Clock, greaterOrEq, lessOrEq, and, or, greaterThan, stopClock, divide, abs } from 'react-native-reanimated';
import { wp, hp, runSpring, runTiming } from './helper'


const assets = [
  "https://4kwallpapers.com/images/walls/thumbs_3t/1498.jpg",
  "https://4kwallpapers.com/images/walls/thumbs_3t/1499.jpg",
  "https://4kwallpapers.com/images/walls/thumbs_3t/1511.jpg",
  "https://4kwallpapers.com/images/walls/thumbs_3t/1501.jpg",
  "https://4kwallpapers.com/images/walls/thumbs_3t/1506.jpg",
]
const snapPoints = assets.map((_, index) => index * -wp(100))
const MIN = 0
const MAX = -(assets.length - 1) * wp(100)

class MySwiper extends React.Component {

  constructor(props) {
    super(props);

    const offsetX = new Value(0);
    const state = new Value(-1);
    const positionX = new Value(0);
    const velocityX = new Value(0)
    const translationX = new Value(0);
    const clock = new Clock()

    this.onGestureEvent = event([
      {
        nativeEvent: {
          x: positionX,
          state,
          translationX,
          // velocityX
          // x: offsetX,
        }
      }
    ]);

    this.translateX = cond(
      eq(state, State.ACTIVE),
      [
        // stopClock(clock),
        set(translationX, add(translationX, offsetX)),
        cond(and(lessOrEq(translationX, 0), greaterThan(translationX, MAX)), [

          set(translationX, translationX), translationX,
        ], [
          cond(lessOrEq(translationX, 0), [
            MAX
          ], [
            0
          ])
        ])
      ],
      [
        // stopClock(clock),
        set(offsetX, add(translationX, offsetX)),
        set(offsetX, abs(divide(offsetX, assets.length))),
        debug("offset",offsetX),
        
        cond(and(lessOrEq(offsetX, 0), greaterThan(offsetX, MAX)), 0, [
          cond(lessOrEq(offsetX, 0), [
            set(offsetX, MAX)
          ], [
            set(offsetX, 0)
          ]),


        ]),

        offsetX


      ]

    );


  }

  // onGesture = ({ nativeEvent }) => {
  //   const { x, translationX, state } = nativeEvent;
  //   if (state === State.ACTIVE) {
  //     this.translateX.setValue(add(this.offsetX, translationX))
  //     // console.log(x, "Active", state)
  //   }

  // }
  // onEnd = ({ nativeEvent }) => {
  //   const { x, translationX, state } = nativeEvent;

  //   this.offsetX.setValue(add(translationX, this.offsetX))
  //   // console.log(add(translationX, this.offsetX).__inputNodes[0]._value, "-----ended", state)

  // }

  render() {

    return (

      <GestureHandlerRootView   >


        <PanGestureHandler onGestureEvent={this.onGestureEvent} onHandlerStateChange={this.onGestureEvent} >

          <Animated.View
            style={{
              flexDirection: "row",
              width: wp(100) * assets.length,
              transform: [{ translateX: this.translateX }]
            }}
          >
            {
              assets.map(uri => <Image style={styles.image} source={{ uri }} key={uri} />)
            }

          </Animated.View>

        </PanGestureHandler>

      </GestureHandlerRootView>
    );
  };
}

export default MySwiper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: wp(100), height: hp(100),
  }
});
