
import React from 'react';
import {
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import Accordion from './components/Accordion';
import MyProgress from './components/MyProgress';

import MySwiper from './components/MySwiper'


export default () => {


  return (
    <View style={{ flex: 1, backgroundColor: "#DDD", paddingTop: 50 }} >
      <StatusBar backgroundColor="green" />
      <Accordion />
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

