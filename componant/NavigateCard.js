import location from "../screens/location.png"
import { Image, KeyboardAvoidingView, SafeAreaView, Text, TouchableOpacity, View } from "react-native"
import tw from "tailwind-react-native-classnames"
import { StyleSheet } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { Icon } from "react-native-elements"
import Places from "./Places"
import { useDispatch, useSelector } from "react-redux"

const NavigateCard = ({destinationVal,AvailableCarBottomSheet,openEditBottomSheet}) => {
  const navigation = useNavigation()
  const goToCarMatrix = () => {
    navigation.navigate("TestScreen")
  }
  const goDestinationView = () =>{
   navigation.navigate("DestinationView")
  }
  const dispatch = useDispatch()
  const { originDiscription } = useSelector((state)=> state.coordinates)
  const {  destinationDecription } = useSelector((state)=> state.coordinates)
  return (
    <SafeAreaView style={[tw`bg-white flex-1 p-5`]}>
      <View style={{paddingBottom: 20, borderRadius: 10 }}>
        {
          destinationDecription &&
          <View style={{ padding: 10, margin: 20, borderRadius: 50}}>
            <View style={[styles.groupButton]}>
                <TouchableOpacity 
                  style={[{flexDirection: 'row', alignItems: 'center'},tw`bg-black rounded-full p-2 pl-5 pr-5`]}
                  onPress={AvailableCarBottomSheet}
                >
                  <Icon
                      style={[tw`pr-2`]}
                      name="car"
                      color='white'
                      type='antdesign'
                  />
                  <Text style={{color: 'white'}}>Rides</Text>
                </TouchableOpacity>
                <View style={[{flexDirection: 'row', justifyContent: 'space-between'},tw`${!destinationVal && "opacity-20"}`]}>
                  <Image
                    style={{width: 20, height: 20, resizeMode: 'contain'}}
                    source={location}
                  />
                  <Text style={tw`font-bold text-lg`}>near you</Text>
                </View>
            </View>
          </View>
        }
        {
        destinationDecription &&
        <View>
          <Places/>
          <View style={[styles.edit, tw`bg-gray-200 w-11 rounded-full`]}>
            <TouchableOpacity
              onPress={openEditBottomSheet}
            >
              <Icon
                style={tw`w-20`}
                name="brush"
                color='white'
                type='entypo'
              />
            </TouchableOpacity>
          </View>
        </View>
        }
        {
        !destinationDecription &&
        <KeyboardAvoidingView style={tw`flex-shrink`}>
          <View style={{ flexDirection: 'row', padding: 10, alignItems: 'center', justifyContent: 'center'}}>
              <Icon
                  style={tw`p-2 h-20`}
                  name="enviromento"
                  color='black'
                  type='antdesign'
                  size={30}
              />
              <Text style={[tw`font-bold text-xl pl-5`,{marginTop: -30}]}>{originDiscription}</Text>
          </View>
          <View style={{ flexDirection: 'row',marginTop: -5, marginLeft: 18, alignItems: 'center', justifyContent: 'center'}}>
              <Icon
                  style={tw`p-2 h-20`}
                  name="address"
                  color='black'
                  type='entypo'
                  size={30}
              />
              {
                !destinationDecription &&
                <TouchableOpacity 
                style={styles.setDestination}
                onPress={goDestinationView}
                >
                  <Text style={{color: 'white'}}>Set Destination</Text>
                </TouchableOpacity>
              }
          </View>
          {/* <View style={styles.line}></View> */}
        </KeyboardAvoidingView>
        }
      </View>
    </SafeAreaView>
  )
}
export default NavigateCard

const toInputBoxStyles = StyleSheet.create({
  container: {
     padding: 20,
     flex: 0
  },
  textInput: {
    borderRadius: 20,
    fontSize: 18
  },
  textInputcontainer: {
    paddingHorizontal: 20,
    paddingBottom: 0,
  }
})
const styles = StyleSheet.create({
  groupButton: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%'
  },
  edit :{
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    right: 5,
    top: 60,
    alignItems: 'center',
    padding: 10,
    margin:10
  },
  line: { 
    minHeight: 50,
    color: 'black',
    minWidth: 10,
    top: 50,
    left: 40,
    position: 'absolute',
    borderLeftWidth: 2,
    borderLeftColor: 'gray'
  },
  setDestination: {
    padding: 10,
    backgroundColor: '#4f7fe6',
    opacity: 500,
    flexDirection: 'row',
    marginTop: -30, 
    alignItems: 'center', 
    justifyContent: 'center',
    minHeight: 30,
    minWidth: 300,
    borderRadius: 10
  }
})
