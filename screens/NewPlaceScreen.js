import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  ScrollView,
  View,
  Button,
  Text,
  TextInput,
  StyleSheet,
  Alert,
} from 'react-native'

import Colors from '../constants/Colors'
import * as placesActions from '../store/places-actions'
import ImagePicker from '../components/ImagePicker'
import LocationPicker from '../components/LocationPicker'

const NewPlaceScreen = ({ navigation }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Add Place',
    })
  })

  const [titleValue, setTitleValue] = useState('')
  const [selectedImage, setSelectedImage] = useState(null)
  const [pickedLocation, setPickedLocation] = useState({ lat: 0, lng: 0 })
  const dispatch = useDispatch()

  const titleChangeHandler = (text) => {
    setTitleValue(text)
  }

  const savePlaceHandler = () => {
    if (!titleValue) {
      Alert.alert('', 'You need to provide a title', [{ text: 'Okay' }])
      return
    }

    dispatch(placesActions.addPlace(titleValue, selectedImage, pickedLocation))
    navigation.goBack()
  }

  const imageTakenHandler = (imagePath) => {
    setSelectedImage(imagePath)
  }

  const geoTakenHandler = (geoPath) => {
    setPickedLocation(geoPath)
  }

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput style={styles.textInput} onChangeText={titleChangeHandler} />
        <ImagePicker onImageTake={imageTakenHandler} />
        <LocationPicker onGeoTake={geoTakenHandler} />
        <Button
          title='Save Place'
          color={Colors.primary}
          onPress={savePlaceHandler}
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  form: {
    margin: 30,
  },
  label: {
    fontSize: 18,
    marginBottom: 15,
  },
  textInput: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
})

export default NewPlaceScreen
