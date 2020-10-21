import React from 'react'
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native'
import MapView, { Marker } from 'react-native-maps'

const PlaceDetailScreen = ({ route, navigation }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: route.params.place.title,
    })
  })

  return (
    <View style={{ flex: 1, padding: 15 }}>
      {route.params.place.imageUri && (
        <Image
          source={{ uri: route.params.place.imageUri }}
          style={{ height: '50%' }}
        />
      )}
      {route.params.place.lat > 0 && route.params.place.lng > 0 && (
        <MapView
          style={{ height: '50%' }}
          region={{
            latitude: route.params.place.lat,
            longitude: route.params.place.lng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            title='Picked Location'
            coordinate={{
              latitude: route.params.place.lat,
              longitude: route.params.place.lng,
            }}
          />
        </MapView>
      )}
    </View>
  )
}

const styles = StyleSheet.create({})

export default PlaceDetailScreen
