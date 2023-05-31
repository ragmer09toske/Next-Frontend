import { useNavigation } from "@react-navigation/native";
import { Image } from "react-native"
import { Marker } from "react-native-maps"
import car from '../componant/car.png'

const AvailableCars = ({navigateTo}) => { 
  const navigate = useNavigation();
  const goToMapScreen = () => {
    navigate.navigate(navigateTo)
  }
  return (
    <>
        <Marker
        description="your location"
        coordinate={{latitude: -29.3172, longitude: 27.4762 }}
        onPress={goToMapScreen}
        >
            <Image
                style={{width: 30, height: 30}}
                source={car}
            />
        </Marker>
        <Marker
            description="your location"
            coordinate={{latitude: -29.3171, longitude: 27.4817 }}
            onPress={goToMapScreen}
            >
            <Image
                style={{width: 30, height: 30}}
                source={car}
            />
        </Marker>
        <Marker
            description="your location"
            onPress={goToMapScreen}
            coordinate={{latitude: -29.3260568, longitude: 27.4798636 }}
            >
            <Image
                style={{width: 40, height: 40}}
                source={car}
            />
        </Marker>
    </>
  )
}

export default AvailableCars
