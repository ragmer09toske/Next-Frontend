import { Image, StyleSheet, Text, View } from "react-native"
import { SafeAreaView } from "react-navigation"
import tw from "tailwind-react-native-classnames"
import NavOptions from "../componant/NavOptions"
import logo from './logo.png'
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"
import BottomBar from "../componant/BottomBar"
import 'react-native-gesture-handler'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import { GOOGLE_MAPS_APIKEY } from '@env'
import { Icon } from "react-native-elements"
import { useDispatch, useSelector } from "react-redux"
import { setOriginLongitudeGlobal, setOriginLatitudeGlobal, setOriginDiscription } from "../componant/redux/coordinatesSlice"
import ThristCard from "../componant/ThristCard"
import Location from "./Location"
import { requestPermissionsAsync } from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useState } from "react"
import { async } from "@firebase/util"
import ApiURI from "../subroutines/ApiURI"

const Home = ({openBottomSheet,setIsSignedIn}) => {
  // Getting The user's Permition to allow notifications
  requestNotificationPermissions = async () => {
    const { status } = await requestPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to send notifications has not been granted');
    }
  }
  requestNotificationPermissions()

  const [storedValue, setStoredValue] = useState('');
  const [userID, setUserID] = useState();
  const dispatch = useDispatch()
  const { originDiscription } = useSelector((state)=>state.coordinates)
  const { currentUserObject } = useSelector((state)=>state.appData)

  const openBottomSheetFunction = () => {
    openBottomSheet()
  }

  return (
    <SafeAreaView style={[tw`bg-white h-full`]}>
        <GestureHandlerRootView style={{padding: 5,flex: 1}}>
            <Image
              style={{
                  width: 170,
                  height: 170,
                  resizeMode: 'contain'
              }}
              source={logo}
            />
            <GooglePlacesAutocomplete
              placeholder={"Where are you from?"}
              styles={{
                container: {
                  flex: 0
                },
                textInput: {
                  fontSize: 22
                },
              }}
              enablePoweredByContainer={false}
              fetchDetails = { true }
              returnKeyType = {'search'}
              onPress = {(data, details = null)=>{
                dispatch(setOriginLatitudeGlobal(details.geometry.location.lat))
                dispatch(setOriginLongitudeGlobal(details.geometry.location.lng))
                dispatch(setOriginDiscription(data.description))
              }}
              query={{
                key: "AIzaSyB65_Foi2jSBFjxGPbQq9FvJwquydwlbLA",
                language:  "en"
              }}
              nearbyPlacesAPI="GooglePlacesSearch"
              debounce={400}
            />
            {
              originDiscription &&
              <View style={{ flexDirection: 'row', padding: 10, alignItems: 'center'}}>
                <Icon
                    style={tw`p-2 bg-black rounded-full w-10`}
                    name="enviromento"
                    color='white'
                    type='antdesign'
                />
                <Text style={tw`font-bold text-xl pl-5`}>{originDiscription}</Text>
                
              </View>
            }
            <NavOptions/>
            {/* <ThristCard/> */}
            <BottomBar openBottomSheet={openBottomSheetFunction} setIsSignedIn={setIsSignedIn}/>
            {/* <Location/> */}
        </GestureHandlerRootView>
    </SafeAreaView>
  )
}
export default Home