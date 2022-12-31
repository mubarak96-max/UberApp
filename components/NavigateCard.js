import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import React from 'react';
import tw from 'tailwind-react-native-classnames';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useDispatch } from 'react-redux';
import { setDestination, setOrigin } from '../redux/slices/navSlice';
import { useNavigation } from '@react-navigation/native';
import NavFavorites from './NavFavorites';
import { Icon } from 'react-native-elements';

const NavigateCard = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
      <Text style={tw`text-center py-5 text-xl`}>Good Morning, Mubarak</Text>
      <View style={tw`border-t border-gray-200 flex-shrink`}>
        <View>
          <GooglePlacesAutocomplete
            styles={{
              container: {
                flex: 0
              },
              textInput: {
                fontSize: 18,
                backgroundColor: 'lightgray'
              }
            }}
            onPress={(data, details = null) => {
              dispatch(
                setDestination({
                  location: details?.geometry?.location,
                  description: data?.description
                })
              );
              navigation.navigate('RideCardOptions');
            }}
            fetchDetails={true}
            enablePoweredByContainer={false}
            returnKeyType={'search'}
            minLength={2}
            placeholder='Where To?'
            nearbyPlacesAPI='GooglePlacesSearch'
            query={{
              key: 'AIzaSyA9PlJBjShQdoSQFscCz-RhvehbUEH0yqE',
              language: 'en'
            }}
            debounce={400}
          />
        </View>
        <NavFavorites />
      </View>
      <View
        style={tw`flex-row bg-white justify-evenly py-2 mx-auto border-t border-gray-100`}
      >
        <TouchableOpacity
          style={tw`flex flex-row justify-between mx-2 bg-black rounded-full w-24 py-3 px-4`}
          onPress={() => navigation.navigate('RideCardOptions')}
        >
          <Icon name='car' type='font-awesome' color='white' size={16} />
          <Text style={tw`text-center text-white`}>Rides</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`flex flex-row justify-between mx-2 bg-black rounded-full w-24 py-3 px-4`}
        >
          <Icon
            name='fast-food-outline'
            type='ionicon'
            color='white'
            size={16}
          />
          <Text style={tw`text-center text-white`}>Eats</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default NavigateCard;
