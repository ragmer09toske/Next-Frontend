import { useNavigation } from "@react-navigation/native"
import { TouchableOpacity } from "react-native"
import { Text, View } from "react-native"
import { Icon } from "react-native-elements"
import { Divider } from "react-native-paper"
import { useSelector } from "react-redux"
import tw from "tailwind-react-native-classnames"
import NearByCars from "../componant/NearByCars"

const TestScreen = ({openCarBottomSheet, closeCarBottomSheet}) => {
  const { selectedCar } = useSelector((state)=> state.appData)
  const navigation = useNavigation()
  const goBack = ()  => {
    closeCarBottomSheet()
    console.log("back has been clicked")
  }
  const handleView = () =>{
    closeCarBottomSheet()
    openCarBottomSheet()
  }
  return (
    <View style={{padding: 1}}>
      <View 
        style={{padding: 10, flexDirection: 'row'}}
      >
          <TouchableOpacity
              onPress={goBack}
              >
              <Icon
                style={{backgroundColor: '#4f7fe6c8', padding: 10, borderRadius: 8}}
                name="arrowleft"
                color='white'
                type='antdesign'
              />
          </TouchableOpacity>
          <View style={[{flexDirection: 'row', width: "85%", justifyContent: 'center', alignItems: 'center'}]}>
            {
              selectedCar &&
              <TouchableOpacity
                onPress={handleView}
                style={{backgroundColor: '#4f7fe6c8', padding: 10, borderRadius: 8, width: '90%', justifyContent:'center', alignItems: 'center'}}
              >
                <Text style={{fontWeight: '800',color: 'white', fontSize: 20}}>Choose {selectedCar?.title}</Text>
              </TouchableOpacity>
            }
            {
              !selectedCar &&
              <TouchableOpacity
                style={tw`p-2 pl-10 pr-10`}
              >
                <Text style={{fontWeight: '800',color: 'black', fontSize: 20}}>Select a Cab</Text>
              </TouchableOpacity>
            }
          </View>
        </View>
    </View>
  )
}
export default TestScreen
