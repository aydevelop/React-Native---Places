import * as FileSystem from 'expo-file-system'

import { insertPlace, fetchPlaces } from '../helpers/db'

export const ADD_PLACE = 'ADD_PLACE'
export const SET_PLACES = 'SET_PLACES'

export const addPlace = (title, image, loc) => {
  return async (dispatch) => {
    try {
      let fileName = null
      let newPath = null

      if (image) {
        fileName = image.split('/').pop()
        newPath = FileSystem.documentDirectory + fileName

        await FileSystem.moveAsync({
          from: image,
          to: newPath,
        })
      }

      const dbResult = await insertPlace(
        title,
        newPath,
        'Dummy address',
        loc.lat,
        loc.lng
      )

      dispatch({
        type: ADD_PLACE,
        placeData: { id: dbResult.insertId, title: title, image: newPath, loc },
      })
    } catch (err) {
      console.log('Error: ' + err)
      throw err
    }
  }
}

export const loadPlaces = () => {
  return async (dispatch) => {
    try {
      const dbResult = await fetchPlaces()
      dispatch({ type: SET_PLACES, places: dbResult.rows._array })
    } catch (err) {
      console.log('Error: ' + err)
      throw err
    }
  }
}
