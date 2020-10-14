import * as React from 'react'
import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import PlacesListScreen from './screens/PlacesListScreen'
import PlaceDetailScreen from './screens/PlaceDetailScreen'
import NewPlaceScreen from './screens/NewPlaceScreen'
import MapScreen from './screens/MapScreen'
import Colors from './constants/Colors'

const Stack = createStackNavigator()
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='PlacesListScreen'
        screenOptions={{
          headerTintColor: 'white',
          headerStyle: { backgroundColor: Colors.primary },
        }}
      >
        <Stack.Screen name='PlacesListScreen' component={PlacesListScreen} />
        <Stack.Screen name='PlaceDetailScreen' component={PlaceDetailScreen} />
        <Stack.Screen name='NewPlaceScreen' component={NewPlaceScreen} />
        <Stack.Screen name='MapScreen' component={MapScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
