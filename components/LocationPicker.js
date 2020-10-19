import React, { useState, useEffect } from 'react'
import {
  View,
  Button,
  Text,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from 'react-native'
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'

import Colors from '../constants/Colors'

const LocationPicker = (props) => {
  const [isFetching, setIsFetching] = useState(false)

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
        timeout: 5000,
      })
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
            <Text
              style={{ borderBottomWidth: 1, padding: 10, textAlign: 'center' }}
            >
              No location chosen yet!
            </Text>
          )}
        </View>
      </View>
      <Button title='Get User Location' color={Colors.primary} />
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
    height: 150,
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