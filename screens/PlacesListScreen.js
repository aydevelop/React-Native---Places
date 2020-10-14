import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import IoniconsHeaderButton from '../components/HeaderButton'

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

  return (
    <View>
      <Text>PlacesListScreen</Text>
    </View>
  )
}

const styles = StyleSheet.create({})

export default PlacesListScreen
