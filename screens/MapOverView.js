import MapView, { Marker } from "react-native-maps"
import AvailableCars from "./AvailableCars"

const MapOverView = () => {  
  return (
    <MapView
        style={{flex: 1, zIndex: 1}}
        mapType="mutedStandard"
        initialRegion={{
          latitude: -29.3171,
          longitude: 27.4814,
          latitudeDelta:  0.0016,
          longitudeDelta: 0.0124,
        }}
        showsUserLocation={true}
        >
        <AvailableCars navigateTo={"MapScreen"}/>
    </MapView>
  )
}

export default MapOverView
