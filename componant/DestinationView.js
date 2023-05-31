import React from 'react';
import { Text, View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
// import { GOOGLE_MAPS_APIKEY } from '@env'
import { setDestinationCoordinatesLat, setDestinationCoordinatesLng, setDistinationDescription } from './redux/coordinatesSlice'
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native';

const DestinationView = () => {
  const {  originDiscription } = useSelector((state)=> state.coordinates)
  const dispatch = useDispatch()
  const navigation = useNavigation()
  return (
    <View style={{paddingTop: 50, paddingLeft: 40, paddingRight: 20, backgroundColor: '#4f7fe622', height: 170}}>
        <View style={styles.address}>
          <Icon
            name="enviromento"
            color='black'
            type='antdesign'
            size={30}
          />
          <Text style={tw`font-bold text-lg pl-5`}>{ originDiscription }</Text>
        </View>
        
        <View style={styles.line}></View>
        <View style={styles.square}></View>
        <GooglePlacesAutocomplete
              placeholder="Destination"
              styles={{
                container: {
                  flex: 0,
                  marginTop: 50
                },
                textInput: {
                  fontSize: 22
                },
              }}
              enablePoweredByContainer={false}
              fetchDetails = { true }
              returnKeyType = {'search'}
              onPress = {(data, details = null)=>{
                dispatch(setDestinationCoordinatesLat(details.geometry.location.lat))
                dispatch(setDestinationCoordinatesLng(details.geometry.location.lng))
                dispatch(setDistinationDescription(data.description))
                navigation.navigate('MapScreen')
              }}
              query={{
                key: 'AIzaSyB65_Foi2jSBFjxGPbQq9FvJwquydwlbLA',
                language:  "en"
              }}
              nearbyPlacesAPI="GooglePlacesSearch"
              debounce={400}
            /> 
    </View>
  )
}
const styles = StyleSheet.create({
  line: { 
    minHeight: 70,
    color: 'black',
    minWidth: 10,
    top: 80,
    left: 23,
    position: 'absolute',
    borderLeftWidth: 2,
    borderLeftColor: 'gray'
  },
  address: {
    position: 'absolute',
    top: 50,
    left: 9,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  square : {
    minHeight: 20,
    minWidth: 30,
    color: 'black',
    minWidth: 10,
    top: 115,
    left: 23,
    position: 'absolute',
    borderWidth: 2,
    backgroundColor: 'black'
  }
})
export default DestinationView