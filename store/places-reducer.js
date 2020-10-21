import { ADD_PLACE, SET_PLACES } from './places-actions'
import Place from '../models/place'

const initialState = {
  places: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PLACES:
      return {
        places: action.places.map((pl) => {
          return new Place(pl.id.toString(), pl.title, pl.imageUri)
        }),
      }
    case ADD_PLACE:
      const newPlace = new Place(
        new Date().toString(),
        action.placeData.title,
        action.placeData.image,
        '',
        action.placeData.loc.lat,
        action.placeData.loc.lng
      )
      return {
        places: state.places.concat(newPlace),
      }
    default:
      return state
  }
}
