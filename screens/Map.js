import { Image, StyleSheet, Text, View } from "react-native"
import MapView, {Marker} from "react-native-maps"
import AvailableCars from "./AvailableCars"
import MapViewDirections from "react-native-maps-directions"
// import { GOOGLE_MAPS_APIKEY } from '@env'
import { useEffect, useRef } from "react"
import location from './location.png'
import { useDispatch, useSelector } from "react-redux"
import { setCost, setDistance, setDuration } from "../componant/redux/DistanceMatrixSlice"

const Map = ({originLatitude, originLongitude}) => {
  const { destinationDecription } = useSelector((state)=> state.coordinates)
  const { originDiscription } = useSelector((state)=> state.coordinates)
  const { OriginLatitude } = useSelector((state)=> state.coordinates)
  const { OriginLongitude } = useSelector((state)=> state.coordinates)
  const { destinationCoordinates } = useSelector((state)=> state.coordinates)
  const mapRef = useRef(null)

  useEffect(()=>{
    if(!destinationDecription || originDiscription ) return;
    mapRef.current.fitToSuppliedMarkers(['origin', 'destination'],{
      edgePadding: {top: 50, right: 50, bottom: 50, left: 50},
    })

  },[originDiscription,destinationDecription])
  
  const dispatch =useDispatch();  
  useEffect(()=>{
    if(!originDiscription || !destinationDecription) return
    const getTravelTime = async () => {
      fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${originDiscription}&destinations=${destinationDecription}&units=imperial&key=AIzaSyB65_Foi2jSBFjxGPbQq9FvJwquydwlbLA`)
        .then((res)=>res.json())
        .then(data => {
          dispatch(setDuration(data.rows[0].elements[0].duration.text))
          dispatch(setCost(data.rows[0].elements[0].duration.value))
          dispatch(setDistance(data.rows[0].elements[0].distance.text))
        }
      )
    }
    getTravelTime();
  },[destinationDecription,originDiscription])

  let lat = -29.3115771
  let lng = 27.4792293

  return (
    <View style={{flex: 1, justifyContent: 'center', position: 'relative'}}>
      <MapView
        ref={mapRef}
        style={{flex: 1, zIndex: 1}}
        mapType="mutedStandard"
       
        region={{
          latitude: OriginLatitude,
          longitude: OriginLongitude,
          latitudeDelta:  0.059,
          longitudeDelta: 0.059,
        }}
        // showsUserLocation={true}
        >
        <MapViewDirections
          apikey = "AIzaSyB65_Foi2jSBFjxGPbQq9FvJwquydwlbLA" 
          origin={originDiscription}
          destination={destinationDecription}
          strokeColor='black'
          strokeWidth={3}
        />
        <Marker
        description="your location"
        coordinate={{latitude: OriginLatitude, longitude: OriginLongitude }}
        identifier="origin"
        >
          <Image
              style={{width: 30, height: 30}}
              source={location}
          />
        </Marker>
        {
          destinationDecription &&
          <Marker
            description="your location"
            coordinate={{latitude: destinationCoordinates.lat, longitude: destinationCoordinates.lng }}
            identifier="destination"
          >
              <Image
                  style={{width: 30, height: 30}}
                  source={location}
              />
          </Marker>
        }
      </MapView>
      <View style={styles.menu} />
    </View>
  )
}
const styles = StyleSheet.create({
  menu: {
    minHeight: 200,
    position:'absolute',
    zIndex: 50,
    top: 100,
    backgroundColor: '#0000009e'
  }
})
export default Map
