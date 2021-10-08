import React, { useState } from 'react';
import { ScrollView, View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';


import { GestureHandlerRootView, PanGestureHandler, State } from 'react-native-gesture-handler'
import Animated, { add, cond, eq, event, set, Value, debug, Clock } from 'react-native-reanimated';
import { wp, hp } from './helper'
import { timing, useClock } from "react-native-redash/lib/module/v1"
import MySwiper from './MySwiper';



class App extends React.Component {


  render() {

    return (

      <GestureHandlerRootView   >

        <MySwiper />


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
