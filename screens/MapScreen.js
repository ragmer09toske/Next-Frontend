import { createStackNavigator } from "@react-navigation/stack"
import { useState } from "react"
import { View, Text, StyleSheet } from "react-native"
import 'react-native-gesture-handler'
import { useSelector } from "react-redux"
import NavigateCard from "../componant/NavigateCard"
import Map from "./Map"
import TestScreen from "./TestScreen"

const MapScreen = ({destination, originVal,destinationVal, originLongitude, originLatitude, openEditBottomSheet, openCarBottomSheet, AvailableCarBottomSheet}) => {
  const Stack = createStackNavigator();
  const [duration,setDuration] = useState();
  const [distance,setDistance] = useState();
  const [distinationLatitude, setDistinationLatitude] = useState();
  const [distinationLongitude, setDistinationLongitude] = useState();
  const {  destinationDecription } = useSelector((state)=> state.coordinates)
  const [cost,setCost] = useState();
  const NavigateCardComponent = () => {
    return <NavigateCard 
            destination={destination} 
            destinationVal={destinationVal} 
            originVal={originVal}
            setDistinationLatitude= {setDistinationLatitude}
            setDistinationLongitude={setDistinationLongitude}
            distinationLatitude={distinationLatitude}
            distinationLongitude={distinationLongitude}
            openEditBottomSheet={openEditBottomSheet}
            AvailableCarBottomSheet={AvailableCarBottomSheet}
          />
  }
  const CarsMatrix = () => {
    return <TestScreen 
            duration={duration} 
            distance={distance} 
            cost={cost}
            openCarBottomSheet={openCarBottomSheet}
          />
  }
  return (
    <View style = {styles.container}>
      <View style={[ styles.Mapcontainer, !destinationDecription  ? {flex: 3} : {flex: 1.5} ]}>
        <Map 
          origin={originVal} 
          destination={destinationVal} 
          duration={setDuration} 
          distance={setDistance} 
          cost={setCost} 
          originLatitude={originLatitude}
          originLongitude={originLongitude}
          distinationLongitude={distinationLatitude}
        />
      </View>
      <View style={styles.bottomView}>
        <Stack.Navigator>
            <Stack.Screen
              name="NavigateCard"
              component={NavigateCardComponent}
              options={{
                headerShown: false
              }}
            />
            <Stack.Screen
              name="TestScreen"
              component={CarsMatrix}
              options={{
                headerShown: false
              }}
            />        
        </Stack.Navigator>
      </View>
    </View>
   )
}
const styles = StyleSheet.create({
  back: {
    position: 'absolute',
    zIndex: 2,
    top: 15,
    backgroundColor: 'black',
    left: 18
  },
  map: {
    zIndex: 1,
    flex: 1 
  },
  Mapcontainer :{
    height: 70
  },
  bottomView: {
    flex:1,
    height: 30,
    backgroundColor: '#F8F8FF'
  },
  container: {
    flex: 1
  }
})
export default MapScreen
