import React from 'react'
import { View, Text, StyleSheet, Platform, FlatList } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { useSelector, useDispatch } from 'react-redux'

import IoniconsHeaderButton from '../components/HeaderButton'
import PlaceItem from '../components/PlaceItem'
import * as placesActions from '../store/places-actions'

const PlacesListScreen = ({ navigation }) => {
  const places = useSelector((state) => state.places.places)
  const dispatch = useDispatch()

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

  React.useEffect(() => {
    dispatch(placesActions.loadPlaces())
  }, [dispatch])

  return (
    <FlatList
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <PlaceItem
          image={itemData.item.imageUri}
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
