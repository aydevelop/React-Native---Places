import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  ScrollView,
  View,
  Button,
  Text,
  TextInput,
  StyleSheet,
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
  const dispatch = useDispatch()

  const titleChangeHandler = (text) => {
    setTitleValue(text)
  }

  const savePlaceHandler = () => {
    dispatch(placesActions.addPlace(titleValue, selectedImage))
    navigation.goBack()
  }

  const imageTakenHandler = (imagePath) => {
    setSelectedImage(imagePath)
  }

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput style={styles.textInput} onChangeText={titleChangeHandler} />
        <ImagePicker onImageTake={imageTakenHandler} />
        <LocationPicker />
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
