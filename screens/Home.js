import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import tw from 'tailwind-react-native-classnames';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import NavOptions from '../components/NavOptions';
import { GOOGLE_MAPS_API_KEY } from '@env';
import { setOrigin, setDestination } from '../redux/slices/navSlice';
import { useDispatch } from 'react-redux';

const Home = () => {
  const dispatch = useDispatch();

  return (
    <View style={tw`bg-white h-full p-5`}>
      <View>
        <Image
          style={{ width: 100, height: 100, resizeMode: 'contain' }}
          source={{ uri: 'https://links.papareact.com/gzs' }}
        />
        <GooglePlacesAutocomplete
          styles={{
            container: {
              flex: 0
            },
            textInput: {
              fontSize: 18
            }
          }}
          onPress={(data, details = null) => {
            dispatch(
              setOrigin({
                location: details?.geometry?.location,
                description: data?.description
              })
            );
            dispatch(setDestination(null));
          }}
          fetchDetails={true}
          enablePoweredByContainer={false}
          returnKeyType={'search'}
          minLength={2}
          placeholder='Where from?'
          nearbyPlacesAPI='GooglePlacesSearch'
          query={{
            key: 'AIzaSyA9PlJBjShQdoSQFscCz-RhvehbUEH0yqE',
            language: 'en'
          }}
          debounce={400}
        />
        <NavOptions />
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
