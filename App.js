import React, { useState } from 'react';
import { ScrollView, View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';


import { GestureHandlerRootView, PanGestureHandler, State } from 'react-native-gesture-handler'
import Animated, { add, cond, eq, event, set, Value, debug } from 'react-native-reanimated';
import { wp, hp } from './helper'


const assets = [
  "https://4kwallpapers.com/images/walls/thumbs_3t/1498.jpg",
  "https://4kwallpapers.com/images/walls/thumbs_3t/1499.jpg",
  "https://4kwallpapers.com/images/walls/thumbs_3t/1500.jpg"
]
const snapPoints = assets.map((_, index) => index * -wp(100))

class App extends React.Component {

  constructor(props) {
    super(props);

    this.translateX = new Value(0);
    const x = new Value(0);
    const state = new Value(-1);
    const translationX = new Value(0);
    const offsetX = new Value(0);


    this.onGestureEvent = event([
      {
        nativeEvent: {
          x,
          state,
          translationX,
          // x: offsetX,
        }
      }
    ]);

    this.translateX = cond(
      eq(state, State.ACTIVE),
      [
        //state active, 
        set(translationX, add(translationX, offsetX)), translationX

      ],
      [


        set(offsetX, translationX),
        offsetX,


      ]

    );


  }

  render() {

    return (

      <GestureHandlerRootView   >

        <PanGestureHandler onGestureEvent={this.onGestureEvent}  >
          <Animated.View   >
            <Animated.View
              style={{
                flexDirection: "row",
                width: wp(100) * assets.length,
                transform: [{ translateX: this.translateX }]
              }}
            >
              {
                assets.map(uri => (
                  <Image style={styles.image} source={{ uri }} key={uri} />

                ))
              }

            </Animated.View>
          </Animated.View>
        </PanGestureHandler>

      </GestureHandlerRootView>
    );
  };
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: wp(100), height: hp(90),
  }
});
