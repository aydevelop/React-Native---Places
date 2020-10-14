import React from 'react'
import { View, Text, StyleSheet, Platform, FlatList } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { useSelector } from 'react-redux'

import IoniconsHeaderButton from '../components/HeaderButton'
import PlaceItem from '../components/PlaceItem'

const PlacesListScreen = ({ navigation }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'All Places',
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
          <Item
            title='Favorite'
            iconName={'md-add'}
            onPress={() => {
              navigation.navigate('NewPlaceScreen')
            }}
          />
        </HeaderButtons>
      ),
    })
  })

  const places = useSelector((state) => state.places.places)

  return (
    <FlatList
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <PlaceItem
          image={null}
          title={itemData.item.title}
          address={null}
          onSelect={() => {
            navigation.navigate('PlaceDetailScreen', {
              place: itemData.item,
            })
          }}
        />
      )}
    />
  )
}

const styles = StyleSheet.create({})

export default PlacesListScreen
