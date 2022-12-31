import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import tw from 'tailwind-react-native-classnames';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const data = [
  {
    id: '123',
    title: 'Get a ride',
    image: 'https://links.papareact.com/3pn',
    screen: 'MapScreen'
  },
  {
    id: '223',
    title: 'Order Food',
    image: 'https://links.papareact.com/28w',
    screen: 'EatScreen'
  }
];

const NavOptions = () => {
  const navigation = useNavigation();
  const { origin } = useSelector((state) => state.nav);

  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        horizontal
        renderItem={({ item }) => (
          <TouchableOpacity
            style={tw`p-2 pl-4 pb-8 pt-2 bg-gray-200 m-2 w-36`}
            onPress={() => navigation.navigate(item.screen)}
            disabled={!origin}
          >
            <View style={tw`${!origin && 'opacity-20'}`}>
              <Image
                style={{ width: 110, height: 110, resizeMode: 'contain' }}
                source={{ uri: item.image }}
              />
              <Text style={tw`text-lg font-semibold mt-2`}>{item.title}</Text>
              <Icon
                style={tw`bg-black rounded-full mt-2 w-10 p-2`}
                name='arrowright'
                color='white'
                type='antdesign'
              />
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default NavOptions;
