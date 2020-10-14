import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const PlaceDetailScreen = ({ route, navigation }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: route.params.place.title,
    })
  })

  return (
    <View>
      <Text>PlaceDetailScreen</Text>
    </View>
  )
}

const styles = StyleSheet.create({})

export default PlaceDetailScreen
