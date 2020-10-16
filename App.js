import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import PlacesListScreen from './screens/PlacesListScreen'
import PlaceDetailScreen from './screens/PlaceDetailScreen'
import NewPlaceScreen from './screens/NewPlaceScreen'
import MapScreen from './screens/MapScreen'
import Colors from './constants/Colors'

//___________________________ Redux ___________________________
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import ReduxThunk from 'redux-thunk'

import placesReducer from './store/places-reducer'
const rootReducer = combineReducers({ places: placesReducer })
const store = createStore(rootReducer, applyMiddleware(ReduxThunk))
//____________________________________________________________

import { init } from './helpers/db'
init()
  .then(() => {
    console.log('Init DB')
  })
  .catch((err) => {
    console.log('Init DB fail: ' + err.toString())
  })

const Stack = createStackNavigator()
function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='PlacesListScreen'
          screenOptions={{
            headerTintColor: 'white',
            headerStyle: { backgroundColor: Colors.primary },
          }}
        >
          <Stack.Screen name='PlacesListScreen' component={PlacesListScreen} />
          <Stack.Screen
            name='PlaceDetailScreen'
            component={PlaceDetailScreen}
          />
          <Stack.Screen name='NewPlaceScreen' component={NewPlaceScreen} />
          <Stack.Screen name='MapScreen' component={MapScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

export default App
