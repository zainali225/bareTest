import React, { useState } from 'react';
import { ScrollView, View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';


import { GestureHandlerRootView, PanGestureHandler, State } from 'react-native-gesture-handler'
import Animated, { add, cond, eq, event, set, Value, debug, Clock, greaterOrEq, lessOrEq, and, or, greaterThan, stopClock } from 'react-native-reanimated';
import { wp, hp, runSpring } from './helper'
import { timing, useClock } from "react-native-redash/lib/module/v1"


const assets = [
  "https://4kwallpapers.com/images/walls/thumbs_3t/1498.jpg",
  "https://4kwallpapers.com/images/walls/thumbs_3t/1499.jpg",
  // "https://4kwallpapers.com/images/walls/thumbs_3t/1500.jpg"
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
          velocityX
          // x: offsetX,
        }
      }
    ]);

    this.translateX = cond(
      eq(state, State.ACTIVE),
      [
        cond(and(lessOrEq(add(translationX, offsetX), 0), greaterThan(add(translationX, offsetX), MAX)), [

          stopClock(clock),
          set(translationX, add(translationX, offsetX)), translationX,
        ], [
          cond(lessOrEq(add(translationX, offsetX), 0), [
            MAX
          ], [
            0
          ])
        ])
      ],
      [
        set(offsetX, add(translationX, offsetX)),
        cond(and(lessOrEq(offsetX, 0), greaterThan(offsetX, MAX)), [], [
          cond(lessOrEq(offsetX, 0), [
            set(offsetX, MAX)
          ], [
            set(offsetX, 0)
          ]),


        ]),
     
        set(offsetX, runSpring(clock, offsetX, 0, 0)),
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
