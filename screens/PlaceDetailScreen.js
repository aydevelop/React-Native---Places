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
        <Image
          source={{
            uri: `https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/static/pin-s-heart+285A98(${
              route.params.place.lng + `,` + route.params.place.lat
            })/${
              route.params.place.lng + `,` + route.params.place.lat
            },7,0/300x180@2x?access_token=pk.eyJ1IjoicGV5ZXhhNzY3NyIsImEiOiJja2dpMjJpZjUwNnc2MnFxaTk3aTJreTY1In0.X5-He6upjtRVuRwK12SOiA`,
          }}
          style={{ height: '50%' }}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({})

export default PlaceDetailScreen
