import React, { useState, useEffect } from 'react'
import {
  View,
  Button,
  Text,
  ActivityIndicator,
  Alert,
  StyleSheet,
  Image,
} from 'react-native'
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import { MapView } from 'expo'

import Colors from '../constants/Colors'

const LocationPicker = (props) => {
  const [isFetching, setIsFetching] = useState(false)
  const [pickedLocation, setPickedLocation] = useState(null)

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(Permissions.LOCATION)
    if (result.status !== 'granted') {
      Alert.alert(
        'Insufficient permissions!',
        'You need to grant location permissions to use this app.',
        [{ text: 'Okay' }]
      )
      return false
    }
    return true
  }

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermissions()
    if (!hasPermission) {
      return
    }
    try {
      setIsFetching(true)
      const location = await Location.getCurrentPositionAsync({
        timeout: 10000,
      })

      const loc = {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      }

      setPickedLocation(loc)
      props.onGeoTake(loc)
    } catch (err) {
      Alert.alert(
        'Could not fetch location!',
        'Please try again later or pick a location on the map.',
        [{ text: 'Okay' }]
      )
    }

    setIsFetching(false)
  }

  return (
    <View style={styles.locationPicker}>
      <View style={styles.mapPreview}>
        <View>
          {isFetching ? (
            <ActivityIndicator
              style={{ padding: 20 }}
              size='large'
              color={Colors.primary}
            />
          ) : (
            <View>
              <Text
                style={{
                  padding: 10,
                  textAlign: 'center',
                }}
              >
                {!pickedLocation
                  ? 'No location chosen yet!'
                  : `Your location: \r\n Latitude ${pickedLocation.lat}, Longitude ${pickedLocation.lng}`}
              </Text>
            </View>
          )}
        </View>
      </View>

      <Button
        title='Get User Location'
        onPress={getLocationHandler}
        color={Colors.primary}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  locationPicker: {
    marginBottom: 45,
    marginTop: 15,
  },
  mapPreview: {
    marginBottom: 10,
    width: '100%',
    height: 85,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
})

export default LocationPicker
