import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import tw from 'tailwind-react-native-classnames';
import NavOptions from '../components/NavOptions';

const Home = () => {
  return (
    <View style={tw`bg-white h-full p-5`}>
      <View>
        <Image
          style={{ width: 100, height: 100, resizeMode: 'contain' }}
          source={{ uri: 'https://links.papareact.com/gzs' }}
        />
      </View>

      <NavOptions />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
