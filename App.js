import React, { useState } from 'react';
import { ScrollView, View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';


import { GestureHandlerRootView, PanGestureHandler, State } from 'react-native-gesture-handler'
import Animated, { add, cond, eq, event, set, Value } from 'react-native-reanimated';
import { wp, hp } from './helper'

class App extends React.Component {

  constructor(props) {
    super(props);

    this.translateX = new Value(0);
    const dragX = new Value(0);
    const state = new Value(-1);
    const dragVX = new Value(0);
    const offsetX = new Value(0);

    this.onGestureEvent = event([
      {
        nativeEvent: {
          x: dragX,
          state: state,
          // x: offsetX,
        }
      }
    ]);

    const transX = new Value();
    this.translateX = cond(
      eq(state, State.ACTIVE),
      [
        //state active, 
        set(transX, add(offsetX, dragX)), transX

      ],
      [
        set(offsetX, add(offsetX, transX)),
      
        offsetX
      ]

    );


  }

  render() {

    return (

      <GestureHandlerRootView   >

        <PanGestureHandler onGestureEvent={this.onGestureEvent}  >
          <Animated.View style={{ ...StyleSheet.absoluteFillObject, zIndex: 100, height: hp(100), backgroundColor: "tan" }} >
            <Animated.View
              style={{
                flexDirection: "row",
                transform: [{ translateX: this.translateX }]
              }}
            >
              <Image style={styles.image} source={{ uri: "https://4kwallpapers.com/images/walls/thumbs_3t/5461.jpg" }} />
              <Image style={styles.image} source={{ uri: "https://4kwallpapers.com/images/walls/thumbs_3t/1498.jpg" }} />
              <Image style={styles.image} source={{ uri: "https://4kwallpapers.com/images/walls/thumbs_3t/1499.jpg" }} />

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
