import { View, Text } from 'react-native';
import React, { useEffect, useRef } from 'react';
import MapView, { Marker } from 'react-native-maps';
import tw from 'tailwind-react-native-classnames';
import { useDispatch, useSelector } from 'react-redux';
import MapViewDirections from 'react-native-maps-directions';
import { current } from '@reduxjs/toolkit';
import { setTravelTimeInformation } from '../redux/slices/navSlice';

const Map = () => {
  const { origin } = useSelector((state) => state.nav);
  const { destination } = useSelector((state) => state.nav);
  const mapRef = useRef(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!origin || !destination) return;

    // zoom map
    try {
      mapRef.current.fitToSuppliedMarkers(['origin', 'destination'], {
        edgePadding: { top: 10, right: 10, bottom: 10, left: 10 }
      });
    } catch (error) {
      console.log(error);
    }
  }, [origin, destination]);

  useEffect(() => {
    if (!origin || !destination) return;

    const getTravelTime = () => {
      const URL = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin?.description}&destinations=${destination?.description}&key=AIzaSyA9PlJBjShQdoSQFscCz-RhvehbUEH0yqE`;
      fetch(URL)
        .then((res) => res.json())
        .then((data) => {
          console.log('rows', data?.rows[0]?.elements[0]);
          dispatch(setTravelTimeInformation(data?.rows[0]?.elements[0]));
        });
    };
    getTravelTime();
  }, [origin, destination, 'AIzaSyA9PlJBjShQdoSQFscCz-RhvehbUEH0yqE']);

  return (
    <MapView
      ref={mapRef}
      style={tw`flex-1`}
      mapType='mutedStandard'
      initialRegion={{
        latitude: origin?.location?.lat,
        longitude: origin?.location?.lng,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005
      }}
    >
      {origin && destination && (
        <MapViewDirections
          origin={origin?.description}
          destination={destination?.description}
          apikey='AIzaSyA9PlJBjShQdoSQFscCz-RhvehbUEH0yqE'
          strokeColor='black'
          strokeWidth={3}
        />
      )}
      {origin?.location && (
        <Marker
          key='origin'
          identifier='origin'
          coordinate={{
            latitude: origin?.location?.lat,
            longitude: origin?.location?.lng
          }}
          title='origin'
          description={origin?.description}
        />
      )}

      {destination?.location && (
        <Marker
          key='destination'
          identifier='destination'
          coordinate={{
            latitude: destination?.location?.lat,
            longitude: destination?.location?.lng
          }}
          title='destination'
          description={destination?.description}
        />
      )}
    </MapView>
  );
};

export default Map;
