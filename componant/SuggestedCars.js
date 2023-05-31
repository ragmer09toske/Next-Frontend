import { StyleSheet, Text, View } from "react-native"
import tw from "tailwind-react-native-classnames"
import TestScreen from "../screens/TestScreen"
import NearByCars from "./NearByCars"

const SuggestedCars = ({openCarBottomSheet, closeCarBottomSheet}) => {
  return (
    <View>
        <View style={{margin:2}}>
            <Text style={tw`font-bold text-lg`}>SUGGESTED RIDES</Text>
        </View>    
        <View style={styles.cars}>
            <NearByCars />
        </View>
        <View style={{margin: 5}}> 
            <TestScreen openCarBottomSheet={openCarBottomSheet} closeCarBottomSheet={closeCarBottomSheet}/>
        </View>
    </View>
  )
}

export default SuggestedCars
const styles = StyleSheet.create({
    cars : {
        maxHeight: "83%",
        backgroundColor: '#4f7fe622',   
        borderRadius: 10
    }
})