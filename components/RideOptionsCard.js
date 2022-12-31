import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Image
} from 'react-native';
import React, { useState } from 'react';
import tw from 'tailwind-react-native-classnames';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import 'intl';

import 'intl/locale-data/jsonp/en';

import 'intl/locale-data/jsonp/fr';

const data = [
  {
    id: 'Uber-X-123',
    title: 'UberX',
    multiplier: 1,
    image: 'https://links.papareact.com/3pn'
  },
  {
    id: 'Uber-XL-423',
    title: 'Uber XL',
    multiplier: 1.2,
    image: 'https://links.papareact.com/5w8'
  },
  {
    id: 'Uber-LUX-789',
    title: 'Uber LUX',
    multiplier: 1.75,
    image: 'https://links.papareact.com/7pf'
  }
];

const BUSY_PRICE = 0.3;

const RideOptionsCard = () => {
  const { travelTimeInformation } = useSelector((state) => state.nav);
  const navigation = useNavigation();

  const [selected, setSelected] = useState(null);

  return (
    <SafeAreaView style={tw`bg-white flex-grow`}>
      <View>
        <TouchableOpacity
          style={tw`absolute top-2 left-5 p-3 rounded-full`}
          onPress={() => navigation.navigate('NavigateCard')}
        >
          <Icon name='chevron-left' type='font-awesome' size={20} />
        </TouchableOpacity>
        <Text style={tw`text-center text-xl py-2`}>
          Pick a Ride - {travelTimeInformation?.distance?.text}
        </Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={tw`flex-row justify-between items-center px-8 ${
              item.id === selected?.id && 'bg-gray-300'
            }`}
            onPress={() => setSelected(item)}
          >
            <Image
              style={{ width: 100, height: 75, resizeMode: 'contain' }}
              source={{ uri: item.image }}
            />

            <View>
              <Text style={tw`text-xl font-semibold`}>{item.title}</Text>
              <Text>Travel time: {travelTimeInformation?.duration?.text}</Text>
            </View>
            <Text style={tw`text-xl`}>
              {new Intl.NumberFormat('en-gb', {
                style: 'currency',
                currency: 'GBP'
              }).format(
                (travelTimeInformation?.duration?.value *
                  BUSY_PRICE *
                  item.multiplier) /
                  100
              )}
            </Text>
          </TouchableOpacity>
        )}
      />
      <View>
        <TouchableOpacity style={tw`bg-black py-1 m-2`} disabled={!selected}>
          <Text
            style={tw`text-center text-white text-xl  ${
              !selected && 'bg-gray-300'
            }`}
          >
            Choose {selected?.title}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RideOptionsCard;
