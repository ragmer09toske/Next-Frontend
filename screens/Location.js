import { useNavigation } from "@react-navigation/native"
import { Image, StyleSheet, Text, View } from "react-native"
import { Icon } from "react-native-elements"
import { TouchableOpacity } from "react-native-gesture-handler"
import MapView, { Marker } from "react-native-maps"
import tw from "tailwind-react-native-classnames"
import * as expoLocation from 'expo-location'
import { useEffect, useState } from "react"
import locationMarker from './location.png'

const Location = () => {
  const navigation = useNavigation()  
  const goToMapOverView = () => {
    navigation.navigate("MapOverView")
  }
  let [lat, setLat] = useState(-29.3171);
  let [lng, setLng] = useState(27.4814);
  let userLocation;
  useEffect(()=>{
    (async ()=>{
      let {status} = await expoLocation.requestForegroundPermissionsAsync();
      if(status !== "granted") {
          console.log("permition to access location was denied")
          return;
      }
      userLocation = await expoLocation.getCurrentPositionAsync({});
      console.log("[Location.js ]",userLocation.coords)
      setLat(userLocation.coords.latitude)
      setLng(userLocation.coords.longitude)
    })();
  },[userLocation]);

  return (
    <View style={style.contianer}>
      <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between',paddingLeft: 10,paddingRight: 10, alignItems: 'center', margin: 10}}>
        <View></View>
        <Text style={[tw`text-lg font-bold`, {color: "#4F80E6" }]}>Your Real time location</Text>
        <TouchableOpacity
            onPressOut={goToMapOverView}
        >
            <Icon
                name="arrowsalt"
                color="#A6BEF0"
                size={25}
                type="antdesign"
            />
        </TouchableOpacity>
        <View></View>
      </View>
      <View style={{flex: 1}} onPress={()=>{console.log("i am clicked")}}>
        <MapView
            style={{ flex: 1 }}
            mapType="mutedStandard"
            initialRegion={{
            latitude: lat,
            longitude: lng,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
            }}
            region={{
              latitude: lat,
              longitude: lng,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
              }}
              showsUserLocation={true}
            >
            <Marker
            description="your location"
            coordinate={{
              latitude: lat, 
              longitude: lng
            }}
            >
              <Image
                style={{width: 30, height: 30}}
                source={locationMarker}
              />
            </Marker>
        </MapView>
      </View>
    </View>
  )
}
const style = StyleSheet.create({
    contianer: {    
        flex: 1,
        margin: 10,
        bottom: 150,
        bottom:80,
        minHeight: 155,
    }
})
export default Location
