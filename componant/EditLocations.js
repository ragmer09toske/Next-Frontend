import { KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"
// import { GOOGLE_MAPS_APIKEY } from '@env'
import { useDispatch } from "react-redux"
import { setDistinationDescription, setOriginDiscription, setOriginLatitudeGlobal, setOriginLongitudeGlobal } from "./redux/coordinatesSlice"
import { useState } from "react"
import { Icon } from "react-native-elements"
import tw from "tailwind-react-native-classnames"

const EditLocations = () => {
  const dispatch = useDispatch()
  const [from, setFrom] = useState(false)
  const [to, setTo] = useState()
  const whereTo = () => {
    setFrom(false)
    setTo(!to)
  }
  const whereFrom = () => {
    setTo(false)
    setFrom(!from)
  }
  return (
    <View style={{height: '100%', justifyContent:'center'}}>
      <View style={{borderWidth: 1.5, borderColor: '#0000000e', backgroundColor: '#f8f8f8c0', borderRadius: 5}}>
        <TouchableOpacity 
          style={{flexDirection: 'row', alignItems: 'center'}}
          onPress={whereFrom}
        >
          <Text style={[tw`text-sm`,{padding: 15, color: '#000000c4'}]}>From</Text>
          {
            from ?
            <Icon
              name="up"
              color='#0000009d'
              size={15}
              type='antdesign'
            />
            :
            <Icon
              name="down"
              color='#0000009d'
              size={15}
              type='antdesign'
            />
          }
        </TouchableOpacity >

        {
        from &&
        <KeyboardAvoidingView>
          <GooglePlacesAutocomplete
              placeholder="Your origin place"
              debounce={400}
              styles={toInputBoxStyles}
              nearbyPlacesAPI="GooglePlacesSearch"
              fetchDetails={true}
              returnKeyType = {'search'}
              onPress = {(data, details = null)=>{
                dispatch(setOriginLatitudeGlobal(details.geometry.location.lat))
                dispatch(setOriginLongitudeGlobal(details.geometry.location.lng))
                dispatch(setOriginDiscription(data.description))
              }}
              minLength={2}
              enablePoweredByContainer={false}
              query={{
              key: 'AIzaSyB65_Foi2jSBFjxGPbQq9FvJwquydwlbLA',
              languege: 'en'
              }}
          />
        </KeyboardAvoidingView>
        }
        
        <View style={{borderColor: '#0000000e', borderBottomWidth: 1.3}}/>
        {/* Where to */}
        <TouchableOpacity 
          style={{flexDirection: 'row', alignItems: 'center'}}
          onPress={whereTo}
        >
          <Text style={[tw`text-sm`,{padding: 15, color: '#000000c4'}]}>Where to</Text>
          {
            to ?
            <Icon
              name="up"
              color='#0000009d'
              size={15}
              type='antdesign'
            />
            :
            <Icon
              name="down"
              color='#0000009d'
              size={15}
              type='antdesign'
            />
          }
        </TouchableOpacity >
        {
        to &&
        <KeyboardAvoidingView>
          <GooglePlacesAutocomplete
              placeholder="Destination"
              debounce={400}
              styles={toInputBoxStyles}
              nearbyPlacesAPI="GooglePlacesSearch"
              fetchDetails={true}
              returnKeyType = {'search'}
              onPress = {(data, details = null)=>{
                dispatch(setDistinationDescription(data.description))
              }}
              minLength={2}
              // Implement the onpress Function: 2:25:59
              enablePoweredByContainer={false}
              query={{
              key: "AIzaSyB65_Foi2jSBFjxGPbQq9FvJwquydwlbLA",
              languege: 'en'
              }}
          />
        </KeyboardAvoidingView>
        }
      </View>
    </View>
  )
}
const toInputBoxStyles = StyleSheet.create({
    container: {
      padding: 20,
       flex: 0
    },
    textInput: {
      backgroundColor: '#f0f0f0',
      borderWidth: 2,
      borderColor: '#0000000e',
      fontSize: 15, 
    },
    textInputcontainer: {
      paddingHorizontal: 30,
      paddingBottom: 0,
      borderWidth: 1,
      backgroundColor: '#dae5f79a'
    }
  })
export default EditLocations
